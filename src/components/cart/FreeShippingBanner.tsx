'use client';

import '../styles/cart.css';

type FreeShippingBannerProps = {
  currentAmount: number;
  targetAmount: number;
};

export function FreeShippingBanner({
  currentAmount,
  targetAmount,
}: FreeShippingBannerProps) {
  const remaining = Math.max(0, targetAmount - currentAmount);
  const percentage = Math.min(100, (currentAmount / targetAmount) * 100);

  return (
    <div className="free-shipping-banner">
      <p>
        {remaining > 0
          ? `Falta R$ ${remaining.toFixed(2)} para você ganhar frete grátis.`
          : 'Parabéns! Você ganhou frete grátis!'}
      </p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
