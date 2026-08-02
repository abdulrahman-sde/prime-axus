import { Separator } from "@/components/ui/separator";
import Hero from "./components/hero";
import FeaturedProducts from "./components/featured-products";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <Hero />
        <Separator />
        <FeaturedProducts />
      </main>
    </div>
  );
}
