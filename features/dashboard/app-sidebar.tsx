"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import BrandLogo from "@/components/shared/brand-logo";
import { Add, Box, Home2, ShoppingBag } from "reicon-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const sidebarLinks = [
  { label: "Home", icon: Home2, href: "/dashboard", exact: true },
  { label: "Inventory", icon: Box, href: "/dashboard/inventory" },
  { label: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
  { label: "Add Product", icon: Add, href: "/dashboard/products/new" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center px-4 py-5">
        <Link href="/" aria-label="PrimeAxis home">
          <BrandLogo variant="mark" className="h-8" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                const Icon = link.icon;
                return (
                  <SidebarMenuItem key={link.label}>
                    <SidebarMenuButton
                      render={<Link href={link.href} />}
                      isActive={isActive}
                      tooltip={link.label}
                    >
                      <Icon
                        size={20}
                        weight={isActive ? "Filled" : "Outline"}
                      />
                      <span className={isActive ? "font-semibold" : ""}>
                        {link.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mt-2 flex items-center gap-3 rounded-lg border-t border-border px-3 pt-4 pb-3">
          {isPending ? (
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full border border-border bg-muted" />
          ) : user?.image ? (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              <Image
                fill
                sizes="40px"
                className="h-full w-full object-cover"
                src={user.image}
                alt=""
              />
            </div>
          ) : (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-primary/10 text-sm font-semibold text-primary">
              {(user?.name ?? user?.email ?? "?").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 transition-opacity group-data-[collapsible=icon]:opacity-0">
            <p className="truncate text-sm font-medium text-foreground">
              {isPending ? "Loading..." : user?.name ?? "Signed in"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {isPending ? "Fetching account" : user?.email ?? "PrimeAxis"}
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
