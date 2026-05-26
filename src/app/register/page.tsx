"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Link href="/" className={styles.backBtn}>
          ← Voltar ao início
        </Link>

        <form
          className={styles.registerCard}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className={styles.title}>Criar uma conta</h1>
          <p className={styles.subtitle}>
            Preencha seus dados para criar sua conta
            <br /> na Livraria GP.
          </p>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="nome">
              Nome completo
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.icon}>♙</span>
              <input
                id="nome"
                className={styles.input}
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.icon}>✉</span>
              <input
                id="email"
                className={styles.input}
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="senha">
              Senha
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.icon}>▣</span>
              <input
                id="senha"
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.rightIcon}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: 16,
                  left: "auto",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  color: "#d7c5b4",
                  fontSize: 17,
                  padding: 0,
                  lineHeight: 1,
                }}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowPassword((v) => !v)}
              >
                ◉
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmar">
              Confirmar senha
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.icon}>▣</span>
              <input
                id="confirmar"
                className={styles.input}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.rightIcon}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: 16,
                  left: "auto",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  color: "#d7c5b4",
                  fontSize: 17,
                  padding: 0,
                  lineHeight: 1,
                }}
                aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                onClick={() => setShowConfirm((v) => !v)}
              >
                ◉
              </button>
            </div>
          </div>

          <label className={styles.terms}>
            <input type="checkbox" />
            <span>
              Li e aceito os <a href="#">Termos de Uso</a> e a
              <a href="#">Política de Privacidade</a>.
            </span>
          </label>

          <button type="submit" className={styles.primaryBtn}>
            Criar conta
          </button>

          <div className={styles.divider}>ou</div>

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => {
              // navegação via Link para manter padrão Next
              window.location.href = "/login";
            }}
          >
            Já tenho uma conta
          </button>
        </form>
      </section>
    </div>
  );
}

