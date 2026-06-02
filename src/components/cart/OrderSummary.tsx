'use client';


import '../styles/cart.css';

type OrderSummaryProps = {
  itemsCount: number;
  subtotal: number;
  shipping: number;
  items?: Array<{ title: string; quantity: number; unitPrice: number; }>;
  onCheckout?: () => void;
};


export function OrderSummary({
  itemsCount,
  subtotal,
  shipping,
  onCheckout,
}: OrderSummaryProps) {
  const total = subtotal + shipping;



  return (
    <aside className="order-summary">
      <h2>Resumo do pedido</h2>


      <div className="summary-line">
        <span>{itemsCount} itens</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-line">
        <span>Frete</span>
        <span>R$ {shipping.toFixed(2)}</span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>



      <button className="checkout-button" onClick={onCheckout}>
        Finalizar compra
      </button>

      <div className="safe-payment">Pagamento 100% seguro</div>
    </aside>
  );
}
