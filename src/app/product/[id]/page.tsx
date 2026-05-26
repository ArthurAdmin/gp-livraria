import Container from "@/components/ui/Container";
import GPButton from "@/components/ui/GPButton";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { books } from "@/lib/products";
import { notFound } from "next/navigation";
import { useCart } from "@/lib/cart";

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id);
  if (!book) notFound();

  return <ProductClient book={book} />;
}

function ProductClient({ book }: { book: (typeof books)[number] }) {
  const cart = useCart();

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Container>
        <div className="py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="champagne">{book.category}</Badge>
                {book.badges?.[0] ? (
                  <Badge variant="pink">{book.badges[0]}</Badge>
                ) : null}
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-matte-champagne sm:text-5xl">
                {book.title}
              </h1>
              {book.subtitle ? (
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-matte-champagne/70">
                  {book.subtitle}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-matte-champagne/60">
                <span>{book.author}</span>
                <span className="h-1 w-1 rounded-full bg-matte-champagne/80" />
                <span>{book.language}</span>
                <span className="h-1 w-1 rounded-full bg-matte-champagne/80" />
                <span>{book.pages} páginas</span>
              </div>

              <div className="mt-6 rounded-[1.1rem] border border-matte-champagne/25 bg-[var(--gp-brown-latte)]/40 p-6 shadow-soft">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  SOBRE
                </p>
                <p className="mt-3 leading-relaxed text-matte-champagne/70">
                  {book.description}
                </p>
              </div>
            </div>

            <aside className="w-full max-w-xl lg:w-[420px]">
              <div
                className="relative overflow-hidden rounded-[1.1rem] border border-matte-champagne/25 bg-[var(--gp-brown-cappuccino)]/30 p-4 shadow-editorial"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 20%, ${book.cover.accent}55, transparent 55%), linear-gradient(135deg, ${book.cover.gradientFrom}, ${book.cover.gradientTo})`,
                }}
              >
                <div className="aspect-[4/5] w-full rounded-xl border border-matte-champagne/25 bg-[var(--gp-brown-taupe)]/35 p-5">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <Badge variant="olive">Curadoria GP</Badge>
                      {book.stock <= 5 ? (
                        <Badge variant="pink">Estoque limitado</Badge>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                        EDIÇÃO
                      </p>
                      <p className="mt-2 text-2xl font-extrabold tracking-tight text-matte-champagne">
                        {book.cover.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-matte-champagne/60">
                        a partir de
                      </p>
                      <p className="text-3xl font-extrabold text-matte-champagne">
                        R$ {book.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold tracking-wide text-soft-olive/90">
                      {book.stock > 0 ? "Disponível" : "Indisponível"}
                    </div>
                    <div className="text-xs font-semibold text-matte-champagne/60">
                      {book.stock} em estoque
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <GPButton
                      className="w-full"
                      variant="primary"
                      type="button"
                      onClick={() => cart.add(book.id, 1)}
                      disabled={book.stock <= 0}
                    >
                      Adicionar ao carrinho
                    </GPButton>
                    <GPButton
                      className="w-full"
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        cart.add(book.id, 1);
                        window.location.href = "/cart";
                      }}
                      disabled={book.stock <= 0}
                    >
                      Comprar agora
                    </GPButton>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>

      <Section
        className="border-t border-matte-champagne/25"
        id="relacionados"
      >
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                VOCÊ PODE GOSTAR
              </p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-matte-champagne">
                Continuidade da jornada
              </h3>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {books
              .filter((b) => b.id !== book.id)
              .slice(0, 3)
              .map((b) => (
                <a
                  key={b.id}
                  href={`/product/${b.id}`}
                  className="group rounded-xl border border-matte-champagne/25 bg-[var(--gp-brown-latte)]/40 p-4 shadow-soft transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="champagne">{b.cover.label}</Badge>
                    <span className="text-xs font-extrabold text-matte-champagne">
                      R$ {b.price.toFixed(2)}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-extrabold text-matte-champagne">
                    {b.title}
                  </h4>
                  <p className="mt-1 text-xs text-matte-champagne/60">
                    {b.author}
                  </p>
                  <div className="mt-3 h-px w-16 bg-matte-champagne/25 transition-colors group-hover:bg-nude-pink/70" />
                </a>
              ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

