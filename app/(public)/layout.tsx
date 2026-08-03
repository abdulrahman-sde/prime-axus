import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/hooks/use-cart";
import { getTopCategories } from "@/lib/categories";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getTopCategories(8);

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Suspense fallback={null}>
          <Header categories={categories} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
