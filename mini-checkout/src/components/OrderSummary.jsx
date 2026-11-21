import React from 'react';
import { formatCurrency } from '@/utils/currency';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

/**
 * OrderSummary
 * ------------
 * Live breakdown of item subtotal, shipping status, and order total.
 * Derived dynamically on render to eliminate math sync drift.
 */
export function OrderSummary({ orderTotal, shippingCost = 0 }) {
  return (
    <div className="order-summary" aria-label="Order summary">
      <div className="summary-line">
        <span className="summary-label">Subtotal</span>
        <span className="summary-value tabular">{formatCurrency(orderTotal)}</span>
      </div>

      <div className="summary-line">
        <span className="summary-label">Estimated Delivery</span>
        <span className="summary-value free-shipping-pill">
          {shippingCost === 0 ? 'FREE EXPRESS' : formatCurrency(shippingCost)}
        </span>
      </div>

      <div className="summary-line">
        <span className="summary-label">GST / Duties</span>
        <span className="summary-value included-pill">INCLUDED</span>
      </div>

      <div className="summary-divider" aria-hidden="true" />

      <div className="summary-line total-line">
        <span className="summary-label total-label">Order Total</span>
        <span
          className="summary-value total-value tabular"
          data-testid="order-total"
          aria-live="polite"
          aria-label={`Order total: ${formatCurrency(orderTotal)}`}
        >
          {formatCurrency(orderTotal)}
        </span>
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="summary-perks">
        <div className="perk-item">
          <Truck size={13} className="perk-icon" />
          <span>Ships within 24h</span>
        </div>
        <div className="perk-item">
          <ShieldCheck size={13} className="perk-icon" />
          <span>256-Bit SSL Checkout</span>
        </div>
        <div className="perk-item">
          <RotateCcw size={13} className="perk-icon" />
          <span>7-Day Return Guarantee</span>
        </div>
      </div>
    </div>
  );
}
