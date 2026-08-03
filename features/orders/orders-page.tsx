"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DataTablePagination from "@/components/shared/DataTablePagination";
import SidebarToggle from "@/components/shared/SidebarToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePagination } from "@/hooks/usePagination";
import { toast } from "sonner";
import {
  Check,
  Clock,
  DollarCircle,
  Edit,
  Eye,
  Search,
  TrendUp,
  X,
} from "reicon-react";
import { cn, formatPrice } from "@/lib/utils";
import { updateOrderStatus } from "@/features/orders/actions";

const PAGE_SIZE = 10;

export interface DashboardOrderItem {
  name: string;
  quantity: number;
  price: number;
  size: string | null;
  image: string | null;
}

export interface DashboardOrder {
  id: string;
  displayId: string;
  customer: { name: string; email: string };
  items: DashboardOrderItem[];
  date: string;
  total: number;
  shipping: number;
  status: string;
  paymentMethod: string;
  address: string;
}

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
] as const;

const statusStyles: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Paid: "bg-info/10 text-info",
  Shipped: "bg-info/10 text-info",
  Delivered: "bg-tertiary/10 text-tertiary",
  Cancelled: "bg-error/10 text-error",
};

export default function OrdersPage({
  summary,
  orders,
}: {
  summary: {
    totalSales: string;
    pendingOrders: number;
    fulfillmentRate: string;
  };
  orders: DashboardOrder[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<string>("");
  const [detailOrder, setDetailOrder] = useState<DashboardOrder | null>(null);
  const [pending, startTransition] = useTransition();

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter(
      (order) =>
        order.displayId.toLowerCase().includes(term) ||
        order.id.toLowerCase().includes(term) ||
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term) ||
        order.items.some((item) => item.name.toLowerCase().includes(term)),
    );
  }, [orders, search]);

  const { page, totalPages, setPage, start, end } = usePagination(
    filteredOrders.length,
    PAGE_SIZE,
  );
  const pageOrders = filteredOrders.slice(start - 1, end);

  function saveStatus(id: string) {
    const toastId = toast.loading("Updating status...");
    startTransition(async () => {
      try {
        await updateOrderStatus(id, draftStatus);
        setEditingId(null);
        router.refresh();
        toast.success("Status updated", { id: toastId });
      } catch {
        toast.error("Failed to update status", { id: toastId });
      }
    });
  }

  function startEdit(order: DashboardOrder) {
    setEditingId(order.id);
    setDraftStatus(order.status.toUpperCase());
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-18 items-center border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarToggle className="-ml-2 shrink-0" />
            <div className="flex min-w-0 flex-col">
              <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">
                Order Management
              </h2>
              <p className="hidden text-sm text-muted-foreground sm:block">
                Review and fulfill your recent sales.
              </p>
            </div>
          </div>
          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"
            />
            <input
              className="w-64 rounded-lg border border-border bg-muted py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Search order ID or customer..."
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
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
                label: "Fulfillment",
                value: summary.fulfillmentRate,
                icon: TrendUp,
                iconClass: "bg-tertiary/10 text-tertiary",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-medium uppercase  text-muted-foreground">
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
                  <p className="mt-2 truncate font-inter text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 py-24 text-center">
              <p className="text-base font-medium text-foreground">
                No orders yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Orders placed on the storefront will appear here.
              </p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 py-24 text-center">
              <p className="text-base font-medium text-foreground">
                No orders match &quot;{search.trim()}&quot;
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different order ID, customer name, or product.
              </p>
              <button
                className="mt-4 border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead className="border-b border-border bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        Product
                      </th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        Total
                      </th>
                      <th className="px-6 py-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pageOrders.map((order) => {
                      const first = order.items[0];
                      const extraCount = order.items.length - 1;
                      const isEditing = editingId === order.id;
                      return (
                        <tr
                          key={order.id}
                          className="transition-colors hover:bg-muted/50"
                        >
                          <td className="px-6 py-4 text-sm font-semibold text-foreground">
                            {order.displayId}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-foreground">
                              {order.customer.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {order.customer.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border">
                                {first?.image ? (
                                  <Image
                                    fill
                                    sizes="48px"
                                    className="h-full w-full object-cover"
                                    src={first.image}
                                    alt=""
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                    No img
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="block truncate text-sm text-foreground">
                                  {first?.name ?? "\u2014"}
                                </span>
                                {first && (
                                  <span className="text-xs text-muted-foreground">
                                    Qty {first.quantity}
                                    {extraCount > 0 && ` +${extraCount} more`}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-foreground">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-6 py-4">
                            {isEditing ? (
                              <select
                                value={draftStatus}
                                onChange={(e) => setDraftStatus(e.target.value)}
                                autoFocus
                                className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground outline-none transition-colors focus:border-primary"
                              >
                                {STATUS_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  statusStyles[order.status] ||
                                  "bg-muted text-muted-foreground"
                                }`}
                              >
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {isEditing ? (
                                <>
                                  <button
                                    className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                                    onClick={() => setEditingId(null)}
                                    disabled={pending}
                                    aria-label="Cancel"
                                  >
                                    <X size={18} />
                                  </button>
                                  <button
                                    className="bg-primary p-1.5 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                                    onClick={() => saveStatus(order.id)}
                                    disabled={pending}
                                    aria-label="Save status"
                                  >
                                    {pending ? (
                                      <span className="block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                    ) : (
                                      <Check size={18} />
                                    )}
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    onClick={() => setDetailOrder(order)}
                                    aria-label={`View order ${order.displayId}`}
                                  >
                                    <Eye size={18} />
                                  </button>
                                  <button
                                    className="p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    onClick={() => startEdit(order)}
                                    aria-label={`Edit order ${order.displayId}`}
                                  >
                                    <Edit size={18} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length > PAGE_SIZE && (
                <DataTablePagination
                  page={page}
                  totalPages={totalPages}
                  totalItems={filteredOrders.length}
                  start={start}
                  end={end}
                  onPageChange={setPage}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={detailOrder !== null}
        onOpenChange={(open) => {
          if (!open) setDetailOrder(null);
        }}
      >
        <DialogContent>
          {detailOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order {detailOrder.displayId}</DialogTitle>
                <DialogDescription>
                  Placed {detailOrder.date} · {detailOrder.paymentMethod}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 text-sm">
                <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-muted/40 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="mt-0.5 font-medium text-foreground">
                      {detailOrder.customer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {detailOrder.customer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <span
                      className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusStyles[detailOrder.status] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {detailOrder.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">
                      Shipping address
                    </p>
                    <p className="mt-0.5 text-foreground">
                      {detailOrder.address}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {detailOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                        {item.image ? (
                          <Image
                            fill
                            sizes="40px"
                            src={item.image}
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
                          {item.name}
                          {item.size ? ` (Size ${item.size})` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-border pt-3 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">
                      {formatPrice(detailOrder.total - detailOrder.shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium text-foreground">
                      {detailOrder.shipping === 0
                        ? "Free"
                        : formatPrice(detailOrder.shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-base font-medium text-foreground">
                      {formatPrice(detailOrder.total)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
