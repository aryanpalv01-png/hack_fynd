/**
 * checkout.spec.js
 * ----------------
 * Playwright end-to-end test suite for the Mini Checkout application.
 *
 * Rules enforced:
 *   ✓  Every test navigates to '/' in beforeEach — fully clean state.
 *   ✓  Zero hardcoded sleeps (page.waitForTimeout is never used).
 *   ✓  Web-first assertions only (expect(locator).toBeVisible(), toHaveText(), etc.)
 *   ✓  Assertions target what the customer sees, not implementation internals.
 */

import { test, expect } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Convenience locators to avoid repeating data-testid strings */
const loc = (page) => ({
  addMouse:        page.getByTestId('add-prod-mouse'),
  addKeyboard:     page.getByTestId('add-prod-keyboard'),
  nameInput:       page.getByTestId('customer-name-input'),
  placeOrderBtn:   page.getByTestId('place-order-btn'),
  validationError: page.getByTestId('validation-error'),
  confirmation:    page.getByTestId('order-confirmation'),
  orderRef:        page.getByTestId('order-reference'),
  orderTotal:      page.getByTestId('order-total'),
  cartItemMouse:   page.getByTestId('cart-item-prod-mouse'),
  cartItemKbd:     page.getByTestId('cart-item-prod-keyboard'),
  incMouse:        page.getByTestId('inc-prod-mouse'),
  decMouse:        page.getByTestId('dec-prod-mouse'),
  qtyMouse:        page.getByTestId('qty-prod-mouse'),
  lineTotalMouse:  page.getByTestId('line-total-prod-mouse'),
  removeMouse:     page.getByTestId('remove-prod-mouse'),
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  
});

// ── Test Suite ────────────────────────────────────────────────────────────────

test.describe('Mini Checkout — Customer Journey', () => {

  // ── TC-01: Successful checkout ──────────────────────────────────────────────
  test('TC-01: Successful checkout produces a single confirmation and order reference', async ({ page }) => {
    const L = loc(page);

    // Add Wireless Mouse to cart
    await L.addMouse.click();

    // Fill customer name
    await L.nameInput.fill('Aryan Pal');

    // Click Place Order
    await L.placeOrderBtn.click();

    // --- Assertions ---

    // Confirmation panel is visible
    await expect(L.confirmation).toBeVisible();

    // Order reference matches ORD-XXXXXX pattern (no duplicates from double-click)
    await expect(L.orderRef).toBeVisible();
    await expect(L.orderRef).toHaveText(/^ORD-[A-Z0-9]{6}$/);

    // Confirmation shows the customer's name
    await expect(L.confirmation).toContainText('Aryan Pal');

    // Confirmation shows the correct price (₹799 for 1 mouse)
    await expect(L.confirmation).toContainText('₹799');
  });

  // ── TC-02: Missing required field ───────────────────────────────────────────
  test('TC-02: Blank name blocks checkout and preserves cart state', async ({ page }) => {
    const L = loc(page);

    // Add Mechanical Keyboard to cart
    await L.addKeyboard.click();

    // Leave name blank (also test whitespace)
    await L.nameInput.fill('   ');

    // Try to place order
    await L.placeOrderBtn.click();

    // --- Assertions ---

    // Error is shown with correct message
    await expect(L.validationError).toBeVisible();
    await expect(L.validationError).toContainText('Full Name is required');

    // No confirmation was produced
    await expect(L.confirmation).not.toBeVisible();

    // Cart item is preserved — the item was not lost
    await expect(L.cartItemKbd).toBeVisible();
  });

  // ── TC-03: Quantity updates totals accurately ───────────────────────────────
  test('TC-03: Incrementing quantity updates line total and order total correctly', async ({ page }) => {
    const L = loc(page);

    // Add Wireless Mouse (₹799)
    await L.addMouse.click();

    // Initial total should be ₹799
    await expect(L.orderTotal).toHaveText('₹799');

    // Increment to quantity 2
    await L.incMouse.click();

    // Quantity display
    await expect(L.qtyMouse).toHaveText('2');

    // Line total: 799 × 2 = ₹1,598
    await expect(L.lineTotalMouse).toHaveText('₹1,598');

    // Order total reflects the new line total
    await expect(L.orderTotal).toHaveText('₹1,598');
  });

  // ── Additional guards ───────────────────────────────────────────────────────

  test('TC-04: Empty cart blocks checkout and preserves customer name input', async ({ page }) => {
    const L = loc(page);

    // Type a name without adding anything to cart
    await L.nameInput.fill('Priya Sharma');

    // Try to place order with empty cart
    await L.placeOrderBtn.click();

    // Error shown
    await expect(L.validationError).toBeVisible();
    await expect(L.validationError).toContainText('Your cart is empty');

    // Name input is preserved — not cleared
    await expect(L.nameInput).toHaveValue('Priya Sharma');

    // No confirmation
    await expect(L.confirmation).not.toBeVisible();
  });

  test('TC-05: Decrement to zero removes item from cart entirely', async ({ page }) => {
    const L = loc(page);

    // Add mouse (qty = 1)
    await L.addMouse.click();
    await expect(L.cartItemMouse).toBeVisible();

    // Decrement from 1 → 0 → item auto-removed
    await L.decMouse.click();

    // Cart item should be gone
    await expect(L.cartItemMouse).not.toBeVisible();

    // Total resets to ₹0
    await expect(L.orderTotal).toHaveText('₹0');
  });

  test('TC-06: Rapid double-click on Place Order produces exactly one confirmation', async ({ page }) => {
    const L = loc(page);

    // Add mouse and name
    await L.addMouse.click();
    await L.nameInput.fill('Rapid Clicker');

    // First click — submits the order
    await L.placeOrderBtn.click();

    // Second click — the button may already be unmounted (order confirmed).
    // We attempt it but ignore the "element not found" error; that itself proves
    // the idempotency guard worked: the UI transitioned away before the second click.
    await L.placeOrderBtn.click({ timeout: 1500 }).catch(() => {});

    // Only one confirmation should ever appear
    await expect(L.confirmation).toBeVisible();

    // Only one order reference element should be in the DOM
    await expect(page.getByTestId('order-reference')).toHaveCount(1);

    // Reference still matches the pattern
    await expect(L.orderRef).toHaveText(/^ORD-[A-Z0-9]{6}$/);
  });

  test('TC-07: Remove button deletes item regardless of quantity', async ({ page }) => {
    const L = loc(page);

    // Add mouse and increment to qty 3
    await L.addMouse.click();
    await L.incMouse.click();
    await L.incMouse.click();
    await expect(L.qtyMouse).toHaveText('3');

    // Remove with the Remove button
    await L.removeMouse.click();

    // Item gone immediately
    await expect(L.cartItemMouse).not.toBeVisible();
    await expect(L.orderTotal).toHaveText('₹0');
  });

  test('TC-08: Adding same product twice increments quantity instead of duplicating row', async ({ page }) => {
    const L = loc(page);

    await L.addMouse.click();
    await L.addMouse.click();

    // Should be one row, quantity 2
    await expect(page.getByTestId('cart-item-prod-mouse')).toHaveCount(1);
    await expect(L.qtyMouse).toHaveText('2');
    await expect(L.orderTotal).toHaveText('₹1,598');
  });

  test('TC-09: Start New Order resets all state cleanly', async ({ page }) => {
    const L = loc(page);

    // Complete a successful order
    await L.addMouse.click();
    await L.nameInput.fill('Reset Test');
    await L.placeOrderBtn.click();
    await expect(L.confirmation).toBeVisible();

    // Click Start New Order
    await page.getByTestId('new-order-btn').click();

    // Everything should be reset
    await expect(L.confirmation).not.toBeVisible();
    await expect(L.nameInput).toHaveValue('');
    await expect(L.cartItemMouse).not.toBeVisible();
    await expect(L.orderTotal).toHaveText('₹0');
  });

});
