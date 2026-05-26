"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const title = useMemo(() => "Login", []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <Link href="/" className={styles.backBtn}>
            ← Voltar ao início
          </Link>

          <form
            className={styles.loginCard}
            onSubmit={(e) => {
              e.preventDefault();
              // fluxo visual (sem backend)
            }}
          >
            <h1>{title}</h1>
            <p>Acesse sua conta para continuar</p>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="senha">
                Senha
              </label>
              <div className={styles.passwordWrap}>
                <input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eye}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  ◉
                </button>
              </div>
            </div>

            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" />
                Lembrar de mim
              </label>

              <a className={styles.forgot} href="#">
                Esqueceu sua senha?
              </a>
            </div>

            <button type="submit" className={styles.btnPrimary}>
              Entrar
            </button>

            <div className={styles.divider}>ou</div>

            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Criar uma conta
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}




