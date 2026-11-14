import Link from "next/link";
import { Call, Envelope, Location } from "reicon-react";
import BrandLogo from "@/components/shared/brand-logo";
import FooterSupportLinks from "@/components/layout/footer-support";
import SocialLinks from "@/components/layout/social-links";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/constants/contact";

const shopLinks = [
  { label: "Home & Kitchen", href: "/products?category=Home%20%26%20Kitchen" },
  { label: "Office Products", href: "/products?category=Office%20Products" },
  { label: "Pet Supplies", href: "/products?category=Pet%20Supplies" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="Prime Axus home" className="w-fit">
            <BrandLogo variant="wordmark" className="h-10" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Curated goods that make everyday life easier — hand-picked for
            people who buy once and buy right.
          </p>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-sm text-foreground">
              Follow us
            </span>
            <SocialLinks className="flex items-center gap-2.5" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">Shop</span>
          {shopLinks.map((link) => (
            <Link
              key={link.label}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:underline"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">Support</span>
          <FooterSupportLinks />
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-sm text-foreground">Contact</span>
          <div className="flex flex-col gap-2.5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Envelope size={15} className="shrink-0" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={CONTACT_PHONE_HREF}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Call size={15} className="shrink-0" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Location size={15} className="shrink-0" />
              Austin, Texas, USA
            </span>
          </div>
          <p className="text-sm leading-5 text-muted-foreground">
            Support replies within 1 business day
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-6 text-sm md:flex-row">
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Prime Axus. All rights reserved.
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <Link className="hover:underline" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:underline" href="/terms">
            Terms
          </Link>
          <Link className="hover:underline" href="/sitemap.xml">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
