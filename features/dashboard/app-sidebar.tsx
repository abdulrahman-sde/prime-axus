"use client";

import { usePathname } from "next/navigation";
import { Add, Box, Compass, ShoppingBag } from "reicon-react";
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
  { label: "Discover", icon: Compass, href: "/" },
  { label: "Inventory", icon: Box, href: "/dashboard/inventory" },
  { label: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
  { label: "Sell", icon: Add, href: "/dashboard/products/new" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center gap-2 px-4 py-5">
        <h1 className="text-xl font-bold text-primary whitespace-nowrap transition-opacity group-data-[collapsible=icon]:opacity-0">
          LuxeFrame
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <SidebarMenuItem key={link.label}>
                    <SidebarMenuButton
                      render={<a href={link.href} />}
                      isActive={isActive}
                      tooltip={link.label}
                    >
                      <Icon size={20} weight={isActive ? "Filled" : "Outline"} />
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
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            <img
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVBxDxo6qIvpHIaZ4j6N6IT9ggWBYixodrDxysZFlQbBHY8MRKbl91v8aF4HOh0Cjfzs7kaOilLZ76Ii_w2yqNnV6ye_A0uiZWNDCyhtSAz3rO8vnacsgVvCLD0ZSWw3od6q7StDGLXd5kzb8fRaITvR037m4dro0xkZ3mKCbBQgBLj8JRSmNniomclGso8COeVYsJnvwi-2IS47Phk3CqBws-wVVEOlDdTMq8Lu5LTdWi7iF5S1AT"
              alt=""
            />
          </div>
          <div className="min-w-0 transition-opacity group-data-[collapsible=icon]:opacity-0">
            <p className="truncate text-sm font-medium text-foreground">
              Alex Rivera
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Merchant Account
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
