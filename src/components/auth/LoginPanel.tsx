"use client";

import { useMemo, useState } from "react";
import GPButton from "@/components/ui/GPButton";
import clsx from "@/components/ui/clsx";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 text-xs font-semibold tracking-wide text-matte-champagne/70">{children}</div>;
}

function LuxDivider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-[linear-gradient(to_right,transparent,rgba(203,184,157,0.35),transparent)]" />
      <div className="text-[11px] tracking-[0.22em] text-nude-pink/70">GP LIVRARIA</div>
      <div className="h-px flex-1 bg-[linear-gradient(to_left,transparent,rgba(203,184,157,0.35),transparent)]" />
    </div>
  );
}

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "create" | "forgot">("login");

  const isLogin = mode === "login";
  const isCreate = mode === "create";
  const isForgot = mode === "forgot";

  const title = useMemo(() => {
    if (isCreate) return "Criar conta";
    if (isForgot) return "Recuperar acesso";
    return "Entrar";
  }, [isCreate, isForgot]);

  const subtitle = useMemo(() => {
    if (isCreate)
      return "Comece com uma experiência editorial — minimalista, segura e premium.";
    if (isForgot)
      return "Envie seu e-mail e receba instruções para voltar ao ritmo do coração.";
    return "Acesse sua curadoria e continue sua jornada de fé.";
  }, [isCreate, isForgot]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Sem backend/SDK: mantém fluxo visual premium.
  }

  return (
    <div
      className={clsx(
        "relative w-full max-w-[560px]",
        "rounded-[28px] border border-[rgba(255,255,255,0.08)]",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]",
        "backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.65)] overflow-hidden"
      )}
    >
      {/* Luxury cinematic glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 320px at 20% 0%, rgba(179,139,109,0.22), transparent 55%), radial-gradient(600px 260px at 85% 10%, rgba(205,160,142,0.16), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(203,184,157,0.06), rgba(203,184,157,0.06) 1px, transparent 1px, transparent 10px)",
        }}
      />

      <div className="relative p-8 md:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-matte-champagne/20 bg-[rgba(255,255,255,0.03)] px-4 py-2">
              <span className="text-[11px] tracking-[0.22em] font-semibold text-matte-champagne/70">AUTENTICAÇÃO</span>
              <span className="h-1 w-1 rounded-full bg-[var(--gp-nude-pink)]" />
              <span className="text-[11px] tracking-[0.22em] font-semibold text-matte-champagne/70">EDITORIAL</span>
            </div>

            <h1 className="mt-5 font-[700] text-[44px] leading-[0.95] font-[Cormorant Garamond] text-matte-champagne">
              {title}
            </h1>
            <p className="mt-3 max-w-[420px] text-sm leading-7 text-matte-champagne/65">
              {subtitle}
            </p>
          </div>

          <div className="hidden md:block">
            <div className="relative h-24 w-24 rounded-[22px] border border-matte-champagne/20 bg-[rgba(255,255,255,0.03)] shadow-soft">
              <div className="absolute -inset-3 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(203,184,157,0.25),transparent_60%)] blur-[10px]" />
              <div className="relative h-full w-full flex items-center justify-center">
                <span className="text-sm font-black tracking-[0.22em] text-matte-champagne/70">GP</span>
              </div>
            </div>
          </div>
        </div>

        <LuxDivider />

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <FieldLabel>E-mail</FieldLabel>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="voce@exemplo.com"
              className={clsx(
                "w-full rounded-[18px]",
                "border border-[rgba(255,255,255,0.10)]",
                "bg-[rgba(255,255,255,0.03)]",
                "px-5 py-4 text-sm",
                "text-matte-champagne placeholder:text-matte-champagne/40",
                "outline-none",
                "focus:ring-2 focus:ring-[var(--gp-matte-champagne)] focus:ring-offset-2 focus:ring-offset-[var(--gp-satin-black)]"
              )}
            />
          </div>

          {!isForgot && (
            <div>
              <FieldLabel>Senha</FieldLabel>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className={clsx(
                  "w-full rounded-[18px]",
                  "border border-[rgba(255,255,255,0.10)]",
                  "bg-[rgba(255,255,255,0.03)]",
                  "px-5 py-4 text-sm",
                  "text-matte-champagne placeholder:text-matte-champagne/40",
                  "outline-none",
                  "focus:ring-2 focus:ring-[var(--gp-matte-champagne)] focus:ring-offset-2 focus:ring-offset-[var(--gp-satin-black)]"
                )}
              />
            </div>
          )}

          <div className="pt-2">
            <GPButton type="submit" variant="primary" className="w-full">
              <span className="inline-flex items-center gap-2">
                <span>{isCreate ? "Criar conta" : isForgot ? "Enviar e-mail" : "Entrar"}</span>
              </span>
            </GPButton>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 flex-wrap">
              {isLogin && (
                <button
                  type="button"
                  onClick={() => setMode("create")}
                  className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
                >
                  Criar conta
                </button>
              )}

              {isLogin && (
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
                >
                  Esqueci minha senha
                </button>
              )}

              {isCreate && (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
                >
                  Voltar para Entrar
                </button>
              )}

              {isForgot && (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
                >
                  Voltar para Entrar
                </button>
              )}
            </div>

            <div className="text-xs text-matte-champagne/55 leading-6">
              {isLogin
                ? "Ao entrar, você continua sua curadoria." 
                : isCreate
                  ? "Crie sua conta para acompanhar lançamentos." 
                  : "Sem complicação — em instantes."}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

