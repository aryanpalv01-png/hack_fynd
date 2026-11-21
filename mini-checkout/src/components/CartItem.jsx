import React from 'react';
import { formatCurrency, calcLineTotal } from '@/utils/currency';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

/**
 * CartItem
 * --------
 * Refined cart item row showing product metadata, stepper control,
 * dynamic line total, and instant remove action.
 */
export function CartItem({ item, onIncrement, onDecrement, onRemove, disabled }) {
  const lineTotal = calcLineTotal(item);

  return (
    <div className="cart-item" data-testid={`cart-item-${item.id}`}>
      {/* Product metadata */}
      <div className="cart-item-details">
        <div className="cart-item-tag-row">
          <span className="cart-item-sku">{item.sku}</span>
          <span className="cart-item-unit-price tabular">
            {formatCurrency(item.price)} each
          </span>
        </div>
        <span className="cart-item-name">{item.name}</span>
      </div>

      {/* Stepper controls */}
      <div className="cart-item-controls">
        <div className="qty-stepper" role="group" aria-label={`Quantity for ${item.name}`}>
          <button
            type="button"
            className="stepper-btn"
            data-testid={`dec-${item.id}`}
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => onDecrement(item.id)}
            disabled={disabled}
          >
            <Minus size={13} strokeWidth={2.5} />
          </button>
          <output
            className="stepper-qty tabular"
            data-testid={`qty-${item.id}`}
            aria-live="polite"
            aria-label={`Quantity: ${item.quantity}`}
          >
            {item.quantity}
          </output>
          <button
            type="button"
            className="stepper-btn"
            data-testid={`inc-${item.id}`}
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => onIncrement(item.id)}
            disabled={disabled}
          >
            <Plus size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Line total & remove action */}
      <div className="cart-item-right">
        <span
          className="cart-line-total tabular"
          data-testid={`line-total-${item.id}`}
          aria-label={`Line total for ${item.name}: ${formatCurrency(lineTotal)}`}
        >
          {formatCurrency(lineTotal)}
        </span>
        <button
          type="button"
          className="remove-btn"
          data-testid={`remove-${item.id}`}
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => onRemove(item.id)}
          disabled={disabled}
        >
          <Trash2 size={13} className="trash-icon" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}

/**
 * EmptyCartPlaceholder
 * --------------------
 * Professional empty state with friendly instructions.
 */
export function EmptyCartPlaceholder() {
  return (
    <div className="cart-empty" aria-label="Cart is empty">
      <div className="cart-empty-icon-wrap" aria-hidden="true">
        <ShoppingBag size={32} strokeWidth={1.5} className="empty-cart-svg" />
      </div>
      <p className="cart-empty-title">Your shopping cart is empty</p>
      <p className="cart-empty-hint">Choose any instrument from the catalog on the left to start checkout.</p>
    </div>
  );
}
