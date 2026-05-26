import type { ReactNode } from "react";

export default function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-20 ${className}`.trim()}>
      {children}
    </section>
  );
}

