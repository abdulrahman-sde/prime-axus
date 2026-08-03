"use client";

import { SidebarLeft } from "reicon-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function SidebarToggle({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      className={cn(
        "rounded-md p-1.5 text-foreground transition-colors hover:bg-muted",
        className,
      )}
    >
      <SidebarLeft size={20} />
    </button>
  );
}
