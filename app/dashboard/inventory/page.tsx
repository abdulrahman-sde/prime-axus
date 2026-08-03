import { prisma } from "@/lib/prisma";
import InventoryPage from "@/features/inventory/inventory-page";

const STATUS_LABEL = {
  ACTIVE: "Active",
  DRAFT: "Draft",
  ARCHIVED: "Archived",
} as const;

export default async function InventoryRoute() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <InventoryPage
      products={products.map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        status: STATUS_LABEL[p.status],
        stock: p.stock,
        price: p.price.toNumber(),
        image: p.image,
      }))}
    />
  );
}
