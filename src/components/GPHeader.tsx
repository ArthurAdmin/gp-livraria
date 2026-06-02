"use client";

import Link from "next/link";

import "./gpheader-desktop.css";
import "./gpheader-mobile-search.css";


export default function GPHeader() {
  return (
    <>
      {/* Desktop */}
      <header className="desktop-header" aria-label="Cabeçalho desktop">


        <Link href="/" className="desktop-brand" aria-label="Ir para a página inicial">
          <div className="desktop-logo">GP</div>

          <div className="desktop-brand-text">
            <span>LIVRARIA</span>
            <span>GP</span>
          </div>
        </Link>

        <div className="desktop-search-wrap">
          <input
            className="desktop-search"
            type="text"
            placeholder="Buscar por título, autor, tema ou ISBN..."
            aria-label="Buscar"
          />
        </div>

        <nav className="desktop-nav" aria-label="Menu principal">
          <Link href="/login">Login</Link>
          <Link href="/catalogo">Catálogo</Link>

          <Link href="/cart">Carrinho</Link>
        </nav>
      </header>


      {/* Mobile header */}
      <header className="mobile-header sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(7,7,7,0.97)] backdrop-blur">
        <div className="mobile-header-inner">
          <button
            className="mobile-icon-btn hamburger-btn"
            aria-label="Abrir menu"
            type="button"
            onClick={() => {
              const el = document.getElementById("gp_mobile_menu");
              if (!el) return;
              el.classList.toggle("open");
            }}
          >
            <span />
            <span />
            <span />
          </button>

          <Link href="/" className="mobile-brand" aria-label="Ir para a página inicial">
            <div className="mobile-logo">GP</div>
            <div className="mobile-brand-text">
              <span>LIVRARIA</span>
              <span>GP</span>
            </div>
          </Link>

          <div className="mobile-actions">
            <button className="mobile-icon-btn" aria-label="Buscar" type="button" id="gp_mobile_search_btn" onClick={() => {
              const el = document.getElementById("gp_mobile_search_panel");
              if (!el) return;
              el.classList.toggle("open");
              const input = document.getElementById("gp_mobile_search_input") as HTMLInputElement | null;
              input?.focus();
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>


            <Link href="/cart" className="mobile-icon-btn" aria-label="Carrinho">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6H21L19 14H8L6 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M6 6L5 2H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20" r="1.5" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Menu mobile */}
        <div id="gp_mobile_menu" className="gp-mobile-menu" aria-hidden="true">
          <div className="gp-mobile-menu__inner">
            <Link href="/login" className="gp-mobile-menu__link">
              Login
            </Link>
            <Link href="#catalogo" className="gp-mobile-menu__link" onClick={() => hideMenu()}>
              Catálogo
            </Link>
          </div>
        </div>

        {/* Painel busca mobile */}
        <div id="gp_mobile_search_panel" className="gp-mobile-search" aria-hidden="true">
          <div className="gp-mobile-search__inner">
            <input
              id="gp_mobile_search_input"
              className="gp-mobile-search__input"
              type="text"
              placeholder="Buscar por título, autor ou tema..."
              aria-label="Buscar no catálogo"
            />
            <button
              className="gp-mobile-search__clear"
              type="button"
              aria-label="Limpar busca"
              onClick={() => {
                const input = document.getElementById("gp_mobile_search_input") as HTMLInputElement | null;
                if (!input) return;
                input.value = "";
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.focus();
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function hideMenu() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("gp_mobile_menu");
  if (!el) return;
  el.classList.remove("open");
}

