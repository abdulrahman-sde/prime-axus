"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu2, Search, ShoppingCart, User } from "reicon-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TextureButton } from "@/components/ui/texture-button";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import type { TopCategory } from "@/lib/categories";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

function categoryHref(name: string) {
  return `/products?category=${encodeURIComponent(name)}`;
}

export default function Header({ categories }: { categories: TopCategory[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { count } = useCart();
  const activeCategory = searchParams.get("category");

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            className="shrink-0 text-lg font-semibold tracking-tight text-primary"
            href="/"
          >
            Essentials
          </Link>

          <form
            action="/products"
            method="get"
            role="search"
            className="mx-auto hidden w-full max-w-xl items-center gap-2 rounded-full border border-border bg-muted py-1 pl-4 pr-1.5 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary md:flex"
          >
            <Search size={16} className="shrink-0 text-muted-foreground" />
            <input
              name="search"
              placeholder="Search suits, fabric, essentials..."
              className="h-4 w-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
            />
            <TextureButton type="submit" size="sm" className="rounded-full">
              Search
            </TextureButton>
          </form>

          <div className="flex items-center gap-1">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-full px-3 py-2 text-foreground transition-colors hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <span className="hidden text-sm font-medium sm:inline">Cart</span>
              {count > 0 && (
                <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-foreground transition-colors hover:bg-muted md:flex"
            >
              <User size={20} />
              <span className="text-sm font-medium">Sign in</span>
            </Link>

            <Sheet>
              <SheetTrigger
                render={
                  <button
                    className="rounded-full p-2 text-foreground transition-colors hover:bg-muted md:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu2 size={20} />
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>Essentials</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-4">
                  {navLinks.map((link) => {
                    const active =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  {categories.length > 0 && (
                    <>
                      <div className="my-2 h-px bg-border" />
                      <p className="px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground">
                        Categories
                      </p>
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          href={categoryHref(category.name)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          <span>{category.name}</span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {category.count}
                          </span>
                        </Link>
                      ))}
                    </>
                  )}

                  <div className="my-2 h-px bg-border" />
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <ShoppingCart size={16} />
                    Cart
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <User size={16} />
                    Sign in
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <form
          action="/products"
          method="get"
          role="search"
          className="mx-4 mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-1.5 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary sm:mx-6 md:hidden"
        >
          <Search size={16} className="shrink-0 text-muted-foreground" />
          <input
            name="search"
            placeholder="Search suits, fabric, essentials..."
            className="h-8 w-full min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </form>

        {categories.length > 0 && (
          <nav
            aria-label="Categories"
            className="hidden overflow-x-auto border-t border-border lg:block"
          >
            <div className="mx-auto flex h-11 max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
              <Link
                href="/products"
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  pathname === "/products" && activeCategory === null
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={categoryHref(category.name)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                    pathname.startsWith("/products") &&
                      activeCategory === category.name
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
