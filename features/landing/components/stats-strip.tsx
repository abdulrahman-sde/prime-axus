import { Location, ShoppingBag, ThumbsUp, Users } from "reicon-react";

const STATS = [
  {
    value: "50K+",
    label: "Happy Customers",
    Icon: Users,
    tileClass: "bg-primary/10 text-primary",
  },
  {
    value: "100K+",
    label: "Products Sold",
    Icon: ShoppingBag,
    tileClass: "bg-tertiary/10 text-tertiary",
  },
  {
    value: "50+",
    label: "Cities Covered",
    Icon: Location,
    tileClass: "bg-warning/15 text-warning",
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    Icon: ThumbsUp,
    tileClass: "bg-chart-3/10 text-chart-3",
  },
];

export default function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6">
        <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium tracking-tight text-foreground">
          Trusted, in numbers
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A quick look at what we&apos;ve built with our customers so far.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ value, label, Icon, tileClass }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tileClass}`}
            >
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-medium leading-none tracking-tight text-foreground tabular-nums">
                {value}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
