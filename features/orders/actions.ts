"use server";

import { prisma } from "@/lib/prisma";

const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatus(id: string, status: string) {
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) return;
  await prisma.order.update({
    where: { id },
    data: { status: status as (typeof STATUSES)[number] },
  });
}
