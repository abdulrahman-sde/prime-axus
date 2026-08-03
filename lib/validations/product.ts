import { z } from "zod";

export const MAX_IMAGE_SIZE = 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const CATEGORIES = [
  "T-Shirts",
  "Shirts",
  "Jeans & Pants",
  "Shorts",
  "Hoodies",
  "Jackets",
  "Kurtas",
  "Formal",
  "Shoes",
  "Accessories",
] as const;

export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const productFields = {
  name: z
    .string()
    .trim()
    .min(1, "Product title is required")
    .max(120, "Title must be under 120 characters"),
  description: z
    .string()
    .max(2000, "Description must be under 2000 characters")
    .optional()
    .default(""),
  type: z
    .string()
    .max(120, "Type must be under 120 characters")
    .optional()
    .default(""),
  category: z
    .enum(CATEGORIES, { error: "Select a category" })
    .optional(),
  sizes: z
    .array(z.enum(PRODUCT_SIZES), { error: "Select at least one size" })
    .min(1, "Select at least one size"),
  price: z.coerce
    .number({ error: "Enter a valid price" })
    .positive("Enter a valid price")
    .finite("Enter a valid price"),
  stock: z
    .union([
      z.number({ error: "Enter a valid stock quantity" }).int().min(0, "Stock can't be negative"),
      z.null(),
    ])
    .optional(),
  status: z.enum(["active", "draft"]),
  featured: z.boolean().optional().default(false),
};

export const productFormSchema = z.object({
  ...productFields,
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "Image must be 1MB or smaller")
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      "Unsupported type. Use JPG, PNG, or WebP.",
    )
    .optional(),
});

export const createProductSchema = z.object({
  ...productFields,
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
