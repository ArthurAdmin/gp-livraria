"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Book, CartLine, initialCart, books } from "@/lib/products";

const STORAGE_KEY = "gp_cart_v1";

type CartState = CartLine[];

type CartAPI = {
  lines: CartState;
  add: (bookId: string, quantity?: number) => void;
  remove: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  clear: () => void;
  countItems: () => number;
  getLineTotal: (bookId: string) => number;
  total: () => number;
  getBook: (bookId: string) => Book | undefined;
};

function safeParse(lines: unknown): CartState {
  if (!Array.isArray(lines)) return initialCart;
  const parsed = lines
    .map((l) => {
      if (!l || typeof l !== "object") return null;
      const obj = l as { bookId?: unknown; quantity?: unknown };
      const bookId = obj.bookId;
      const quantity = obj.quantity;
      if (typeof bookId !== "string") return null;
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) return null;
      return { bookId, quantity } as CartLine;
    })
    .filter(Boolean) as CartState;

  return parsed.length ? parsed : initialCart;
}

export function useCart(): CartAPI {
  const [lines, setLines] = useState<CartState>(initialCart);

  useEffect(() => {
    let next: CartState | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      next = safeParse(JSON.parse(raw));
    } catch {
      // ignore
    }
    if (next) {
      // evita setState diretamente no corpo do effect (react-hooks/set-state-in-effect)
      queueMicrotask(() => setLines(next as CartState));
    }
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines]);

  const getBook = useCallback((bookId: string) => books.find((b) => b.id === bookId), []);

  const add = useCallback((bookId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.bookId === bookId);
      if (existing) {
        return prev.map((l) =>
          l.bookId === bookId ? { ...l, quantity: Math.max(1, l.quantity + quantity) } : l
        );
      }
      return [...prev, { bookId, quantity: Math.max(1, quantity) }];
    });
  }, []);

  const remove = useCallback((bookId: string) => {
    setLines((prev) => prev.filter((l) => l.bookId !== bookId));
  }, []);

  const setQuantity = useCallback((bookId: string, quantity: number) => {
    setLines((prev) => {
      const q = Math.max(0, Math.floor(quantity));
      if (q === 0) return prev.filter((l) => l.bookId !== bookId);
      return prev.map((l) => (l.bookId === bookId ? { ...l, quantity: q } : l));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const countItems = useCallback(() => lines.reduce((acc, l) => acc + l.quantity, 0), [lines]);

  const getLineTotal = useCallback(
    (bookId: string) => {
      const line = lines.find((l) => l.bookId === bookId);
      const book = getBook(bookId);
      if (!line || !book) return 0;
      return line.quantity * book.price;
    },
    [lines, getBook]
  );

  const total = useCallback(() => {
    return lines.reduce((acc, l) => {
      const book = getBook(l.bookId);
      if (!book) return acc;
      return acc + l.quantity * book.price;
    }, 0);
  }, [lines, getBook]);

  return useMemo(
    () => ({ lines, add, remove, setQuantity, clear, countItems, getLineTotal, total, getBook }),
    [
      lines,
      add,
      remove,
      setQuantity,
      clear,
      countItems,
      getLineTotal,
      total,
      getBook,
    ]
  );
}

