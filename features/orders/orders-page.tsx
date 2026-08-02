'use client';

import DataTablePagination from '@/components/shared/DataTablePagination';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { orders, ordersSummary } from '@/constants/orders';
import { usePagination } from '@/hooks/usePagination';
import { Download, Filter, Search } from 'reicon-react';

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning',
  Shipped: 'bg-info/10 text-info',
  Delivered: 'bg-tertiary/10 text-tertiary',
  Cancelled: 'bg-error/10 text-error',
  Refunded: 'bg-muted text-muted-foreground',
};

export default function OrdersPage() {
  const { page, totalPages, setPage, start, end } = usePagination(
    orders.length,
    PAGE_SIZE,
  );
  const pageOrders = orders.slice(start - 1, end);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-18 items-center border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-2 shrink-0" />
            <div className="flex min-w-0 flex-col">
              <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">
                Order Management
              </h2>
              <p className="hidden text-sm text-muted-foreground sm:block">
                Review and fulfill your recent sales.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70"
              />
              <input
                className="w-64 rounded-full border border-border bg-muted py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search order ID or customer..."
                type="text"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:px-4">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 sm:px-4">
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="mb-8 grid gap-4 sm:gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">Total Sales</p>
                <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{ordersSummary.totalSales}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">Pending Orders</p>
                <p className="mt-1 text-xl font-bold text-primary sm:text-2xl">{ordersSummary.pendingOrders}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">Fulfillment Rate</p>
                <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{ordersSummary.fulfillmentRate}</p>
              </div>
            </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead className="border-b border-border bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Product</th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pageOrders.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-muted/50">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-foreground">
                          {order.customer.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border">
                            <img
                              className="w-full h-full object-cover"
                              src={order.product.image}
                              alt=""
                            />
                          </div>
                          <span className="text-sm text-foreground line-clamp-1">
                            {order.product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-foreground">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            statusStyles[order.status] || ''
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-sm font-medium text-primary hover:underline">
                          {order.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <DataTablePagination
              page={page}
              totalPages={totalPages}
              totalItems={orders.length}
              start={start}
              end={end}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

        <footer className="border-t border-border bg-background">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground">&copy; 2024 LuxeFrame Photography. All rights reserved.</p>
            <div className="flex gap-6">
              <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#">Support</a>
              <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#">Privacy</a>
              <a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#">Terms</a>
            </div>
          </div>
        </footer>
    </>
  );
}
