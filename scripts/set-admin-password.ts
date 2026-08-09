import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { hashPassword, verifyPassword } from "better-auth/crypto";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@maampalwasha.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("ADMIN_PASSWORD is not set in .env");
    process.exit(1);
  }

  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: { email, name: "Admin", role: "ADMIN" },
    });
    console.log(`Admin user created: ${email}`);
  }

  const hashed = await hashPassword(password);

  const account = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });

  if (account) {
    await prisma.account.update({
      where: { id: account.id },
      data: { password: hashed },
    });
  } else {
    await prisma.account.create({
      data: {
        id: crypto.randomUUID(),
        accountId: user.id,
        providerId: "credential",
        userId: user.id,
        password: hashed,
      },
    });
  }

  const stored = await prisma.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });

  if (stored?.password && (await verifyPassword({ hash: stored.password, password }))) {
    console.log(`Admin password updated for ${email}.`);
  } else {
    console.error("Password verification failed.");
    process.exit(1);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});