"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatus(id: string, status: string) {
  await requireAdmin();
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) return;
  await prisma.order.update({
    where: { id },
    data: { status: status as (typeof STATUSES)[number] },
  });
}
