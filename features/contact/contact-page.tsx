import { Call, ClockCircle, Envelope } from "reicon-react";
import ContactForm from "./components/contact-form";
import {
  CONTACT_EMAIL,
  CONTACT_HOURS,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/constants/contact";

const CHANNELS = [
  {
    icon: Envelope,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    hint: "We reply within one business day.",
  },
  {
    icon: Call,
    label: "Phone",
    value: CONTACT_PHONE_DISPLAY,
    href: CONTACT_PHONE_HREF,
    hint: "Quick answers during business hours.",
  },
  {
    icon: ClockCircle,
    label: "Hours",
    value: CONTACT_HOURS,
    href: null,
    hint: "Closed on Sundays.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Contact us
        </p>
        <h1 className="mt-3 text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          Talk to a human.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Questions about an order, a product, or a return — reach out and
          we&apos;ll sort it out.
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {CHANNELS.map(({ icon: Icon, label, value, href, hint }) => {
          const content = (
            <>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
                <Icon size={18} className="text-foreground" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{value}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {hint}
                </p>
              </div>
            </>
          );

          return href ? (
            <a
              key={label}
              href={href}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-ring/40"
            >
              {content}
            </a>
          ) : (
            <div
              key={label}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-xs"
            >
              {content}
            </div>
          );
        })}
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="max-w-md">
          <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Send us a message
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Tell us what you need and we&apos;ll get back to you by email. For
            order issues, include your order number so we can find it fast.
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
