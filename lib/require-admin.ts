import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/** Throws unless the caller has a valid session. Use in every admin server action. */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  return session;
}
