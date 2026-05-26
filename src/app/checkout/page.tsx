"use client";

import Container from "@/components/ui/Container";
import GPButton from "@/components/ui/GPButton";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function CheckoutPage() {
  const cart = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const total = cart.total();
  const canProceed = cart.lines.length > 0 && name.trim().length >= 2 && email.includes("@");

  const orderSummary = useMemo(() => {
    return {
      items: cart.countItems(),
      total,
    };
  }, [cart, total]);

  return (
    <div className="min-h-screen bg-[#1E1E1E]">
      <Container>
        <div className="py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">CHECKOUT</p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-matte-champagne sm:text-4xl">
                Um fluxo limpo e acolhedor
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-matte-champagne/70">
                Forma simples, interface premium e cores que respiram.
              </p>

              <div className="mt-8 rounded-[1.1rem] border border-matte-champagne/25 bg-(--gp-brown-latte)/40 p-6 shadow-soft">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-matte-champagne/60">Nome</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-matte-champagne/25 bg-(--gp-brown-cappuccino)/30 px-4 py-3 text-sm font-semibold text-matte-champagne outline-none focus:ring-2 focus:ring-matte-champagne/60 focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
                      placeholder="Seu nome"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-matte-champagne/60">Email</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-matte-champagne/25 bg-(--gp-brown-cappuccino)/30 px-4 py-3 text-sm font-semibold text-matte-champagne outline-none focus:ring-2 focus:ring-matte-champagne/60 focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
                      placeholder="voce@exemplo.com"
                      inputMode="email"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold tracking-wide text-matte-champagne/60">Cidade</span>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-matte-champagne/25 bg-(--gp-brown-cappuccino)/30 px-4 py-3 text-sm font-semibold text-matte-champagne outline-none focus:ring-2 focus:ring-matte-champagne/60 focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
                      placeholder="Sua cidade"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Badge variant="pink">Pagamento mock</Badge>
                  <p className="text-xs font-semibold text-matte-champagne/60">
                    Ao finalizar, o carrinho será limpo (localStorage).
                  </p>
                </div>
              </div>
            </div>

            <aside className="w-full max-w-xl lg:w-105">
              <div className="rounded-[1.1rem] border border-matte-champagne/25 bg-(--gp-brown-cappuccino)/30 p-5 shadow-soft">
                <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">
                  RESUMO DO PEDIDO
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-matte-champagne/60">Itens</span>
                    <span className="text-sm font-extrabold text-matte-champagne">{orderSummary.items}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-matte-champagne/60">Total</span>
                    <span className="text-sm font-extrabold text-matte-champagne">
                      R$ {orderSummary.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 h-px bg-matte-champagne/25" />

                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    className="w-full"
                    onClick={() => {
                      if (!canProceed) return;
                      cart.clear();
                      window.location.href = "/";
                    }}
                    disabled={!canProceed}
                  >
                    <GPButton
                      variant="primary"
                      className="w-full"
                      type="button"
                      disabled={!canProceed}
                    >
                      Finalizar pedido
                    </GPButton>
                  </button>

                  <Link href="/cart" className="block">
                    <GPButton variant="ghost" className="w-full" type="button">
                      Voltar ao carrinho
                    </GPButton>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>

      <Section className="border-t border-matte-champagne/25" id="after">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/80">NOTA</p>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-matte-champagne">
                A experiência vem antes do checkout
              </h3>
            </div>
            <a href="/admin">
              <GPButton variant="secondary">Ver Admin</GPButton>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}

