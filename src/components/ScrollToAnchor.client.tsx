"use client";

// Pequeno helper para evitar usar onClick em Server Components.
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}

