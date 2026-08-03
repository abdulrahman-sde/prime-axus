import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE, uploadImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { error: "Image must be 1MB or smaller" },
      { status: 413 },
    );
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported image type. Use JPG, PNG, or WebP." },
      { status: 415 },
    );
  }

  try {
    const url = await uploadImage(file);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
