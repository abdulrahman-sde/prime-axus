"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createProductSchema, type CreateProductInput } from "@/lib/validations/product";

export type CreateProductState = {
  error?: string;
};

export async function createProduct(
  _prevState: CreateProductState,
  input: CreateProductInput,
): Promise<CreateProductState> {
  const parsed = createProductSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { name, description, type, category, sizes, price, stock, status, imageUrl, featured } =
    parsed.data;

  await prisma.product.create({
    data: {
      name,
      description: description || null,
      type: type || null,
      category: category ?? null,
      sizes,
      price: price.toFixed(2),
      stock: stock ?? null,
      status: status === "active" ? "ACTIVE" : "DRAFT",
      featured,
      image: imageUrl || null,
    },
  });

  redirect("/dashboard/inventory");
}

export async function updateProductStatus(id: string, status: string) {
  if (!["ACTIVE", "DRAFT", "ARCHIVED"].includes(status)) return;
  await prisma.product.update({
    where: { id },
    data: { status: status as "ACTIVE" | "DRAFT" | "ARCHIVED" },
  });
}

export async function updateProductStock(id: string, stock: number | null) {
  if (stock !== null && (Number.isNaN(stock) || stock < 0)) return;
  await prisma.product.update({ where: { id }, data: { stock } });
}

export async function updateProductPrice(id: string, price: number) {
  if (Number.isNaN(price) || price < 0) return;
  await prisma.product.update({ where: { id }, data: { price: price.toFixed(2) } });
}
