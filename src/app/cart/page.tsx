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

function formatBRL(value: number) {
  return value.toFixed(2);
}

export default function CartPage() {
  const cart = useCart();
  const itemsCount = cart.countItems();
  const subtotal = cart.total();

  // Mock de frete (mantém experiência visual sem depender de API)
  const shipping = itemsCount > 0 ? 25 : 0;
  const total = subtotal + shipping;

  const freeShippingTarget = 105.5;
  const currentAmount = subtotal;

  const recommendations = books.slice(1, 4);

  return (
    <div className="min-h-screen">
      <div className="cart-container">
        <Container>
          <div className="page-title">
            <h1>Meu carrinho</h1>
            <span>{itemsCount} itens</span>
          </div>

          <div className="cart-layout">
            <div>
              <div className="free-shipping-banner">
                <p>
                  {currentAmount < freeShippingTarget
                    ? `Falta R$ ${(freeShippingTarget - currentAmount).toFixed(2)} para você ganhar frete grátis.`
                    : "Parabéns! Você ganhou frete grátis!"}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.min(100, (currentAmount / freeShippingTarget) * 100)}%` }}
                  />
                </div>
              </div>

              <section className="cart-box">
                {cart.lines.length === 0 ? (
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
              onCheckout={() => {
                // Usa rota existente; mantém fluxo funcional
                window.location.href = "/checkout";
              }}
              onApplyCoupon={() => {
                // Mock visual: sem alterar totais (para não quebrar lógica atual)
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

      {/* Mantém seção visual final do site (sem mexer no resto) */}
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

