"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  productId: string;
  size: string | null;
  qty: number;
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (productId: string, size?: string | null, qty?: number) => void;
  updateQty: (productId: string, size: string | null, qty: number) => void;
  removeItem: (productId: string, size: string | null) => void;
  clear: () => void;
};

const STORAGE_KEY = "primeaxis.cart";

const CartContext = createContext<CartContextValue | null>(null);

function keyOf(item: Pick<CartItem, "productId" | "size">) {
  return `${item.productId}:${item.size ?? ""}`;
}

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed)
      ? parsed.filter(
          (item) =>
            typeof item?.productId === "string" &&
            Number.isInteger(item?.qty) &&
            (item.size === null || typeof item.size === "string"),
        )
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItems(loadCart());
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (productId: string, size: string | null = null, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find(
          (item) => keyOf(item) === keyOf({ productId, size }),
        );
        if (existing) {
          return prev.map((item) =>
            keyOf(item) === keyOf({ productId, size })
              ? { ...item, qty: Math.max(1, item.qty + qty) }
              : item,
          );
        }
        return [...prev, { productId, size, qty: Math.max(1, qty) }];
      });
    },
    [],
  );

  const updateQty = useCallback(
    (productId: string, size: string | null, qty: number) => {
      setItems((prev) =>
        qty <= 0
          ? prev.filter((item) => keyOf(item) !== keyOf({ productId, size }))
          : prev.map((item) =>
              keyOf(item) === keyOf({ productId, size })
                ? { ...item, qty }
                : item,
            ),
      );
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: string | null) => {
    setItems((prev) =>
      prev.filter((item) => keyOf(item) !== keyOf({ productId, size })),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, count, addItem, updateQty, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
