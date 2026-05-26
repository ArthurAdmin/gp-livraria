import Link from "next/link";

export type CategoryCardProps = {
  id: string;
  name: string;
  icon: string;
  description?: string;
  count?: number;
};

export function CategoryCard({ id, name, icon, description, count }: CategoryCardProps) {
  return (
    <Link href={`/category/${id}`}>
      <div className="group relative overflow-hidden rounded-[1.1rem] border border-matte-champagne/30 bg-[var(--gp-brown-latte)]/40 p-6 transition-all duration-500 hover:border-matte-champagne/50 hover:-translate-y-1 cursor-pointer">
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-nude-pink/10 blur-2xl" />
        </div>

        <div className="relative">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-matte-champagne/40 bg-[var(--gp-brown-cappuccino)]/30 text-3xl">
            {icon}
          </div>

          <h3 className="mt-4 text-lg font-extrabold tracking-tight text-matte-champagne">
            {name}
          </h3>

          {description && (
            <p className="mt-2 text-sm leading-relaxed text-matte-champagne/60">
              {description}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            {count && (
              <p className="text-xs font-semibold tracking-wide text-matte-champagne/70">
                {count} livros
              </p>
            )}
            <span className="h-8 w-8 rounded-full border border-matte-champagne/40 bg-[var(--gp-brown-cappuccino)]/30 text-center leading-8 text-matte-champagne transition-colors duration-300 group-hover:bg-nude-pink/30">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
