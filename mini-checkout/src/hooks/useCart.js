import { useState, useRef } from 'react';
import { generateOrderRef, formatTimestamp } from '@/utils/currency';

/**
 * useCart
 * -------
 * Encapsulates all cart state and checkout business logic.
 * The UI layer only calls the returned functions — zero business logic leaks out.
 *
 * Returns:
 *   cart              – current cart items  [{ ...product, quantity }]
 *   customerName      – controlled name input value
 *   validationError   – string | null
 *   orderConfirmation – object | null (the placed order receipt)
 *   isSubmitting      – boolean (button disabled state)
 *   addToCart(product)
 *   incrementQty(id)
 *   decrementQty(id)
 *   removeItem(id)
 *   setCustomerName(val)
 *   placeOrder()
 *   resetOrder()
 */
export function useCart() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronous lock — prevents duplicate submissions even on rapid fire clicks
  const submittingRef = useRef(false);

  // ── Cart Mutations ─────────────────────────────────────────────────────────

  const addToCart = (product) => {
    if (orderConfirmation) return; // cart is frozen after a confirmed order

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Clear the "empty cart" error as soon as the user adds something
    if (validationError === ERRORS.EMPTY_CART) {
      setValidationError(null);
    }
  };

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decrementQty = (id) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.id !== id) return i;
          const next = i.quantity - 1;
          return next > 0 ? { ...i, quantity: next } : null; // null = remove
        })
        .filter(Boolean);
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // ── Checkout ───────────────────────────────────────────────────────────────

  const placeOrder = () => {
    // Idempotency: bail out if already locked or confirmed
    if (submittingRef.current || isSubmitting || orderConfirmation) return;

    // Guard 1 — empty cart
    if (cart.length === 0) {
      setValidationError(ERRORS.EMPTY_CART);
      return;
    }

    // Guard 2 — blank / whitespace-only name
    if (customerName.trim() === '') {
      setValidationError(ERRORS.MISSING_NAME);
      return;
    }

    // Lock submission immediately (synchronous ref first, then state)
    submittingRef.current = true;
    setIsSubmitting(true);
    setValidationError(null);

    // Build the receipt snapshot at this exact instant
    const snapshot = {
      referenceId: generateOrderRef(),
      customerName: customerName.trim(),
      placedAt: formatTimestamp(new Date()),
      items: cart.map((i) => ({
        id: i.id,
        sku: i.sku,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        lineTotal: i.price * i.quantity,
      })),
      orderTotal: cart.reduce((s, i) => s + i.price * i.quantity, 0),
    };

    setOrderConfirmation(snapshot);
    setIsSubmitting(false);
    // Note: submittingRef stays true — the order is done.
  };

  // ── Reset ──────────────────────────────────────────────────────────────────

  const resetOrder = () => {
    setCart([]);
    setCustomerName('');
    setValidationError(null);
    setOrderConfirmation(null);
    setIsSubmitting(false);
    submittingRef.current = false;
  };

  return {
    cart,
    customerName,
    validationError,
    orderConfirmation,
    isSubmitting,
    addToCart,
    incrementQty,
    decrementQty,
    removeItem,
    setCustomerName: (val) => {
      setCustomerName(val);
      // Auto-clear "missing name" error once the user starts typing
      if (validationError === ERRORS.MISSING_NAME && val.trim() !== '') {
        setValidationError(null);
      }
    },
    placeOrder,
    resetOrder,
  };
}

/** Canonical error strings — also used in tests for exact-match assertions */
export const ERRORS = {
  EMPTY_CART: 'Your cart is empty. Please add at least one item.',
  MISSING_NAME: 'Full Name is required.',
};
