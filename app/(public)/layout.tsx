import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import StructuredData from "@/components/seo/structured-data";
import { CartProvider } from "@/hooks/use-cart";
import { getTopCategories } from "@/lib/categories";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prime Axus",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primeaxus.com",
  description:
    "Curated home, kitchen, office, and pet essentials with reliable delivery and fair pricing.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primeaxus.com"}/products?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getTopCategories(3);

  return (
    <CartProvider>
      <StructuredData data={websiteSchema} />
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Suspense fallback={null}>
          <Header categories={categories} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
