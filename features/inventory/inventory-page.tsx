"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTablePagination from "@/components/shared/DataTablePagination";
import SidebarToggle from "@/components/shared/SidebarToggle";
import BrandLogo from "@/components/shared/brand-logo";
import { usePagination } from "@/hooks/usePagination";
import { Add, Box, Check, Edit, Notification, X } from "reicon-react";
import { TextureButton } from "@/components/ui/texture-button";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import {
  updateProductPrice,
  updateProductStatus,
  updateProductStock,
} from "@/features/products/actions";
import type { InventoryProduct } from "@/types";

const PAGE_SIZE = 10;

const statusConfig = {
  Active: {
    classes: "bg-tertiary/10 text-tertiary",
    dot: "bg-tertiary",
  },
  Draft: {
    classes: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  Archived: {
    classes: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

export default function InventoryPage({
  products,
}: {
  products: InventoryProduct[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Items");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const tabs = ["All Items", "Active", "Drafts"];

  const filteredProducts = products.filter((product) => {
    if (activeTab === "Active") return product.status === "Active";
    if (activeTab === "Drafts") return product.status === "Draft";
    return true;
  });

  function saveProduct(id: string, formData: FormData) {
    const toastId = toast.loading("Saving changes...");
    startTransition(async () => {
      try {
        const status = String(formData.get("status") ?? "");
        const stockRaw = String(formData.get("stock") ?? "").trim();
        const priceRaw = String(formData.get("price") ?? "").trim();
        await updateProductStatus(id, status);
        await updateProductStock(id, stockRaw === "" ? null : Number(stockRaw));
        await updateProductPrice(id, Number(priceRaw));
        setEditingId(null);
        router.refresh();
        toast.success("Product updated", { id: toastId });
      } catch {
        toast.error("Failed to save changes", { id: toastId });
      }
    });
  }

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
            <SidebarToggle className="-ml-2 shrink-0" />
            <h1 className="truncate text-base font-semibold sm:text-lg">
              Inventory
            </h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <TextureButton
              className="h-9"
              render={<Link href="/dashboard/products/new" />}
            >
              <Add size={18} className="-ms-3" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </TextureButton>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-xl font-semibold text-foreground">
            Your Collections
          </h2>
          <div className="flex items-center gap-1 self-start rounded-xl bg-muted p-1 md:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all sm:px-4 ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          <form
            id="inventory-edit-form"
            className="hidden"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              if (editingId) saveProduct(editingId, formData);
            }}
          />
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-muted">
                <Box size={24} className="text-muted-foreground" />
              </span>
              <p className="mt-4 text-base font-medium text-foreground">
                {products.length === 0
                  ? "No products yet"
                  : `No ${activeTab.toLowerCase()} products`}
              </p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {products.length === 0
                  ? "Create your first product to start selling on the storefront."
                  : "Try a different filter or add new products to this collection."}
              </p>
              <Link
                href="/dashboard/products/new"
                className="mt-5 inline-flex items-center gap-1.5 border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <Add size={16} />
                Add product
              </Link>
            </div>
          ) : (
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
                    const isEditing = editingId === product.id;
                    return (
                      <tr
                        key={product.id}
                        className="transition-colors hover:bg-muted/50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-6">
                            <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                              {product.image ? (
                                <Image
                                  fill
                                  sizes="64px"
                                  className="w-full h-full object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                  No image
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {product.type ?? "\u2014"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <div className="flex flex-wrap gap-1.5">
                              {(["Active", "Draft", "Archived"] as const).map(
                                (status) => (
                                  <label
                                    key={status}
                                    className="cursor-pointer"
                                  >
                                    <input
                                      className="hidden peer"
                                      defaultChecked={product.status === status}
                                      form="inventory-edit-form"
                                      name="status"
                                      type="radio"
                                      value={status.toUpperCase()}
                                    />
                                    <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                                      {status}
                                    </span>
                                  </label>
                                ),
                              )}
                            </div>
                          ) : (
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.classes}`}
                            >
                              <span
                                className={`mr-2 h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                              />
                              {product.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {isEditing ? (
                            <input
                              className="w-20 rounded-lg border border-border px-2.5 py-1 text-sm outline-none transition-colors focus:border-primary"
                              form="inventory-edit-form"
                              name="stock"
                              defaultValue={product.stock ?? ""}
                              type="number"
                              min={0}
                              placeholder="No stock"
                            />
                          ) : product.stock !== null ? (
                            `${product.stock} in stock`
                          ) : (
                            "\u2014"
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {isEditing ? (
                            <div className="relative w-28">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                $
                              </span>
                              <input
                                className="w-full rounded-lg border border-border py-1 pl-7 pr-2.5 text-sm outline-none transition-colors focus:border-primary"
                                form="inventory-edit-form"
                                name="price"
                                defaultValue={product.price.toFixed(2)}
                                type="number"
                                min={0}
                                step="0.01"
                              />
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-primary">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-2">
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
                                form="inventory-edit-form"
                                disabled={pending}
                                aria-label="Save changes"
                              >
                                {pending ? (
                                  <span className="block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                ) : (
                                  <Check size={18} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <button
                              className="text-muted-foreground transition-colors hover:text-foreground"
                              onClick={() => setEditingId(product.id)}
                              aria-label={`Edit ${product.name}`}
                            >
                              <Edit size={20} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <BrandLogo variant="wordmark" className="h-6" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A curated marketplace — hand-picked goods, sold once and sold right.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-4 text-sm font-medium text-foreground">
                Company
              </p>
              <ul className="space-y-2">
                {["Support", "Community", "Careers"].map((link) => (
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
                {["Privacy", "Terms", "Sitemap"].map((link) => (
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
              <TextureButton variant="inverse" type="button">
                Join
              </TextureButton>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-4 py-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Prime Axus. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
