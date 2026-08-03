import Link from "next/link";
import { At, Call, Location } from "reicon-react";

const footerLinks: Record<string, { label: string; href?: string }[]> = {
  shop: [
    { label: "T-Shirts", href: "/products?category=T-Shirts" },
    { label: "Hoodies", href: "/products?category=Hoodies" },
    { label: "Jeans & Pants", href: "/products?category=Jeans%20%26%20Pants" },
    { label: "Shoes", href: "/products?category=Shoes" },
    { label: "Accessories", href: "/products?category=Accessories" },
  ],
  support: [
    { label: "Help Center" },
    { label: "Shipping & Delivery" },
    { label: "Returns & Exchanges" },
  ],
};

const contactInfo = [
  { icon: At, label: "hello@essentials.pk" },
  { icon: Call, label: "+92 300 1234567" },
  { icon: Location, label: "Lahore, Pakistan" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-foreground">Essentials</span>
          <p className="text-sm text-muted-foreground">
            Curated apparel and everyday essentials — hand-picked fits for
            people who buy once and buy right.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">Shop</span>
          {footerLinks.shop.map((link) => (
            <Link
              key={link.label}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:underline"
              href={link.href ?? "#"}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">
            Support
          </span>
          {footerLinks.support.map((link) => (
            <Link
              key={link.label}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:underline"
              href={link.href ?? "#"}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-sm text-foreground">Contact</span>
          <div className="flex flex-col gap-2.5">
            {contactInfo.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <item.icon size={15} className="shrink-0" />
                {item.label}
              </span>
            ))}
          </div>
          <p className="text-sm leading-5 text-muted-foreground">
            Mon–Sat, 10am–8pm
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-6 text-sm md:flex-row">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Essentials. All rights reserved.
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <Link className="hover:underline" href="#">
            Privacy
          </Link>
          <Link className="hover:underline" href="#">
            Terms
          </Link>
          <Link className="hover:underline" href="#">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
