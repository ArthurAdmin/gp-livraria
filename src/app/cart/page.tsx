"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import GPButton from "@/components/ui/GPButton";
import { useCart } from "@/lib/cart";


import Link from "next/link";

import { CartItem } from "@/components/cart/CartItem";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ProductCard } from "@/components/cart/ProductCard";

import { books } from "@/lib/products";
import { useEffect, useState } from "react";

function formatBRL(value: number) {

  return value.toFixed(2);
}

export default function CartPage() {
  const cart = useCart();

  // Evita mismatch no SSR vs Client por causa do localStorage.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // seta após o primeiro commit para evitar warnings do eslint
    queueMicrotask(() => setMounted(true));
  }, []);









  // Valores iniciais estáveis para não causar mismatch no hydration
  const itemsCount = mounted ? cart.countItems() : 0;
  const subtotal = mounted ? cart.total() : 0;

  // Mock de frete (mantém experiência visual sem depender de API)
  const shipping = itemsCount > 0 ? 25 : 0;
  const total = subtotal + shipping;

  const recommendations = books.slice(1, 4);

  return (
    <div className="min-h-screen">
      <div className="cart-container">
        <Container>
          <div className="page-title">
            <Link
              href="/"
              className="inline-flex h-13.5 items-center gap-3 rounded-2xl border border-[rgba(218,176,132,0.35)] bg-[rgba(179,139,109,0.10)] px-6 py-0 text-xs font-semibold tracking-wide text-[#c99d78] backdrop-blur shadow-soft transition-all duration-300 hover:bg-[rgba(179,139,109,0.18)] hover:text-[#f1d2b5]"
            >
              <span aria-hidden="true" className="text-matte-champagne/90">
                ←
              </span>
              <span>Voltar ao início</span>
            </Link>
            <h1>Meu carrinho</h1>
            <span>{itemsCount} itens</span>
          </div>

          <div className="cart-layout">
            <div>
              <section className="cart-box">
                {!mounted ? (
                  <div className="py-10 text-center" aria-hidden="true">
                    <p className="text-sm font-semibold text-matte-champagne/70">
                      Carregando...
                    </p>
                  </div>
                ) : cart.lines.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm font-semibold text-matte-champagne/70">
                      Seu carrinho está vazio.
                    </p>
                    <Link href="/" className="mt-4 inline-flex">
                      <GPButton variant="secondary">
                        Voltar ao catálogo
                      </GPButton>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {cart.lines.map((line) => {
                      const book = cart.getBook(line.bookId);
                      if (!book) return null;

                      return (
                        <CartItem
                          key={line.bookId}
                          id={line.bookId}
                          title={book.title}
                          author={book.author}
                          price={book.price}
                          quantity={line.quantity}
                          onRemove={() => cart.remove(line.bookId)}
                          onQuantityChange={(id, nextQty) =>
                            cart.setQuantity(id, nextQty)
                          }
                        />
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            <OrderSummary
              itemsCount={itemsCount}
              subtotal={subtotal}
              shipping={shipping}
              items={mounted
                ? cart.lines.map((line) => {
                    const book = cart.getBook(line.bookId);
                    return {
                      title: book?.title ?? "Livro",
                      quantity: line.quantity,
                      unitPrice: book?.price ?? 0,
                    };
                  })
                : []}
              onCheckout={async () => {
                // Se estiver logado, sincroniza primeiro o carrinho no banco
                try {
                  const me = await fetch("/api/auth/me", { credentials: "include" });
                  if (me.ok) {
                    const payload = {
                      lines: cart.lines.map((l) => ({
                        productId: l.bookId,
                        quantity: l.quantity,
                      })),
                    };

                    await fetch("/api/cart/sync", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify(payload),
                    });
                  }
                } catch {
                  // mantém UX: checkout continua WhatsApp (por enquanto)
                }

                const NUMERO_DA_LOJA = "SEU_NUMERO_AQUI";

                const items = cart.lines.map((line) => {
                  const book = cart.getBook(line.bookId);
                  return {
                    title: book?.title ?? "Livro",
                    quantity: line.quantity,
                    unitPrice: book?.price ?? 0,
                    lineTotal: (book?.price ?? 0) * line.quantity,
                  };
                });


                const shippingText = shipping.toFixed(2).replace(".", ",");

                const totalText = (subtotal + shipping)
                  .toFixed(2)
                  .replace(".", ",");

                const mensagem =
                  `Olá! Gostaria de finalizar meu pedido na Livraria GP.\n\n` +
                  `Pedido:\n${items.length ? items[0].title : ""}\n` +
                  `Quantidade: ${
                    items.length
                      ? items.reduce((acc, i) => acc + i.quantity, 0)
                      : 0
                  }\n` +
                  `Valor unitário: R$ ${
                    items.length
                      ? (items[0].unitPrice as number)
                          .toFixed(2)
                          .replace(".", ",")
                      : "0,00"
                  }\n\n` +
                  `Frete: R$ ${shippingText}\n` +
                  `Total: R$ ${totalText}\n\n` +
                  `Aguardo o atendimento para concluir a compra.`;

                const whatsappUrl = `https://wa.me/${NUMERO_DA_LOJA}?text=${encodeURIComponent(
                  mensagem
                )}`;

                window.open(whatsappUrl, "_blank");
              }}
            />
          </div>

          <section className="recommendations-section">
            <h2>Você também pode gostar</h2>

            <div className="products-grid">
              {recommendations.map((b) => (
                <ProductCard
                  key={b.id}
                  id={b.id}
                  title={b.title}
                  author={b.author}
                  price={b.price}
                  onAddToCart={() => {
                    // UX somente (sem assumir APIs não existentes no cart)
                  }}
                />
              ))}
            </div>
          </section>
        </Container>
      </div>

      <Section className="mt-0" id="final">
        <Container>
          <div className="hidden" aria-hidden="true">
            <Badge variant="champagne">total {formatBRL(total)}</Badge>
          </div>
        </Container>
      </Section>
    </div>
  );
}

