import { prisma } from "@/lib/prisma";
import { getTopCategories } from "@/lib/categories";
import LandingPage from "@/features/landing/landing-page";

// export const revalidate = 300;

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });

  const featuredProducts = products.filter((p) => p.featured);
  const featured =
    featuredProducts.length > 0
      ? featuredProducts.slice(0, 5)
      : products.slice(0, 5);

  const categories = await getTopCategories(3);

  return (
    <LandingPage
      products={featured.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        type: p.type,
        category: p.category,
        sizes: p.sizes,
        price: p.price.toNumber(),
        stock: p.stock,
        image: p.image,
      }))}
      categories={categories}
    />
  );
}
