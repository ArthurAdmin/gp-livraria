'use client';

import '../styles/cart.css';


type CartItemProps = {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
};

export function CartItem({
  id,
  title,
  author,
  price,
  quantity,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  return (
    <article className="cart-item">
      <div className="book-cover" />

      <div className="cart-item-info">
        <h3>{title}</h3>

        <div className="author">{author}</div>

        <div className="delivery">Entrega em até 5 dias úteis</div>

        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => {
              if (quantity > 1) {
                onQuantityChange(id, quantity - 1);
              }
            }}
          >
            −
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => onQuantityChange(id, quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="remove-item" onClick={() => onRemove(id)}>
          Remover
        </div>
      </div>

      <div className="item-price">R$ {price.toFixed(2)}</div>
    </article>
  );
}
