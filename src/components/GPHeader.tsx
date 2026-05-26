import Container from "@/components/ui/Container";
import GPButton from "@/components/ui/GPButton";

export default function GPHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-matte-champagne/15 bg-(--gp-satin-black) backdrop-blur shadow-dark-glow">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-matte-champagne/40 bg-(--gp-brown-latte) shadow-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,215,181,0.25),transparent_55%),radial-gradient(circle_at_bottom,rgba(230,215,181,0.12),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-black tracking-wide text-matte-champagne">
                GP
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-matte-champagne/60">
                LIVRARIA
              </p>
              <h1 className="text-sm font-extrabold tracking-wide text-matte-champagne">
                GP
              </h1>
            </div>
          </div>

          <nav className="flex items-center gap-5">
            <a
              className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
              href="/login"
            >
              Login
            </a>
            <a
              className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
              href="#catalogo"
            >
              Catálogo
            </a>
            <a
              className="text-xs font-semibold tracking-wide text-matte-champagne/70 hover:text-matte-champagne transition"
              href="/cart"
            >
              Carrinho
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="hidden rounded-full px-4 py-2 text-xs font-semibold tracking-wide ring-1 ring-matte-champagne/40 hover:ring-matte-champagne/60 text-matte-champagne/70 hover:text-matte-champagne transition md:inline-flex"
            >
              Administrador
            </a>

            <a href="/login" className="hidden md:inline-flex">
              <GPButton variant="ghost">
                <span className="inline-flex items-center gap-2">
                  <span className="text-sm">Entrar</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-(--gp-border) bg-[rgba(255,255,255,0.03)]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-matte-champagne/80"
                    >
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 21C20 17.134 16.4183 14 12 14C7.58172 14 4 17.134 4 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </GPButton>
            </a>

            <a href="/cart" className="hidden md:inline-flex">
              <GPButton variant="secondary">Ver carrinho</GPButton>
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}

