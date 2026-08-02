import { At, Camera, Language, Qr } from "reicon-react";

const footerLinks: Record<string, { label: string; href?: string }[]> = {
  support: [
    { label: "Help Center" },
    { label: "LuxeCover" },
    { label: "Anti-discrimination" },
    { label: "Disability support" },
  ],
  community: [
    { label: "Photographer Stories" },
    { label: "Community Forum" },
    { label: "Hosting responsibly" },
  ],
  hosting: [
    { label: "Sell Your Photography", href: "/dashboard/products/new" },
    { label: "Hosting Resources" },
    { label: "Workshops" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-2xl border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-lg py-2xl grid grid-cols-1 md:grid-cols-4 gap-xl">
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-foreground">LuxeFrame</span>
          <p className="text-sm text-muted-foreground">
            Curating the world&#39;s most evocative photography for modern
            spaces. From peaks to streets, find your frame.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">Support</span>
          {footerLinks.support.map((link) => (
            <a
              key={link.label}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:underline"
              href={link.href ?? "#"}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">
            Community
          </span>
          {footerLinks.community.map((link) => (
            <a
              key={link.label}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:underline"
              href={link.href ?? "#"}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm text-foreground">Hosting</span>
          {footerLinks.hosting.map((link) => (
            <a
              key={link.label}
              className="text-sm text-muted-foreground transition-all hover:text-foreground hover:underline"
              href={link.href ?? "#"}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 border-t border-border px-lg py-md text-sm md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
          <span>&copy; 2024 LuxeFrame Photography. All rights reserved.</span>
          <a className="hover:underline" href="#">
            Privacy
          </a>
          <a className="hover:underline" href="#">
            Terms
          </a>
          <a className="hover:underline" href="#">
            Sitemap
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Language size={18} />
            <span>English (US)</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>$ USD</span>
          </div>
          <div className="flex items-center gap-4">
            <Qr
              size={20}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            />
            <Camera
              size={20}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            />
            <At
              size={20}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
