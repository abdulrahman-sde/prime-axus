import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export default function EmptyPanel({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center",
        className,
      )}
    >
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted">
        <Icon size={24} className="text-muted-foreground" />
      </span>
      <h2 className="mt-4 text-lg font-medium text-foreground">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action && (
        <a
          href={action.href}
          className="mt-6 inline-flex items-center bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
