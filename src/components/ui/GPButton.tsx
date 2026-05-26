import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "@/components/ui/clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

export default function GPButton({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "variant">) {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gp-matte-champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--gp-satin-black)]",
        "relative overflow-hidden",
        "backdrop-blur-md",
        "shadow-[0_20px_70px_rgba(0,0,0,0.45)]",
        "hover:shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
        "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:bg-[radial-gradient(circle_at_30%_20%,rgba(203,184,157,0.28),transparent_55%)] before:blur-[8px] group-hover:before:opacity-100",
        variant === "primary" &&
          "bg-[var(--gp-brown-latte)] text-[var(--gp-satin-black)] hover:bg-[var(--gp-matte-champagne)]",
        variant === "secondary" &&
          "bg-[rgba(179,139,109,0.35)] text-matte-champagne ring-1 ring-[var(--gp-border)] hover:ring-matte-champagne/60",
        variant === "ghost" &&
          "bg-transparent text-matte-champagne ring-1 ring-[var(--gp-border)] hover:ring-matte-champagne/60",
        variant === "dark" &&
          "bg-[rgba(30,30,30,0.65)] text-matte-champagne hover:bg-[rgba(179,139,109,0.28)] border border-[var(--gp-border)]",
        className
      )}
    >
      {children}
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gp-nude-pink)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

