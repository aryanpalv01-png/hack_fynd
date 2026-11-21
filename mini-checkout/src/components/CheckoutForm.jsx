import React from 'react';
import { User, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

/**
 * CheckoutForm
 * ------------
 * Customer details form with Full Name input, real-time validation banner,
 * and high-converting CTA.
 */
export function CheckoutForm({
  customerName,
  onNameChange,
  validationError,
  onSubmit,
  isSubmitting,
  orderTotal,
}) {
  return (
    <form
      className="checkout-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      noValidate
      aria-label="Checkout form"
    >
      <div className="form-field">
        <label htmlFor="customer-name-input" className="form-label">
          <span>Full Name</span>
          <span className="required-indicator" aria-hidden="true">*</span>
        </label>
        <div className="input-relative-wrap">
          <User size={16} className="input-lead-icon" aria-hidden="true" />
          <input
            id="customer-name-input"
            type="text"
            className={`form-input ${validationError ? 'form-input--error' : ''}`}
            data-testid="customer-name-input"
            value={customerName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Aryan Pal"
            autoComplete="name"
            aria-required="true"
            aria-describedby={validationError ? 'checkout-error' : undefined}
            aria-invalid={!!validationError}
          />
        </div>
      </div>

      {/* Accessible inline validation error banner */}
      {validationError && (
        <div
          id="checkout-error"
          className="validation-error"
          role="alert"
          data-testid="validation-error"
          aria-live="assertive"
        >
          <AlertCircle size={16} className="error-icon" aria-hidden="true" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Place Order CTA */}
      <button
        type="submit"
        className="btn btn-place-order"
        data-testid="place-order-btn"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className="btn-processing-label">Confirming Order...</span>
        ) : (
          <>
            <Lock size={15} className="btn-lock-icon" />
            <span>Place Order · {formatCurrency(orderTotal)}</span>
            <ArrowRight size={16} className="btn-arrow-icon" />
          </>
        )}
      </button>

      <div className="checkout-trust-notice">
        <span>Instant Order Confirmation · No Hidden Fees</span>
      </div>
    </form>
  );
}
