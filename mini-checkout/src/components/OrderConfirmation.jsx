import React, { useState } from 'react';
import { formatCurrency } from '@/utils/currency';
import { CheckCircle2, Copy, Check, Package, RotateCcw } from 'lucide-react';

/**
 * OrderConfirmation
 * -----------------
 * Receipt & confirmation view after an order is successfully placed.
 * Displays reference ID, customer name, itemized breakdown, and final total.
 */
export function OrderConfirmation({ order, onNewOrder }) {
  const [copied, setCopied] = useState(false);

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(order.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      className="order-confirmation"
      data-testid="order-confirmation"
      aria-label="Order confirmation"
      aria-live="polite"
    >
      {/* Success banner */}
      <div className="confirmation-header">
        <div className="confirmation-check-badge">
          <CheckCircle2 size={36} className="check-svg-icon" />
        </div>
        <h2 className="confirmation-title">Order Confirmed!</h2>
        <p className="confirmation-subtitle">
          Your order has been recorded and is being prepared for dispatch.
        </p>
      </div>

      {/* Meta grid */}
      <div className="confirmation-meta-grid">
        <div className="meta-block">
          <span className="meta-label">Order Reference</span>
          <div className="meta-value-row">
            <span
              className="meta-value reference-id tabular"
              data-testid="order-reference"
            >
              {order.referenceId}
            </span>
            <button
              type="button"
              className="btn-copy-ref"
              onClick={handleCopyRef}
              title="Copy Reference"
              aria-label="Copy order reference"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        <div className="meta-block">
          <span className="meta-label">Customer</span>
          <span className="meta-value customer-name-val">{order.customerName}</span>
        </div>

        <div className="meta-block">
          <span className="meta-label">Order Date</span>
          <span className="meta-value tabular placed-at">{order.placedAt}</span>
        </div>
      </div>

      {/* Itemized breakdown table */}
      <div className="confirmation-items">
        <div className="items-header-bar">
          <Package size={15} className="package-icon" />
          <h3 className="items-heading">Purchased Items</h3>
        </div>

        <div className="items-table">
          <div className="items-table-header" aria-hidden="true">
            <span>Item</span>
            <span className="col-qty">Qty</span>
            <span className="col-total">Line Total</span>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="items-table-row">
              <div className="row-item-info">
                <span className="row-name">{item.name}</span>
                <span className="row-sku">{item.sku}</span>
              </div>
              <span className="col-qty row-qty tabular">{item.quantity}</span>
              <span className="col-total row-total tabular">
                {formatCurrency(item.lineTotal)}
              </span>
            </div>
          ))}
        </div>

        {/* Final Total Row */}
        <div className="confirmation-total-row">
          <span className="conf-total-label">Total Amount Paid</span>
          <span className="conf-total-value tabular">
            {formatCurrency(order.orderTotal)}
          </span>
        </div>
      </div>

      {/* Start New Order Button */}
      <div className="confirmation-actions">
        <button
          type="button"
          className="btn btn-new-order"
          data-testid="new-order-btn"
          onClick={onNewOrder}
          aria-label="Start a new order"
        >
          <RotateCcw size={15} />
          <span>Start New Order</span>
        </button>
      </div>
    </section>
  );
}
