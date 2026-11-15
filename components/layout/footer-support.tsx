import Link from "next/link";

const linkClass =
  "text-left text-sm text-muted-foreground transition-all hover:text-foreground hover:underline";

const links = [
  { label: "About Us", href: "/about" },
  { label: "Help Center", href: "/contact" },
  { label: "Shipping & Delivery", href: "/shipping-policy" },
  { label: "Returns & Refunds", href: "/return-policy" },
  { label: "Contact Us", href: "/contact" },
];

export default function FooterSupportLinks() {
  return (
    <>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
