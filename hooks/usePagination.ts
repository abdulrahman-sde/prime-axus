"use client";

import { useMemo, useState } from "react";

export function usePagination(totalItems: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [page, setPage] = useState(1);
  const safePage = Math.min(page, totalPages);

  const range = useMemo(
    () => ({
      start: totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1,
      end: Math.min(safePage * pageSize, totalItems),
    }),
    [safePage, pageSize, totalItems],
  );

  return { page: safePage, totalPages, setPage, ...range };
}
