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
  return `${CURRENCY_SYMBOL}${Number(amount).toLocaleString(LOCALE)}`;
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
 * Returns the price * quantity for a single cart item.
 *
 * @param {{ price: number, quantity: number }} item
 * @returns {number}
 */
export const calcLineTotal = (item) => item.price * item.quantity;

/**
 * calcOrderTotal
 * --------------
 * Sums all line totals across the cart.
 *
 * @param {Array<{ price: number, quantity: number }>} cart
 * @returns {number}
 */
export const calcOrderTotal = (cart) =>
  cart.reduce((acc, item) => acc + calcLineTotal(item), 0);

/**
 * formatTimestamp
 * ----------------
 * Returns a readable IST timestamp from a Date object.
 *
 * @param {Date} [date=new Date()]
 * @returns {string}  e.g. "21 Nov 2026, 12:34:56 IST"
 */
export const formatTimestamp = (date = new Date()) => {
  const datePart = date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timePart = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return `${datePart}, ${timePart} IST`;
};
