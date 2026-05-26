import type { ReactNode } from "react";
import clsx from "@/components/ui/clsx";

export default function Badge({
  children,
  className,
  variant = "pink",
}: {
  children: ReactNode;
  className?: string;
  variant?: "pink" | "olive" | "champagne" | "black";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        "backdrop-blur-md",
        "shadow-[0_14px_60px_rgba(0,0,0,0.35)]",
        "border-[var(--gp-border)]/90",
        "bg-[rgba(30,30,30,0.35)]/40 text-[var(--gp-matte-champagne)]/90",
        "transition-colors duration-300",
        variant === "pink" && "border-nude-pink/35 bg-nude-pink/10 text-nude-pink",
        variant === "olive" && "border-soft-olive/35 bg-soft-olive/10 text-soft-olive",
        variant === "champagne" &&
          "border-matte-champagne/50 bg-matte-champagne/12 text-matte-champagne",
        variant === "black" &&
          "border-matte-champagne/25 bg-satin-black/25 text-matte-champagne/90",
        className
      )}
    >
      {children}
    </span>
  );
}

