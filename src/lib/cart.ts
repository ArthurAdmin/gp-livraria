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
  if (!Array.isArray(lines)) return [];

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
  const [lines, setLines] = useState<CartState>(() => {
    if (typeof window === "undefined") return initialCart;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialCart;
      const parsed = safeParse(JSON.parse(raw));
      return parsed.length ? parsed : initialCart;
    } catch {
      return initialCart;
    }
  });

  const persist = useCallback((nextLines: CartState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLines));
    } catch {
      // ignore
    }
  }, []);

  const getBook = useCallback((bookId: string) => books.find((b) => b.id === bookId), []);


  const add = useCallback(
    (bookId: string, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.bookId === bookId);
        const next = existing
          ? prev.map((l) =>
              l.bookId === bookId ? { ...l, quantity: Math.max(1, l.quantity + quantity) } : l
            )
          : [...prev, { bookId, quantity: Math.max(1, quantity) }];

        // Persiste imediatamente para evitar re-hidratação com estado antigo ao navegar/voltar.
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const remove = useCallback(
    (bookId: string) => {
      setLines((prev) => {
        const next = prev.filter((l) => l.bookId !== bookId);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const setQuantity = useCallback(
    (bookId: string, quantity: number) => {
      setLines((prev) => {
        const q = Math.max(0, Math.floor(quantity));
        const next = q === 0 ? prev.filter((l) => l.bookId !== bookId) : prev.map((l) => (l.bookId === bookId ? { ...l, quantity: q } : l));
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clear = useCallback(() => {
    const next: CartState = [];
    persist(next);
    setLines(next);
  }, [persist]);

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


