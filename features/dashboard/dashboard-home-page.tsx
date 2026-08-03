import Image from "next/image";
import Link from "next/link";
import { Add, Box, Clock, DollarCircle, Home2, TrendUp } from "reicon-react";
import SidebarToggle from "@/components/shared/SidebarToggle";
import { TextureButton } from "@/components/ui/texture-button";
import { cn, formatPrice } from "@/lib/utils";

export interface DashboardHomeSummary {
  totalSales: string;
  pendingOrders: number;
  activeProducts: number;
  fulfillmentRate: string;
}

export interface DashboardHomeOrder {
  id: string;
  displayId: string;
  customer: string;
  itemCount: number;
  total: number;
  status: string;
  date: string;
  image: string | null;
}

export interface DashboardHomeProduct {
  id: string;
  name: string;
  price: number;
  stock: number | null;
  image: string | null;
  featured: boolean;
}

const statusStyles: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Paid: "bg-info/10 text-info",
  Shipped: "bg-info/10 text-info",
  Delivered: "bg-tertiary/10 text-tertiary",
  Cancelled: "bg-error/10 text-error",
};

export default function DashboardHomePage({
  summary,
  recentOrders,
  recentProducts,
}: {
  summary: DashboardHomeSummary;
  recentOrders: DashboardHomeOrder[];
  recentProducts: DashboardHomeProduct[];
}) {
  const stats = [
    {
      label: "Total Sales",
      value: summary.totalSales,
      icon: DollarCircle,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      label: "Pending Orders",
      value: String(summary.pendingOrders),
      icon: Clock,
      iconClass: "bg-warning/10 text-warning",
    },
    {
      label: "Active Products",
      value: String(summary.activeProducts),
      icon: Box,
      iconClass: "bg-info/10 text-info",
    },
    {
      label: "Fulfillment",
      value: summary.fulfillmentRate,
      icon: TrendUp,
      iconClass: "bg-tertiary/10 text-tertiary",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-10 flex h-18 items-center border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarToggle className="-ml-2 shrink-0" />
            <div className="flex min-w-0 flex-col">
              <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">
                Home
              </h2>
              <p className="hidden text-sm text-muted-foreground sm:block">
                Your store at a glance.
              </p>
            </div>
          </div>
          <TextureButton
            variant="secondary"
            size="sm"
            render={<Link href="/dashboard/products/new" />}
          >
            <Add size={16} />
            Add product
          </TextureButton>
        </div>
      </header>

      <main className="grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between ">
                  <p className=" -mt-4 truncate text-xs font-medium uppercase  text-muted-foreground">
                    {stat.label}
                  </p>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      stat.iconClass,
                    )}
                  >
                    <Icon size={16} />
                  </span>
                </div>
                <p className="-mt-2 truncate font-inter text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
              <h3 className="text-sm font-semibold text-foreground">
                Recent Orders
              </h3>
              <Link
                href="/dashboard/orders"
                className="text-xs font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <Home2 size={28} className="text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  No orders yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Orders placed on the storefront will appear here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <li
                    key={order.id}
                    className="flex items-center gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      {order.image ? (
                        <Image
                          fill
                          sizes="44px"
                          src={order.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {order.displayId}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {order.customer} ·{" "}
                        <span className="font-inter tabular-nums">
                          {order.itemCount}
                        </span>{" "}
                        {order.itemCount === 1 ? "item" : "items"} ·{" "}
                        {order.date}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-inter text-sm font-semibold tabular-nums text-foreground">
                        {formatPrice(order.total)}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          statusStyles[order.status] ??
                            "bg-muted text-muted-foreground",
                        )}
                      >
                        {order.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
              <h3 className="text-sm font-semibold text-foreground">
                Recent Products
              </h3>
              <Link
                href="/dashboard/inventory"
                className="text-xs font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            {recentProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <Home2 size={28} className="text-muted-foreground/50" />
                <p className="mt-3 text-sm font-medium text-foreground">
                  No products yet
                </p>
                <TextureButton
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  render={<Link href="/dashboard/products/new" />}
                >
                  Add your first product
                </TextureButton>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {recentProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      {product.image ? (
                        <Image
                          fill
                          sizes="44px"
                          src={product.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {product.stock === null ? (
                          "Unlimited stock"
                        ) : (
                          <>
                            <span className="font-inter tabular-nums">
                              {product.stock}
                            </span>{" "}
                            in stock
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {product.featured && (
                        <span className="inline-flex items-center rounded-full bg-tertiary/10 px-2 py-0.5 text-xs font-medium text-tertiary">
                          Featured
                        </span>
                      )}
                      <span className="font-inter text-sm font-semibold tabular-nums text-foreground">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
