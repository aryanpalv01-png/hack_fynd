# FlipStore Checkout — Single-Page E-Commerce & Playwright Test Suite

> **FlipStore** — A production-grade Indian e-commerce single-page checkout application designed to match the familiar UX of **Flipkart and Myntra**, complete with dynamic cart math, strict input validation, double-click idempotency protection, and an automated Playwright test suite.

---

## 1. Overview & Problem Statement

This checkout application replicates the exact checkout flow and visual hierarchy of top-tier Indian e-commerce platforms (Flipkart / Myntra):
- **Flipkart Blue Header**: Brand logo, Explore Plus ✦ badge, search bar preview, and live cart count.
- **Checkout Stepper**: Step-by-step progress tracking (`1. LOGIN` → `2. DELIVERY ADDRESS` → `3. ORDER SUMMARY` → `4. PAYMENT`).
- **Delivery Address Block**: Required `Full Name` input field with whitespace sanitization and address preview.
- **Order Summary Ledger**: Live cart items with product thumbnails, Assured badges, unit prices, discounts, precision steppers (`-`, `+`), line totals, and `REMOVE` action.
- **Deals & Product Catalog**: Recommended Electronics Deals showcasing synthetic products with genuine specs, ratings, MRP strikethroughs, and "+ Add to Cart" buttons.
- **Iconic Price Details Card**: Sticky sidebar calculating item totals, discounts, free shipping, total amount due, and the green savings callout (`You will save ₹... on this order`).
- **Signature Place Order Button**: High-conversion orange `#fb641b` CTA button with idempotency locking.
- **Order Confirmation View**: Flipkart-style confirmation screen featuring a green checkmark, unique order reference (`ORD-XXXXXX`), live order tracking timeline, itemized receipt, and "Continue Shopping" button.

---

## 2. Product Catalog

| SKU | Product | Brand | Price | Original MRP | Discount | Rating |
|---|---|---|---|---|---|---|
| `prod-mouse` | Wireless Mouse | Logitech M235 | ₹799 | ₹1,299 | 38% off | ★ 4.4 (18.4k) |
| `prod-keyboard` | Mechanical Keyboard | Redragon K552 | ₹1,499 | ₹2,499 | 40% off | ★ 4.6 (9.8k) |
| `prod-headphones` | Studio Headphones | boAt Rockerz 550 | ₹2,499 | ₹3,999 | 37% off | ★ 4.5 (24.1k) |
| `prod-deskmat` | Desk Mat | AmazonBasics Pro | ₹499 | ₹999 | 50% off | ★ 4.3 (7.3k) |

---

## 3. Tech Stack

- **Frontend**: React 18 + Vite (clean CSS, zero external UI libraries or APIs)
- **State & Idempotency**: Custom `useCart` hook with dual-lock submission guard (`useRef` synchronous mutex + `isSubmitting` state)
- **Formatting**: Indian Rupee currency format (`₹`) with comma grouping (`en-IN`)
- **Testing**: Playwright (`@playwright/test`) with web-first assertions and clean state per test

---

## 4. Quick Start

### Installation
```bash
cd mini-checkout
npm install
npx playwright install chromium
```

### Run Locally
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.

### Run Production Build
```bash
npm run build
```

---

## 5. Automated Playwright Test Suite (9 / 9 Passing)

Execute the end-to-end browser test suite:

```bash
# Run headless
npx playwright test

# Run headed (with browser window)
npx playwright test --headed
```

### Verified Test Results

| Test ID | Scenario | Result | Duration |
|---|---|---|---|
| **TC-01** | Successful checkout produces order reference & confirmation | ✅ PASS | 2.3s |
| **TC-02** | Blank or whitespace-only name blocks checkout & preserves cart | ✅ PASS | 2.3s |
| **TC-03** | Incrementing quantity updates line total and order total accurately | ✅ PASS | 0.9s |
| **TC-04** | Empty cart blocks checkout & preserves customer name | ✅ PASS | 0.8s |
| **TC-05** | Decrementing quantity to zero removes item from cart | ✅ PASS | 0.8s |
| **TC-06** | Rapid double-click on Place Order creates exactly one confirmation | ✅ PASS | 2.4s |
| **TC-07** | Remove button deletes item regardless of quantity | ✅ PASS | 0.7s |
| **TC-08** | Adding same product twice increments quantity (no duplicate rows) | ✅ PASS | 0.5s |
| **TC-09** | Start New Order resets all state cleanly | ✅ PASS | 0.9s |
