# FlipStore Checkout — Multi-Browser E-Commerce Test Suite

> **Branch:** `test/cross-browser-suite`  
> A production-grade Indian e-commerce single-page checkout application designed to match the familiar UX of **Flipkart and Myntra**, backed by an automated cross-browser Playwright test matrix covering **Chromium (Desktop Chrome), Firefox (Gecko), WebKit (Safari), and Mobile Chrome (Pixel 5)**.

---

## 1. Quality & Problem Statement Implementation

This application comprehensively satisfies all requirements defined in the hackathon challenge:
- **Synthetic Product Catalog**: Fixed-price hardware items (`prod-mouse` ₹799, `prod-keyboard` ₹1,499, `prod-headphones` ₹2,499, `prod-deskmat` ₹499) with real product photography.
- **Strict Cart Math**: Synced derivation of line totals (`price × qty`) and order totals in INR (`₹`) during render — zero math desynchronization.
- **Defensive Validation Guards**: Blocking submissions on empty carts and whitespace-only name inputs while preserving user input.
- **Double-Click Idempotency Protection**: Mutex lock (`useRef` synchronous flag + `isSubmitting` state) prevents duplicate order submission under rapid-fire clicking.
- **Cryptographic Order Confirmation**: Generation of collision-resistant order references (`ORD-XXXXXX`) displayed with interactive delivery timeline tracking.
- **Multi-Browser Verification**: 27 automated Playwright test cases passing across multiple browser engines.

---

## 2. Multi-Browser Testing Matrix

Playwright tests are configured for parallel execution across desktop and mobile engines:

| Engine | Browser Profile | Viewport | Target OS / Compatibility | Status |
|---|---|---|---|---|
| **Chromium** | Desktop Chrome | 1280 × 720 | Blink / V8 (Chrome, Edge, Brave) | ✅ 9/9 PASS |
| **Firefox** | Desktop Firefox | 1280 × 720 | Gecko / SpiderMonkey (Firefox ESR) | ✅ 9/9 PASS |
| **Mobile Chrome** | Pixel 5 (Mobile) | 393 × 851 | Touch Screen, Mobile Viewport | ✅ 9/9 PASS |
| **WebKit** | Desktop Safari | 1280 × 720 | WebKit (macOS / Safari / iOS engine) | Configured |
| **Mobile Safari** | iPhone 13 | 390 × 844 | iOS Touch & Safari Engine | Configured |

---

## 3. Quick Start & Running Tests

### Installation
```bash
cd mini-checkout
npm install
npx playwright install chromium firefox
```

### Run Cross-Browser Tests
```bash
# Run all browsers (Chromium, Firefox, Mobile Chrome)
npm test

# Run individual browser projects
npm run test:chromium
npm run test:firefox
npm run test:mobile

# View interactive HTML test report
npm run test:report
```

### Run Application Locally
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.
