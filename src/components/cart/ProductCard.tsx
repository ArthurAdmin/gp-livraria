'use client';

import '../styles/cart.css';

type ProductCardProps = {
  id: string;
  title: string;
  author: string;
  price: number;
  onAddToCart?: (id: string) => void;
};

export function ProductCard({
  id,
  title,
  author,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card" onClick={() => onAddToCart?.(id)}>
      <div className="product-cover" />

      <div className="product-content">
        <h3>{title}</h3>

        <p>{author}</p>

        <div className="product-footer">
          <div className="product-price">R$ {price.toFixed(0)}</div>
          <button
            className="add-button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(id);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
