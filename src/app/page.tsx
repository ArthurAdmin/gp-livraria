export default function Home() {
  return (
    <div>


      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-circle">GP</div>
          <h1>LIVRARIA<br />GP</h1>
        </div>

        <div className="search">
          <input type="text" placeholder="Buscar por título, autor, tema ou ISBN..." />
        </div>

        <div className="menu">
          <a href="/login">Login</a>
          <a href="#catalogo">Catálogo</a>
          <a href="/cart">Carrinho</a>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">Curadoria exclusiva</div>
          <h2>Livros que transformam silêncio em presença.</h2>
          <p>
            Uma seleção editorial sofisticada para quem busca profundidade,
            contemplação e estética premium contemporânea.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Explorar catálogo</button>
            <button className="btn-secondary">Ver coleção</button>
          </div>
        </div>

        <div className="book-showcase">
          <div className="book">Silêncio<br />Que Cura</div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Explore por categoria</h3>
          <a href="#" className="view-all">Ver todas</a>
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
      <section className="section" id="catalogo">

        <div className="section-header">
          <h3 className="section-title">Catálogo</h3>
          <a href="#" className="view-all">Ver todos</a>
        </div>


        <div className="products-grid">
          <div className="card">
            <div className="card-cover">Silêncio que Cura</div>
            <div className="card-content">
              <h4>Silêncio que Cura</h4>
              <div className="author">Curadoria GP</div>
              <div className="card-footer">
                <div className="price">R$ 69</div>
                <button className="cart-btn">+</button>
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
                <button className="cart-btn">+</button>
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
                <button className="cart-btn">+</button>
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
                <button className="cart-btn">+</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curadoria & Info Section */}
      <section className="split-grid">
        <div className="wide-banner">
          <h3>Curadoria GP</h3>
          <p>
            Livros selecionados para acompanhar jornadas de fé,
            propósito e contemplação.
          </p>
        </div>

        <div className="mini-panel">
          <div className="mini-card">
            <h5>Experiência Editorial</h5>
            <p>
              Layout refinado, profundidade cinematográfica
              e atmosfera boutique contemporânea.
            </p>
          </div>

          <div className="mini-card">
            <h5>Microinterações Premium</h5>
            <p>
              Hover elegante, iluminação orgânica e motion suave.
            </p>
          </div>
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
          <a href="#">Sobre</a><br />
          <a href="#">Curadoria</a><br />
          <a href="#">Contato</a>
        </div>

        <div>
          <h4>Ajuda</h4>
          <a href="#">Trocas</a><br />
          <a href="#">Entrega</a><br />
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
