// Fixes placeholder product names that make the store look fake.
//   npm run db:clean-catalog            -> dry run, prints what would change
//   npm run db:clean-catalog -- --apply -> writes the changes
// Renames "Generic / Unbranded ..." titles and ARCHIVES (hides, never removes)
// Purina listings. Archived items can be restored from the dashboard.
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const apply = process.argv.includes("--apply");

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  const products = await prisma.product.findMany();

  for (const p of products) {
    const cleaned = p.name
      .replace(/^\s*generic\s*\/\s*(unbranded\s*)?/i, "")
      .replace(/^\s*(generic|unbranded)\s+/i, "")
      .trim();
    if (cleaned && cleaned !== p.name) {
      console.log(`RENAME  "${p.name}"\n     -> "${cleaned}"`);
      if (apply) {
        await prisma.product.update({ where: { id: p.id }, data: { name: cleaned } });
      }
    }
    if (/purina/i.test(p.name) && p.status !== "ARCHIVED") {
      console.log(`ARCHIVE "${p.name}"`);
      if (apply) {
        await prisma.product.update({ where: { id: p.id }, data: { status: "ARCHIVED" } });
      }
    }
  }
  console.log(apply ? "\nApplied." : "\nDry run only. Re-run with --apply to write.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
