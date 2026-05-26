"use client";

import { useState } from "react";
import Container from "./Container";
import Section from "./Section";
import GPButton from "./GPButton";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      // Simular envio de email - em produção, integrar com serviço real
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEmail("");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <Section className="border-t border-matte-champagne/25">
      <Container>
        <div className="rounded-[1.1rem] border border-matte-champagne/30 bg-[var(--gp-brown-latte)]/40 p-8 sm:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/70">
              INSCRIÇÃO
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-matte-champagne sm:text-4xl">
              Receba nossa curadoria no seu email
            </h2>
            <p className="mt-4 text-base leading-relaxed text-matte-champagne/70">
              Descobertas literárias, reflexões sobre fé e recomendações exclusivas
              diretamente na sua caixa de entrada — sem ruído, apenas substância.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="seu email aqui..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 rounded-lg border border-matte-champagne/30 bg-[var(--gp-brown-cappuccino)]/30 px-4 py-3 text-sm text-matte-champagne placeholder-matte-champagne/40 transition-colors duration-300 focus:border-nude-pink/50 focus:outline-none"
              />
              <GPButton
                variant="primary"
                disabled={status === "loading"}
                className="min-w-max"
              >
                {status === "loading" ? "Enviando..." : "Inscrever"}
              </GPButton>
            </form>

            {status === "success" && (
              <p className="mt-4 text-sm font-semibold text-nude-pink">
                ✓ Email recebido! Aguarde nossas descobertas.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-semibold text-nude-pink">
                ✗ Ops, tente novamente.
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
