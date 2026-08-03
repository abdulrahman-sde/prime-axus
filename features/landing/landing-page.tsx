import Hero from "./components/hero";
import FeaturedProducts, {
  type FeaturedProduct,
} from "./components/featured-products";
import ShopByCategory, {
  type CategoryTile,
} from "./components/shop-by-category";
import CtaSection from "./components/cta-section";

export default function LandingPage({
  products,
  categories,
}: {
  products: FeaturedProduct[];
  categories: CategoryTile[];
}) {
  return (
    <div className="bg-background text-foreground">
      <main>
        <Hero />
        <FeaturedProducts products={products} />
        <ShopByCategory categories={categories} />
        <CtaSection />
      </main>
    </div>
  );
}
