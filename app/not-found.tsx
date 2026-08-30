import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        The item or page you were looking for may have moved, or the link may be outdated.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Continue shopping
      </Link>
    </main>
  );
}
