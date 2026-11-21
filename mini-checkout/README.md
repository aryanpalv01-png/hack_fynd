# Mini Checkout — README

> **Kinetic Labs // Store** — A production-grade single-page checkout demo built with React + Vite, end-to-end tested with Playwright.

---

## What This Is

A self-contained checkout page for two synthetic hardware products. No backend, no database, no payment gateway. The goal: demonstrate correct cart math, robust validation, idempotent order placement, and a fully automated Playwright browser test suite.

---

## Quick Start

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| npm | ≥ 9 |

### 1. Install dependencies

```bash
cd mini-checkout
npm install
```

### 2. Install Playwright browser

```bash
npx playwright install chromium
```

> On minimal Linux environments, you may also need:  
> `npx playwright install-deps`

---

## Running the App

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Running the Tests

The Playwright config automatically starts the dev server if it isn't already running.

```bash
# Headless (CI-style, see results in terminal)
npx playwright test

# With visual browser
npx playwright test --headed

# Interactive Playwright UI
npx playwright test --ui

# View HTML report after a run
npx playwright show-report
```

### Expected output

```
Running 9 tests using 2 workers

  ✓  TC-01 Successful checkout produces a single confirmation and order reference
  ✓  TC-02 Blank name blocks checkout and preserves cart state
  ✓  TC-03 Incrementing quantity updates line total and order total correctly
  ✓  TC-04 Empty cart blocks checkout and preserves customer name input
  ✓  TC-05 Decrement to zero removes item from cart entirely
  ✓  TC-06 Rapid double-click on Place Order produces exactly one confirmation
  ✓  TC-07 Remove button deletes item regardless of quantity
  ✓  TC-08 Adding same product twice increments quantity instead of duplicating row
  ✓  TC-09 Start New Order resets all state cleanly

  9 passed (≈ 15s)
```

---

## npm Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server on port 5173 |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview the production build |
| `npx playwright test` | Run the full E2E test suite |
| `npx playwright test --ui` | Open Playwright interactive UI |
| `npx playwright show-report` | View the last HTML test report |

---

## Project Structure

```
mini-checkout/
├── index.html                        # HTML shell, Google Fonts
├── package.json                      # Project manifest & scripts
├── vite.config.js                    # Vite + path alias
├── playwright.config.js              # Playwright configuration
│
├── src/
│   ├── main.jsx                      # React entry point
│   ├── App.jsx                       # Root orchestrator component
│   ├── constants/products.js         # Product catalog & config
│   ├── utils/currency.js             # Pure helpers (format, math, ID gen)
│   ├── hooks/useCart.js              # All business logic (cart + checkout)
│   ├── components/
│   │   ├── ProductIllustrations.jsx  # Bespoke SVG line-art
│   │   ├── ProductCard.jsx           # Product display
│   │   ├── CartItem.jsx              # Cart row + stepper
│   │   ├── OrderSummary.jsx          # Live price summary
│   │   ├── CheckoutForm.jsx          # Name input + validation
│   │   └── OrderConfirmation.jsx     # Post-order receipt panel
│   └── styles/
│       ├── global.css                # Design tokens, reset, layout
│       └── components.css            # Per-component styles
│
├── tests/
│   └── checkout.spec.js              # 9 Playwright E2E tests
│
└── docs/
    ├── JOURNAL.md                    # Living architecture + decision log
    └── TEST_PLAN.md                  # Formal QA test plan + manual results
```

---

## `data-testid` Reference

| Element | Test ID |
|---|---|
| Add Wireless Mouse | `add-prod-mouse` |
| Add Mechanical Keyboard | `add-prod-keyboard` |
| Cart row (by product) | `cart-item-{product-id}` |
| Quantity increment | `inc-{product-id}` |
| Quantity decrement | `dec-{product-id}` |
| Remove button | `remove-{product-id}` |
| Quantity display | `qty-{product-id}` |
| Line total | `line-total-{product-id}` |
| Order total | `order-total` |
| Customer name input | `customer-name-input` |
| Place Order button | `place-order-btn` |
| Validation error | `validation-error` |
| Order confirmation | `order-confirmation` |
| Order reference ID | `order-reference` |

---

## Documentation

| File | Purpose |
|---|---|
| `docs/JOURNAL.md` | Living build record — architecture decisions, feature log, test results |
| `docs/TEST_PLAN.md` | Formal QA test plan — risk matrix, test cases, manual logs, defect template |
| `README.md` | ← this file |
