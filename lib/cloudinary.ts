import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const MAX_IMAGE_SIZE = 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadImage(file: File) {
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${base64}`,
    { folder: "maam-palwasha" },
  );
  return result.secure_url;
}
