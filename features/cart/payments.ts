"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import {
  capturePaypalOrderById,
  createPaypalOrder,
  getPaypalOrder,
} from "@/lib/paypal";
import {
  BUSINESS_NAME,
  CHECKOUT_ENABLED,
  SHIPPING_FLAT_RATE,
} from "@/constants/policies";
import { CONTACT_EMAIL } from "@/constants/contact";

const itemsSchema = z
  .array(
    z.object({
      productId: z.string().min(1).max(64),
      size: z.string().max(60).nullable(),
      qty: z.number().int().min(1).max(50),
    }),
  )
  .min(1)
  .max(100);

const customerSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email().max(200),
  address: z.string().trim().min(8).max(400),
});

/** Prices the cart from the database. The browser never supplies amounts. */
async function priceCart(rawItems: unknown) {
  const items = itemsSchema.parse(rawItems);
  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) }, status: "ACTIVE" },
  });
  const byId = new Map(products.map((p) => [p.id, p]));
  let subtotal = 0;
  const lines = items.map((item) => {
    const product = byId.get(item.productId);
    if (!product) throw new Error("An item in your cart is no longer available");
    if (product.stock !== null && product.stock < item.qty) {
      throw new Error(`${product.name} does not have enough stock`);
    }
    const price = product.price.toNumber();
    subtotal += price * item.qty;
    return { product, item, price };
  });
  const shipping = SHIPPING_FLAT_RATE;
  return {
    lines,
    shipping,
    total: Math.round((subtotal + shipping) * 100) / 100,
  };
}

export async function createPaypalCheckout(rawItems: unknown): Promise<string> {
  if (!CHECKOUT_ENABLED) throw new Error("Checkout is not available yet");
  const { lines, total } = await priceCart(rawItems);
  const description = `${BUSINESS_NAME} order: ${lines
    .map((l) => `${l.item.qty}x ${l.product.name}`)
    .join(", ")}`;
  return createPaypalOrder(total.toFixed(2), description);
}

export async function capturePaypalCheckout(input: {
  paypalOrderId: string;
  customer: unknown;
  items: unknown;
}): Promise<{ orderId: string }> {
  if (!CHECKOUT_ENABLED) throw new Error("Checkout is not available yet");
  const paypalOrderId = z.string().min(5).max(64).parse(input.paypalOrderId);
  const customer = customerSchema.parse(input.customer);
  const marker = `PayPal ${paypalOrderId}`;

  // Idempotency: a retry must not create a second order.
  const existing = await prisma.order.findFirst({
    where: { paymentMethod: marker },
  });
  if (existing) return { orderId: existing.id };

  const { lines, shipping, total } = await priceCart(input.items);

  // The PayPal order must be for exactly what the server just priced.
  const pre = await getPaypalOrder(paypalOrderId);
  if (pre.purchase_units[0]?.amount.value !== total.toFixed(2)) {
    throw new Error("Cart total changed. Please review your cart and try again.");
  }

  const captured = await capturePaypalOrderById(paypalOrderId);
  const capture = captured.purchase_units[0]?.payments?.captures?.[0];
  if (captured.status !== "COMPLETED" || capture?.status !== "COMPLETED") {
    throw new Error("Your payment was not completed");
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        ...customer,
        paymentMethod: marker,
        status: "PAID",
        shipping: shipping.toFixed(2),
        total: total.toFixed(2),
        items: {
          create: lines.map((l) => ({
            productId: l.product.id,
            name: l.product.name,
            size: l.item.size,
            price: l.price.toFixed(2),
            quantity: l.item.qty,
          })),
        },
      },
    });
    for (const l of lines) {
      if (l.product.stock !== null) {
        await tx.product.update({
          where: { id: l.product.id },
          data: { stock: { decrement: l.item.qty } },
        });
      }
    }
    return created;
  });

  const ref = order.id.slice(-8).toUpperCase();
  const body = [
    `Thanks for your order, ${customer.customerName}!`,
    "",
    `Order reference: ${ref}`,
    ...lines.map(
      (l) =>
        `- ${l.item.qty} x ${l.product.name}: $${(l.price * l.item.qty).toFixed(2)}`,
    ),
    `Shipping: ${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}`,
    `Total paid: $${total.toFixed(2)}`,
    "",
    `Shipping to: ${customer.address}`,
    "",
    `Questions? Reply to this email or write to ${CONTACT_EMAIL}.`,
    `- ${BUSINESS_NAME}`,
  ].join("\n");
  await sendEmail(
    customer.customerEmail,
    `Your ${BUSINESS_NAME} order ${ref}`,
    body,
  );
  await sendEmail(
    CONTACT_EMAIL,
    `New paid order ${ref} ($${total.toFixed(2)})`,
    body,
  );

  return { orderId: order.id };
}
