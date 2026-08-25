import { Headset, RotateLeft, ShieldCheck, Truck } from "reicon-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Flat shipping",
    description: "$2 shipping on every order",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    description: "100% secure transactions",
  },
  {
    icon: RotateLeft,
    title: "Easy returns",
    description: "30-day return policy",
  },
  {
    icon: Headset,
    title: "24/7 support",
    description: "Dedicated customer service",
  },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
              <Icon size={18} className="text-foreground" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
