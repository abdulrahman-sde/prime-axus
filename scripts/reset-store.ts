import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "better-auth/crypto";

async function main() {
  const targetEmail = process.env.ADMIN_EMAIL ?? "admin@maampalwasha.com";
  const newPassword = "maampalwasha1234";

  const orderItems = await prisma.orderItem.deleteMany();
  const orders = await prisma.order.deleteMany();
  const products = await prisma.product.deleteMany();
  const verifications = await prisma.verification.deleteMany();

  console.log(`Deleted: order_item=${orderItems.count} order=${orders.count} product=${products.count} verification=${verifications.count}`);

  const user = await prisma.user.findUnique({ where: { email: targetEmail } });
  if (!user) throw new Error(`User ${targetEmail} not found`);

  const hashed = await hashPassword(newPassword);
  const updated = await prisma.account.updateMany({
    where: { userId: user.id, providerId: "credential" },
    data: { password: hashed },
  });

  if (updated.count !== 1) throw new Error("Credential account row not found for user");
  console.log(`Password updated for ${targetEmail}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
