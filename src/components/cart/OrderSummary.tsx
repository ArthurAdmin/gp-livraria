'use client';

import { useState } from 'react';
import '../styles/cart.css';

type OrderSummaryProps = {
  itemsCount: number;
  subtotal: number;
  shipping: number;
  onApplyCoupon?: (code: string) => void;
  onCheckout?: () => void;
};

export function OrderSummary({
  itemsCount,
  subtotal,
  shipping,
  onApplyCoupon,
  onCheckout,
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const total = subtotal + shipping;

  async function handleApplyCoupon() {
    setIsApplyingCoupon(true);
    // Simular processo de aplicar cupom
    await new Promise((resolve) => setTimeout(resolve, 500));
    onApplyCoupon?.(couponCode);
    setCouponCode('');
    setIsApplyingCoupon(false);
  }

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

      <div className="coupon-input-group">
        <input
          type="text"
          className="coupon-input"
          placeholder="Digite seu cupom"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className="coupon-button"
          onClick={handleApplyCoupon}
          disabled={isApplyingCoupon || !couponCode.trim()}
        >
          {isApplyingCoupon ? '...' : 'Aplicar'}
        </button>
      </div>

      <button className="checkout-button" onClick={onCheckout}>
        Finalizar compra
      </button>

      <div className="safe-payment">Pagamento 100% seguro</div>
    </aside>
  );
}
