import { CURRENCY_SYMBOL, LOCALE } from '@/constants/products';

/**
 * formatCurrency
 * --------------
 * Converts a numeric amount to a human-readable INR string.
 *
 * @param {number} amount
 * @returns {string}  e.g. 799 → "₹799"  |  1598 → "₹1,598"
 */
export const formatCurrency = (amount) => {
  return `${CURRENCY_SYMBOL}${Number(amount || 0).toLocaleString(LOCALE)}`;
};

/**
 * generateOrderRef
 * -----------------
 * Produces a cryptographically-safe, uppercase alphanumeric order reference.
 * Format: ORD-XXXXXX  (6 chars from [0-9A-Z], I/O/L excluded for legibility)
 *
 * @returns {string}  e.g. "ORD-9KF4P2"
 */
export const generateOrderRef = () => {
  const CHARS = '0123456789ABCDEFGHJKMNPQRSTUVWXYZ'; // no I, O, L
  let ref = '';
  for (let i = 0; i < 6; i++) {
    ref += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return `ORD-${ref}`;
};

/**
 * calcLineTotal
 * -------------
 * Returns price * quantity for a single cart item.
 * Supports both calcLineTotal(item) and calcLineTotal(price, quantity).
 *
 * @param {{ price: number, quantity: number } | number} itemOrPrice
 * @param {number} [quantity]
 * @returns {number}
 */
export const calcLineTotal = (itemOrPrice, quantity) => {
  if (typeof itemOrPrice === 'object' && itemOrPrice !== null) {
    return (Number(itemOrPrice.price) || 0) * (Number(itemOrPrice.quantity) || 0);
  }
  return (Number(itemOrPrice) || 0) * (Number(quantity) || 1);
};

/**
 * calcOrderTotal
 * --------------
 * Sums all line totals across the cart.
 *
 * @param {Array<{ price: number, quantity: number }>} cart
 * @returns {number}
 */
export const calcOrderTotal = (cart) =>
  cart.reduce((sum, item) => sum + calcLineTotal(item), 0);

/**
 * formatTimestamp
 * ---------------
 * Formats a Date object into human-readable Indian local time.
 * e.g. "21 Nov 2026, 02:45 PM"
 *
 * @param {Date} date
 * @returns {string}
 */
export const formatTimestamp = (date) =>
  date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
