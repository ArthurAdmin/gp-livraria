"use client";

import { useCart } from "@/lib/cart";

import GPHeader from "@/components/GPHeader";



function CatalogSection() {
  const cart = useCart();
  const handleAddToCart = (bookId: string) => {
    cart.add(bookId, 1);

    if (typeof window === "undefined") return;

    // feedback visual discreto
    const activeEl = document.activeElement;
    const targetBtn =
      activeEl && activeEl instanceof HTMLButtonElement ? activeEl : null;

    if (targetBtn) {
      targetBtn.classList.remove("is-animating");
      // força reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      targetBtn.offsetHeight;
      targetBtn.classList.add("is-animating");

      window.setTimeout(() => {
        targetBtn.classList.remove("is-animating");
      }, 220);
    }

    // toast minimalista premium
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
    <section className="section" id="catalogo">
        <div className="section-header">
          <h3 className="section-title">Catálogo</h3>
          <a href="/catalogo" className="view-all">Ver todos</a>
        </div>


      <div className="products-grid">
        <div className="card">
          <div className="card-cover">Silêncio que Cura</div>
          <div className="card-content">
            <h4>Silêncio que Cura</h4>
            <div className="author">Curadoria GP</div>
            <div className="card-footer">
              <div className="price">R$ 69</div>
              <button
                className="cart-btn js-add-to-cart"
                aria-label="Adicionar ao carrinho"
                onClick={() => handleAddToCart("gp-001")}
              >
                <span className="cart-btn__plus">+</span>
                <span className="cart-btn__ring" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-cover">Graça em Movimento</div>
          <div className="card-content">
            <h4>Graça em Movimento</h4>
            <div className="author">Rafael Freitas</div>
            <div className="card-footer">
              <div className="price">R$ 79</div>
              <button
                className="cart-btn js-add-to-cart"
                aria-label="Adicionar ao carrinho"
                onClick={() => handleAddToCart("gp-002")}
              >
                <span className="cart-btn__plus">+</span>
                <span className="cart-btn__ring" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-cover">Caminhos de Paz</div>
          <div className="card-content">
            <h4>Caminhos de Paz</h4>
            <div className="author">Luciano Subirá</div>
            <div className="card-footer">
              <div className="price">R$ 64</div>
              <button
                className="cart-btn js-add-to-cart"
                aria-label="Adicionar ao carrinho"
                onClick={() => handleAddToCart("gp-003")}
              >
                <span className="cart-btn__plus">+</span>
                <span className="cart-btn__ring" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-cover">Teologia do Encontro</div>
          <div className="card-content">
            <h4>Teologia do Encontro</h4>
            <div className="author">Elisa Fernandes</div>
            <div className="card-footer">
              <div className="price">R$ 93</div>
              <button
                className="cart-btn js-add-to-cart"
                aria-label="Adicionar ao carrinho"
                onClick={() => handleAddToCart("gp-004")}
              >
                <span className="cart-btn__plus">+</span>
                <span className="cart-btn__ring" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <GPHeader />


      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content hero-content--curadoria">
          <h2>Curadoria GP</h2>
          <div className="hero-divider" />
          <p>Livros selecionados para acompanhar jornadas de fé, propósito e contemplação.</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Explore por categoria</h3>
          <a href="#" className="view-all">
            Ver todas
          </a>
        </div>

        <div className="categories">
          <div className="category">Devocionais</div>
          <div className="category">Vida Cristã</div>
          <div className="category">Teologia</div>
          <div className="category">Estudos Bíblicos</div>
          <div className="category">Família</div>
          <div className="category">Liderança</div>
        </div>
      </section>

      {/* Catalog Section */}
      <CatalogSection />

      {/* Curadoria & Info Section */}
      <section className="split-grid">
        <div className="wide-banner wide-banner--full">
          <h3>Curadoria GP</h3>
          <div className="wide-banner__divider" />
          <p>
            Livros selecionados para acompanhar jornadas de fé,
            propósito e contemplação.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div>
          <h4>Livraria GP</h4>
          <p>
            Mais que uma livraria.
            Uma experiência editorial premium contemporânea.
          </p>
        </div>

        <div>
          <h4>Institucional</h4>
          <a href="#">Sobre</a>
          <br />
          <a href="#">Curadoria</a>
          <br />
          <a href="#">Contato</a>
        </div>

        <div>
          <h4>Ajuda</h4>
          <a href="#">Trocas</a>
          <br />
          <a href="#">Entrega</a>
          <br />
          <a href="#">Pagamentos</a>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p>Receba coleções e lançamentos exclusivos.</p>
        </div>
      </footer>
    </div>
  );
}

