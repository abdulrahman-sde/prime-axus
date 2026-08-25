import { QuoteDown, Star } from "reicon-react";

const TESTIMONIALS = [
  {
    quote:
      "Ordered kitchen organizers on a Monday and was cooking with them by Thursday. The quality genuinely surprised me for the price.",
    name: "Sarah Mitchell",
    location: "Austin, TX",
    initials: "SM",
  },
  {
    quote:
      "Their desk setup picks turned my home office around. Everything I've bought feels chosen, not just stocked.",
    name: "David Chen",
    location: "Seattle, WA",
    initials: "DC",
  },
  {
    quote:
      "The pet feeder has been flawless for six months now. When I had a question, support replied the same evening.",
    name: "Amara Johnson",
    location: "Denver, CO",
    initials: "AJ",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="grid place-items-center">
          <Star size={14} weight="Filled" className="text-warning" />
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6">
        <h2 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium tracking-tight text-foreground">
          Loved by homes everywhere
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Real words from customers who buy once and buy right.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {TESTIMONIALS.map(({ quote, name, location, initials }) => (
          <figure
            key={name}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <Stars />
              <QuoteDown size={20} className="text-primary/25" />
            </div>
            <blockquote className="flex-1 text-sm leading-6 text-foreground/90">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {initials}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
