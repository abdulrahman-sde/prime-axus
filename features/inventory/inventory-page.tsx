'use client';

import { useState } from 'react';
import DataTablePagination from '@/components/shared/DataTablePagination';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { inventoryProducts } from '@/constants/inventory';
import { usePagination } from '@/hooks/usePagination';
import { Add, Edit, Notification } from 'reicon-react';

const PAGE_SIZE = 10;

const statusConfig = {
  Active: {
    classes: 'bg-tertiary/10 text-tertiary',
    dot: 'bg-tertiary',
  },
  Draft: {
    classes: 'bg-muted text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
  Archived: {
    classes: 'bg-muted text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
};

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('All Items');

  const tabs = ['All Items', 'Active', 'Drafts'];

  const filteredProducts = inventoryProducts.filter((product) => {
    if (activeTab === 'Active') return product.status === 'Active';
    if (activeTab === 'Drafts') return product.status === 'Draft';
    return true;
  });

  const { page, totalPages, setPage, start, end } = usePagination(
    filteredProducts.length,
    PAGE_SIZE,
  );
  const pageProducts = filteredProducts.slice(start - 1, end);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-18 items-center border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-2 shrink-0" />
            <h1 className="truncate text-base font-semibold sm:text-lg">Inventory</h1>
          </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative group shrink-0">
                <Notification
                  size={22}
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                />
                <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 sm:px-6">
                <Add size={18} />
                <span className="hidden sm:inline">Add New Product</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-xl font-semibold text-foreground">Your Collections</h2>
            <div className="flex items-center gap-1 self-start rounded-xl bg-muted p-1 md:self-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all sm:px-4 ${
                    activeTab === tab
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Product
                    </th>
                    <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Inventory
                    </th>
                    <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Price
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pageProducts.map((product) => {
                    const cfg = statusConfig[product.status];
                    return (
                      <tr
                        key={product.id}
                        className="transition-colors hover:bg-muted/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-6">
                            <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <img
                                className="w-full h-full object-cover"
                                src={product.image}
                                alt=""
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.classes}`}>
                            <span className={`mr-2 h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {product.stock !== null ? `${product.stock} in stock` : '\u2014'}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground transition-colors hover:text-foreground">
                            <Edit size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredProducts.length > PAGE_SIZE && (
              <DataTablePagination
                page={page}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                start={start}
                end={end}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>

        <footer className="mt-3xl border-t border-border bg-background">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-xl px-4 py-2xl sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <span className="font-bold text-lg text-primary">LuxeFrame</span>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                A curated electronics marketplace — bench-tested gear for people who buy once and
                buy right.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-4 text-sm font-medium text-foreground">Company</p>
                <ul className="space-y-2">
                  {['Support', 'Community', 'Careers'].map((link) => (
                    <li key={link}>
                      <a
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 text-sm font-medium text-foreground">Legal</p>
                <ul className="space-y-2">
                  {['Privacy', 'Terms', 'Sitemap'].map((link) => (
                    <li key={link}>
                      <a
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium">Join the Newsletter</p>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Email address"
                  type="email"
                />
                <button className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm text-muted-foreground">&copy; 2024 LuxeFrame. All rights reserved.</p>
          </div>
        </footer>
    </>
  );
}
