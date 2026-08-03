"use server";

import { prisma } from "@/lib/prisma";
import type { StoreProduct } from "@/types";

export async function getCartProducts(
  ids: string[],
): Promise<StoreProduct[]> {
  if (ids.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
  });

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    type: p.type,
    category: p.category,
    sizes: p.sizes,
    price: p.price.toNumber(),
    stock: p.stock,
    image: p.image,
  }));
}

export async function createOrder(input: {
  customerName: string;
  customerEmail: string;
  address: string;
  shipping: number;
  paymentMethod: string;
  items: { productId: string; size: string | null; qty: number }[];
}): Promise<{ orderId: string }> {
  const { customerName, customerEmail, address, shipping, paymentMethod, items } = input;

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((item) => item.productId) } },
  });
  const productById = new Map(products.map((p) => [p.id, p]));

  const orderItems: {
    productId: string;
    name: string;
    size: string | null;
    price: string;
    quantity: number;
  }[] = [];
  let total = 0;

  for (const item of items) {
    const product = productById.get(item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    if (product.stock !== null && product.stock < item.qty) {
      throw new Error(`${product.name} does not have enough stock`);
    }
    const lineTotal = product.price.toNumber() * item.qty;
    total += lineTotal;
    orderItems.push({
      productId: product.id,
      name: product.name,
      size: item.size,
      price: product.price.toNumber().toFixed(2),
      quantity: item.qty,
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        customerName,
        customerEmail,
        address,
        paymentMethod,
        shipping: shipping.toFixed(2),
        total: (total + shipping).toFixed(2),
        items: { create: orderItems },
      },
    });

    for (const item of items) {
      const product = productById.get(item.productId)!;
      if (product.stock !== null) {
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.qty } },
        });
      }
    }

    return created;
  });

  return { orderId: order.id };
}
