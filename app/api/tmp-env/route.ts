// TEMPORARY: delete this file after reading the variables.
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// SHA-256 of the secret access token (the token itself is not stored in the repo).
const TOKEN_SHA256 =
  "10517786c2b20a2b6d8aae1a7ad8b4db7cbcfd96ff30e6147efc30f025b0047d";

const KEYS = [
  "BETTER_AUTH_URL",
  "DATABASE_URL",
  "BETTER_AUTH_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const hash = createHash("sha256").update(token).digest("hex");
  if (hash !== TOKEN_SHA256) {
    return new NextResponse("Not found", { status: 404 });
  }
  const body = KEYS.map((k) => `${k}=${process.env[k] ?? ""}`).join("\n");
  return new NextResponse(body, {
    headers: { "content-type": "text/plain", "cache-control": "no-store" },
  });
}
