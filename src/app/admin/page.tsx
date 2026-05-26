import Container from "@/components/ui/Container";
import GPButton from "@/components/ui/GPButton";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import { books } from "@/lib/products";
import Link from "next/link";

export default function AdminPage() {
  const mockRevenue = 3820.75;
  const mockOrders = 26;
  const mockStockLow = books.filter((b) => b.stock <= 5).length;

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <div className="bg-satin-black/95">
        <Container>
          <div className="py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  ADMIN
                </p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-matte-champagne sm:text-4xl">
                  Visão premium e minimalista
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-matte-champagne/70">
                  Dashboard mock com contraste editorial (Satin Black + Cappuccino Brown + Matte Champagne).
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="black">Mock</Badge>
                <Link href="/" className="inline-flex">
                  <GPButton variant="secondary" type="button">
                    Voltar ao site
                  </GPButton>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[1.1rem] border border-matte-champagne/20 bg-(--gp-brown-taupe)/35 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  RECEITA
                </p>
                <p className="mt-3 text-2xl font-extrabold text-matte-champagne">
                  R$ {mockRevenue.toFixed(2)}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-matte-champagne/20 bg-(--gp-brown-taupe)/35 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  PEDIDOS
                </p>
                <p className="mt-3 text-2xl font-extrabold text-matte-champagne">
                  {mockOrders}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-matte-champagne/20 bg-(--gp-brown-taupe)/35 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  BAIXO ESTOQUE
                </p>
                <p className="mt-3 text-2xl font-extrabold text-matte-champagne">
                  {mockStockLow}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-matte-champagne/20 bg-(--gp-brown-taupe)/35 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  STATUS
                </p>
                <p className="mt-3 text-2xl font-extrabold text-soft-olive">
                  Em operação
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="rounded-[1.1rem] border border-matte-champagne/20 bg-(--gp-brown-taupe)/35 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  LIVROS (MOCK)
                </p>
                <div className="mt-4 space-y-3">
                  {books.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-matte-champagne/15 bg-(--gp-brown-taupe)/35 p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-matte-champagne">
                          {b.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-matte-champagne/65">
                          {b.author}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-matte-champagne/65">
                          Estoque
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-matte-champagne">
                          {b.stock}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.1rem] border border-matte-champagne/20 bg-(--gp-brown-taupe)/35 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  AÇÕES
                </p>
                <div className="mt-4 space-y-3">
                  <GPButton variant="primary" className="w-full" type="button">
                    Criar livro (mock)
                  </GPButton>
                  <GPButton variant="ghost" className="w-full" type="button">
                    Marcar pedidos como pagos (mock)
                  </GPButton>
                  <div className="rounded-xl border border-matte-champagne/20 bg-(--gp-brown-cappuccino)/30 p-4">
                    <p className="text-xs font-semibold tracking-[0.2em] text-nude-pink">
                      MICROINTERAÇÃO
                    </p>
                    <p className="mt-2 text-sm font-semibold text-matte-champagne/75">
                      Linha fina + opacidade: identidade premium sem virar “SaaS tech”.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section className="border-t border-matte-champagne/20" id="footerAdmin">
        <Container>
          <div className="py-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  GP • Admin
                </p>
                <p className="mt-3 text-sm font-semibold text-matte-champagne/70">
                  Contraste sofisticado, calor humano e respiro editorial.
                </p>
              </div>
              <Link href="/">
                <GPButton variant="secondary">Explorar site</GPButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

