import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import DashboardHomePage from "@/features/dashboard/dashboard-home-page";

export const dynamic = "force-dynamic";

const STATUS_LABEL = {
  PENDING: "Pending",
  PAID: "Paid",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export default async function DashboardHomeRoute() {
  const [orders, recentProducts, activeProducts] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.product.count({ where: { status: "ACTIVE" } }),
  ]);

  const totalSales = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total.toNumber(), 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const fulfillmentRate =
    orders.length === 0
      ? "0%"
      : `${Math.round(
          (orders.filter(
            (o) => o.status !== "PENDING" && o.status !== "CANCELLED",
          ).length /
            orders.length) *
            100,
        )}%`;

  return (
    <DashboardHomePage
      summary={{
        totalSales: formatPrice(totalSales),
        pendingOrders,
        activeProducts,
        fulfillmentRate,
      }}
      recentProducts={recentProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price.toNumber(),
        stock: p.stock,
        image: p.image,
        featured: p.featured,
      }))}
      recentOrders={orders.slice(0, 5).map((order) => ({
        id: order.id,
        displayId: `#${order.id.slice(-8).toUpperCase()}`,
        customer: order.customerName,
        itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
        total: order.total.toNumber(),
        status: STATUS_LABEL[order.status],
        date: order.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        image: order.items[0]?.product.image ?? null,
      }))}
    />
  );
}
