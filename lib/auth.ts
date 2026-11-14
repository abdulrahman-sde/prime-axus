import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    // Public sign-up is closed. Only the admin seed script may create users
    // (run it with ALLOW_ADMIN_SEED=true).
    disableSignUp: process.env.ALLOW_ADMIN_SEED !== "true",
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "ADMIN",
      },
    },
  },
});
