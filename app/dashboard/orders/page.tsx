import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import OrdersPage from "@/features/orders/orders-page";

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  PENDING: "Pending",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export default async function OrdersRoute() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  const totalSales = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total.toNumber(), 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const fulfillmentRate =
    orders.length === 0
      ? "0%"
      : `${Math.round(
          (orders.filter((o) => o.status !== "PENDING" && o.status !== "CANCELLED")
            .length /
            orders.length) *
            100,
        )}%`;

  return (
    <OrdersPage
      summary={{
        totalSales: formatPrice(totalSales),
        pendingOrders,
        fulfillmentRate,
      }}
      orders={orders.map((order) => ({
        id: order.id,
        displayId: `#${order.id.slice(-8).toUpperCase()}`,
        customer: {
          name: order.customerName,
          email: order.customerEmail,
        },
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toNumber(),
          size: item.size,
          image: item.product.image,
        })),
        date: order.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        total: order.total.toNumber(),
        shipping: order.shipping.toNumber(),
        status: STATUS_LABEL[order.status],
        paymentMethod: order.paymentMethod,
        address: order.address,
      }))}
    />
  );
}
