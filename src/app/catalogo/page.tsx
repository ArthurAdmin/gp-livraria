"use client";

import GPHeader from "@/components/GPHeader";
import { useCart } from "@/lib/cart";
import { books } from "@/lib/products";
import { useEffect, useMemo, useState } from "react";

import "./catalogo.css";

function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function matchesBook(book: (typeof books)[number], query: string) {
  if (!query) return true;
  const q = normalize(query);

  const title = normalize(book.title);
  const author = normalize(book.author);
  const category = normalize(book.category);

  return title.includes(q) || author.includes(q) || category.includes(q);
}

function BookCard({
  book,
  onAdd,
}: {
  book: (typeof books)[number];
  onAdd: (id: string) => void;
}) {
  const priceStr = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(book.price);

  return (
    <article className="gp-cat-card" aria-label={book.title}>
      <div
        className="gp-cat-cover"
        style={{
          background: `linear-gradient(180deg, ${book.cover.gradientFrom}, ${book.cover.gradientTo})`,
        }}
      >
        {book.title}
      </div>

      <div className="gp-cat-info">
        <h3 className="gp-cat-title">{book.title}</h3>
        <p className="gp-cat-author">{book.author}</p>

        <div className="gp-cat-price-row">
          <div className="gp-cat-price">{priceStr}</div>
          <button
            type="button"
            className="gp-cat-add"
            aria-label={`Adicionar ${book.title} ao carrinho`}
            onClick={() => onAdd(book.id)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default function CatalogoPage() {
  const cart = useCart();
  const [query, setQuery] = useState("");

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Todos",
    "Bíblia",
    "Devocionais",
    "Vida Cristã",
    "Teologia",
    "Outros",
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>(
    "Todos"
  );

  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const priceRange = {
    min: 0,
    max: 999999,
  };

  const [minPrice, setMinPrice] = useState<number>(priceRange.min);
  const [maxPrice, setMaxPrice] = useState<number>(priceRange.max);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const [authorFilter, setAuthorFilter] = useState("");
  const [themeFilter, setThemeFilter] = useState("");

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const bySearch = matchesBook(b, query);

      const byCategory =
        selectedCategory === "Todos" ? true : selectedCategory === "Outros" ? !b.category : b.category === selectedCategory;

      const byPrice = b.price >= minPrice && b.price <= maxPrice;
      const byStock = !onlyInStock || b.stock > 0;

      const authorQ = normalize(authorFilter);
      const themeQ = normalize(themeFilter);

      const byAuthor = !authorQ || normalize(b.author).includes(authorQ);
      const byTheme = !themeQ || normalize(b.category).includes(themeQ) || normalize(b.title).includes(themeQ);

      return bySearch && byCategory && byPrice && byStock && byAuthor && byTheme;
    });
  }, [authorFilter, maxPrice, minPrice, onlyInStock, query, selectedCategory, themeFilter]);

  const handleAdd = (bookId: string) => {
    cart.add(bookId, 1);

    if (typeof window === "undefined") return;

    // toast minimalista premium (reaproveita o padrão do site)
    const toastId = "gp_toast_added";
    const old = document.getElementById(toastId);
    if (old) old.remove();

    const toast = document.createElement("div");
    toast.id = toastId;
    toast.className = "gp-toast";
    toast.textContent = "✓ Adicionado ao carrinho";

    document.body.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("gp-toast--hide");
      window.setTimeout(() => toast.remove(), 220);
    }, 2000);
  };

  return (
    <div className="gp-catalog-page">
      <GPHeader />

      <section className="gp-catalog-hero" aria-label="Hero Catálogo">
        <h1 className="gp-catalog-h1">Catálogo</h1>
        <p className="gp-catalog-subtitle">
          Explore todos os livros selecionados para acompanhar sua jornada de fé,
          propósito e contemplação.
        </p>
      </section>

      <main className="gp-catalog-main">
        <div className="gp-catalog-toolbar">
          <div className="gp-catalog-filters">
            <button
              type="button"
              className="gp-catalog-btn gp-catalog-btn--soft"
              aria-expanded={showFilters}
              onClick={() => {
                setShowCategoryMenu(false);
                setShowFilters((v) => !v);
              }}
            >
              ☰ Filtrar
            </button>

            <button
              type="button"
              className="gp-catalog-btn gp-catalog-btn--soft"
              aria-expanded={showCategoryMenu}
              onClick={() => {
                setShowFilters(false);
                setShowCategoryMenu((v) => !v);
              }}
            >
              {selectedCategory === "Todos" ? "Todas as categorias" : selectedCategory} ▾
            </button>
          </div>
        </div>

        {/* Dropdown de categorias */}
        {showCategoryMenu && (
          <div className="gp-catalog-dropdown" role="menu" aria-label="Categorias">
            <button
              type="button"
              className="gp-catalog-dropdown-item"
              onClick={() => {
                setSelectedCategory("Todos");
                setShowCategoryMenu(false);
              }}
            >
              Todos
            </button>
            {categories
              .filter((c) => c !== "Todos" && c !== "Outros")
              .map((c) => (
                <button
                  key={c}
                  type="button"
                  className="gp-catalog-dropdown-item"
                  onClick={() => {
                    setSelectedCategory(c);
                    setShowCategoryMenu(false);
                  }}
                >
                  {c}
                </button>
              ))}
            <button
              type="button"
              className="gp-catalog-dropdown-item"
              onClick={() => {
                setSelectedCategory("Outros");
                setShowCategoryMenu(false);
              }}
            >
              Outros
            </button>
          </div>
        )}

        {/* Painel de filtros avançados */}
        {showFilters && (
          <section className="gp-catalog-filters-panel" aria-label="Filtros avançados">
            <div className="gp-catalog-filters-panel-row">
              <div className="gp-catalog-filter">
                <label className="gp-catalog-label">Faixa de preço</label>
                <div className="gp-catalog-range">
                  <div className="gp-catalog-range-input-group">
                    <label className="gp-catalog-range-mini">min</label>
                    <input
                      className="gp-catalog-range-input gp-catalog-no-spinner"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value || 0))}
                      aria-label="Preço mínimo"
                    />
                  </div>

                  <span className="gp-catalog-range-sep">—</span>

                  <div className="gp-catalog-range-input-group">
                    <label className="gp-catalog-range-mini">máx</label>
                    <input
                      className="gp-catalog-range-input gp-catalog-no-spinner"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value || 0))}
                      aria-label="Preço máximo"
                    />
                  </div>
                </div>
              </div>

              <div className="gp-catalog-filter">
                <label className="gp-catalog-checkbox">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                  />
                  Disponibilidade
                </label>
              </div>
            </div>

            <div className="gp-catalog-filters-panel-row">
              <div className="gp-catalog-filter">
                <label className="gp-catalog-label">Autor</label>
                <input
                  className="gp-catalog-text-input"
                  type="text"
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  placeholder="Ex: Mariana"
                />
              </div>

              <div className="gp-catalog-filter">
                <label className="gp-catalog-label">Tema</label>
                <input
                  className="gp-catalog-text-input"
                  type="text"
                  value={themeFilter}
                  onChange={(e) => setThemeFilter(e.target.value)}
                  placeholder="Ex: Teologia"
                />
              </div>
            </div>

            <div className="gp-catalog-filters-panel-actions">
              <button
                type="button"
                className="gp-catalog-btn gp-catalog-btn--soft"
                onClick={() => {
                  setMinPrice(priceRange.min);
                  setMaxPrice(priceRange.max);
                  setOnlyInStock(false);
                  setAuthorFilter("");
                  setThemeFilter("");
                }}
              >
                Limpar filtros
              </button>
            </div>
          </section>
        )}

        {/* Busca funcional (pode ser considerada parte dos filtros) */}
        <div className="gp-catalog-search-row" aria-label="Busca no catálogo">
          <input
            onFocus={() => {
              setShowCategoryMenu(false);
            }}
            className="gp-catalog-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, autor ou tema..."
            aria-label="Buscar livros"
          />
        </div>

        <section className="gp-catalog-grid" aria-label="Lista de livros">
          {filtered.length === 0 ? (
            <div className="gp-catalog-empty">
              Nenhum livro encontrado para “{query}”.
            </div>
          ) : (
            filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((b) => (
              <BookCard key={b.id} book={b} onAdd={handleAdd} />
            ))
          )}
        </section>

        {(() => {
          const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
          const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

          const goToPage = (p: number) => {
            const next = Math.min(Math.max(1, p), totalPages);
            setCurrentPage(next);
          };

          const PageButton = ({
            page,
            children,
          }: {
            page: number;
            children: React.ReactNode;
          }) => {
            const isActive = page === safeCurrentPage;
            return (
              <button
                type="button"
                className={isActive ? "gp-page-active gp-page-btn" : "gp-page-btn"}
                aria-current={isActive ? "page" : undefined}
                onClick={() => goToPage(page)}
              >
                {children}
              </button>
            );
          };

          const pages: Array<number | "ellipsis"> = [];
          const maxVisible = 5;

          if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
          } else {
            const first = 1;
            const last = totalPages;
            const windowStart = Math.max(2, safeCurrentPage - 1);
            const windowEnd = Math.min(last - 1, safeCurrentPage + 1);

            pages.push(first);
            if (windowStart > 2) pages.push("ellipsis");
            for (let i = windowStart; i <= windowEnd; i++) pages.push(i);
            if (windowEnd < last - 1) pages.push("ellipsis");
            pages.push(last);
          }

          const canPrev = safeCurrentPage > 1;
          const canNext = safeCurrentPage < totalPages;

          return (
            <footer className="gp-catalog-pagination" aria-label="Paginação">
              <button
                type="button"
                className={canPrev ? "gp-page-arrow gp-page-btn" : "gp-page-arrow gp-page-btn gp-page-disabled"}
                aria-disabled={!canPrev}
                onClick={() => {
                  if (!canPrev) return;
                  goToPage(safeCurrentPage - 1);
                }}
              >
                ‹
              </button>

              {pages.map((p, idx) =>
                p === "ellipsis" ? (
                  <span key={`e-${idx}`} className="gp-page-ellipsis">
                    ...
                  </span>
                ) : (
                  <PageButton key={p} page={p}>
                    {p}
                  </PageButton>
                )
              )}

              <button
                type="button"
                className={canNext ? "gp-page-arrow gp-page-btn" : "gp-page-arrow gp-page-btn gp-page-disabled"}
                aria-disabled={!canNext}
                onClick={() => {
                  if (!canNext) return;
                  goToPage(safeCurrentPage + 1);
                }}
              >
                ›
              </button>
            </footer>
          );
        })()}
      </main>
    </div>
  );
}

