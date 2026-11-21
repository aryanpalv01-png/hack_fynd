# QA Test Plan & Multi-Browser Verification Report — FlipStore Checkout

> **Branch:** `main`  
> **Application:** FlipStore Mini Checkout  
> **Testing Framework:** Playwright Multi-Browser Engine  
> **Execution Matrix:** Desktop Chromium (Chrome / Brave / Edge), Desktop Firefox (Gecko), Mobile Chrome (Pixel 5)  
> **Total Executed Tests:** **30 Tests (10 Scenarios × 3 Active Engines)**  
> **Status:** **30 / 30 PASS (100% Green)**  
> **Live Production URL:** [https://mini-checkout-beryl.vercel.app](https://mini-checkout-beryl.vercel.app)

---

## 1. Checkout Risk Prioritization Matrix

In financial and e-commerce checkout systems, failure modes carry severe reputational, financial, and operational risks. We categorize and prioritize risks as follows:

| Priority | Risk Category | Failure Mode / Scenario | Business & User Impact | Code Mitigation & Defensive Pattern |
|---|---|---|---|---|
| **P0 (Critical)** | **Idempotency & Double Submission** | Customer rapid-clicks or multi-taps "Place Order" during network latency or animation delay | Duplicate order records created, customer charged multiple times, double fulfillment, dispute fees | Dual-layer mutex lock: synchronous `useRef(false)` flag (`submittingRef.current = true`) intercepts repeated events within the exact same event loop cycle before React re-render, paired with `isSubmitting` disabled state. |
| **P0 (Critical)** | **Price & Cart Math Desynchronization** | Quantity changes cause line totals (`price × qty`) or order total to drift, display `NaN`, or mismatch | Overcharging or undercharging customers, legal compliance violation, loss of customer trust | Pure synchronous derivation on render: `calcOrderTotal` and `calcLineTotal` calculate from the current immutable cart state on every pass. Zero separate total counters. |
| **P1 (High)** | **Blank or Missing Required Field** | Customer triggers submission without providing a recipient name | Unfulfillable order, courier cannot generate shipping label or dispatch parcel | Strict whitespace-trimmed guard (`customerName.trim() === ''`). Form halts submission, displays a top toaster, focuses the input with a pulsing red glow, and displays inline alert banner. |
| **P1 (High)** | **Empty Cart Submission** | Customer clicks "Place Order" with zero items in cart | Phantom zero-rupee order created, wasted warehouse processing | Empty cart check (`cart.length === 0`) halts submission, triggers floating toaster (*"Your Cart is Empty!"*), and smooth-scrolls user to the deals catalog. |
| **P2 (Medium)** | **Input State Loss on Error** | Validation failure erases customer's partially typed address or name | High checkout friction, frustration, cart abandonment | Controlled component state (`customerName`) is preserved across validation failures; customer only corrects the missing input. |
| **P2 (Medium)** | **Repeated Error Suppression** | Subsequent clicks on a failed submission do nothing because state did not change | User thinks the button is broken or frozen | `handlePlaceOrder` evaluates validation on every single click, generating a fresh toast instance with slide-down animation and smooth scroll every time. |
| **P3 (Low)** | **Post-Order State Bleed** | Placing an order leaves stale items or references in memory on subsequent sessions | Corrupted cart state on next transaction | `resetOrder()` cleanly purges cart items, clears customer name, resets submission mutex, and returns stepper to step 1. |

---

## 2. Automated Test Matrix & Execution Results

All tests are written with **Playwright web-first assertions** (`expect(locator).toBeVisible()`, `toHaveText()`, etc.) and start from an isolated, clean state (`beforeEach` navigates to `/`). Zero hardcoded sleeps (`page.waitForTimeout`) are used.

### The 3 Core Brief Checks & 7 Defensive Guards

| Test ID | Test Scenario | Verified Assertions | Chromium | Firefox | Mobile Chrome |
|---|---|---|---|---|---|
| **TC-01** *(Core)* | **Successful Checkout** | Order confirmation mounts, valid reference ID (`ORD-XXXXXX`) generated, recipient name & price verified | PASS (2.0s) | PASS (5.4s) | PASS (2.1s) |
| **TC-02** *(Core)* | **Missing Field Blocks Checkout** | Blank/whitespace name triggers `"Full Name is required"`, blocks confirmation, preserves cart items | PASS (1.9s) | PASS (5.0s) | PASS (2.1s) |
| **TC-03** *(Core)* | **Quantity Updates Exact Totals** | Incrementing qty from 1 to 2 updates line total (`₹1,598`) and order total (`₹1,598`) in real time | PASS (2.1s) | PASS (5.8s) | PASS (1.9s) |
| **TC-04** | **Empty Cart Guard** | Empty cart triggers `"Your cart is empty"`, blocks order, preserves customer name input | PASS (2.0s) | PASS (5.7s) | PASS (1.6s) |
| **TC-05** | **Zero Quantity Removal** | Decrementing item from qty 1 to 0 removes row from DOM and resets order total to `₹0` | PASS (1.3s) | PASS (3.0s) | PASS (1.4s) |
| **TC-06** | **Rapid Double-Click Idempotency** | Firing two rapid clicks within 50ms produces strictly 1 confirmation and 1 reference ID | PASS (2.9s) | PASS (4.9s) | PASS (3.1s) |
| **TC-07** | **Direct Item Removal** | Clicking "Remove" on item with qty 3 immediately deletes row and recalculates total to `₹0` | PASS (1.5s) | PASS (3.6s) | PASS (1.5s) |
| **TC-08** | **Catalog Duplicate Addition** | Clicking "+ Add to Cart" on already added item increments quantity instead of adding duplicate row | PASS (1.5s) | PASS (2.9s) | PASS (1.4s) |
| **TC-09** | **Clean State Reset** | "Continue Shopping / Start New Order" resets confirmation, cart, inputs, and total cleanly | PASS (1.5s) | PASS (2.6s) | PASS (1.7s) |
| **TC-10** | **Floating Toaster Multi-Trigger** | Top toaster appears on empty cart, re-triggers on repeated clicks, and updates on missing name | PASS (1.6s) | PASS (3.5s) | PASS (3.4s) |
| **Summary** | **All 10 Scenarios** | **Exhaustive coverage of requirements and real-world edge cases** | **10 / 10 PASS** | **10 / 10 PASS** | **10 / 10 PASS** |

**Total Suite Result:** **30 passed (28.4s)** across all 3 browser engines.

---

## 3. Manual Exploratory Testing Log (Recorded Scenarios)

### Scenario A: Empty Cart Checkout Attempt
- **Objective:** Verify that placing an order with zero items is cleanly blocked, alerts the customer at the top, auto-scrolls to the deals catalog, and preserves customer input.
- **Steps to Reproduce:**
  1. Open application at `https://mini-checkout-beryl.vercel.app/` or `http://localhost:5173/`.
  2. Verify cart is empty (`Cart (0 items)`, total is `₹0`).
  3. In the Delivery Address block, enter recipient name: `"Priya Sharma"`.
  4. Click the orange **Place Order** button.
- **Expected Result:**
  - Order must not go through.
  - A top floating toaster notification appears: *"Your Cart is Empty! Please select and add at least one item from the deals below to proceed."*
  - The viewport smooth-scrolls down to the Recommended Deals catalog.
  - Inline error banner displays: *"Your cart is empty. Please add at least one item."*
  - Customer name input retains `"Priya Sharma"` without loss.
  - No order confirmation is generated.
- **Actual Result:**
  - Floating toaster slide-down animated at top with red warning badge.
  - Page smoothly scrolled to the deals catalog.
  - Customer name input remained untouched (`"Priya Sharma"`).
  - No order confirmation created.
- **Verdict:** **PASS** (Matches automated test `TC-04` & `TC-10`).

---

### Scenario B: Rapid Double-Click on Place Order (Idempotency Lock)
- **Objective:** Verify that double-clicking or rapid clicking "Place Order" cannot produce two confirmations or duplicate orders.
- **Steps to Reproduce:**
  1. Open application.
  2. Click **+ Add to Cart** on Wireless Mouse (₹799).
  3. Enter customer name: `"Rapid Clicker"`.
  4. Rapidly double-click the **Place Order** button within 50ms.
- **Expected Result:**
  - The first click processes the order.
  - The second click is rejected by the submission lock.
  - Exactly one confirmation screen is mounted.
  - Exactly one order reference (`ORD-XXXXXX`) is generated.
- **Actual Result:**
  - Synchronous `submittingRef` mutex locked immediately.
  - Single confirmation screen mounted with reference ID: `ORD-UR9SUY`.
  - DOM inspection confirmed exactly 1 `[data-testid="order-reference"]` node.
- **Verdict:** **PASS** (Matches automated test `TC-06`).

---

### Scenario C: Whitespace-Only Name Input
- **Objective:** Verify that spaces-only customer name is treated as blank.
- **Steps to Reproduce:**
  1. Add Mechanical Keyboard (₹1,499) to cart.
  2. In the Full Name field, press Spacebar 5 times (`"     "`).
  3. Click **Place Order**.
- **Expected Result:**
  - Validation blocks checkout.
  - Toaster appears: *"Full Name is Required!"*.
  - Viewport smooth-scrolls to the delivery address field and highlights the input.
  - Cart item remains preserved.
- **Actual Result:**
  - Validation blocked checkout.
  - Toaster displayed at top; input focused with pulsing red border (`fk-input-highlight`).
  - Keyboard remains in cart with total ₹1,499.
- **Verdict:** **PASS** (Matches automated test `TC-02` & `TC-10`).

---

### Scenario D: Repeated "Place Order" Clicks Re-Triggering Toast & Scroll
- **Objective:** Verify that clicking "Place Order" multiple times while invalid re-displays the toaster and re-scrolls on every click.
- **Steps to Reproduce:**
  1. With an empty cart, click **Place Order**. Toast appears and page scrolls to deals.
  2. Scroll back up to the button.
  3. Click **Place Order** again immediately.
- **Expected Result:**
  - Fresh slide-down toast animation plays.
  - Toast timer resets to 4.5s.
  - Page scrolls down to the deals section again.
- **Actual Result:**
  - Toast re-mounted with unique ID (`toast.id`), slide-down animation replayed cleanly, and page smoothly scrolled to deals.
- **Verdict:** **PASS** (Matches automated test `TC-10`).

---

## 4. Real Defects Discovered & Resolved During Development

Per the brief instructions (*"Report real defects if found; don't invent one to satisfy the brief"*), the following real engineering defects were identified and resolved during development:

### Defect 1: Add-to-Cart Button Pointer-Event Trap on Touch & Mobile Viewports
- **Severity:** High (Blocked TC-01 & TC-02 in automated test runs).
- **Environment:** Playwright Chromium / Firefox / Mobile WebKit.
- **Steps to Reproduce:**
  1. Style `.fk-btn-add` with `opacity: 0; pointer-events: none;` until parent `.fk-deal-card:hover`.
  2. Run Playwright script `await page.getByTestId('add-prod-mouse').click()`.
- **Expected Result:** Playwright clicks the button cleanly.
- **Actual Result:** Playwright timed out after 30,000ms:
  `locator.click: Timeout 30000ms exceeded. Element is not visible — waiting for element to receive pointer events.`
- **Root Cause:** Touchscreens and headless automation instances do not dispatch mouse hover coordinates, keeping `pointer-events: none` active.
- **Resolution:** Removed the hover requirement in [src/styles/global.css](file:///home/aryan/Desktop/fynd_hackathon/mini-checkout/src/styles/global.css). Added permanent, accessible `#2874f0` / white action button `.fk-btn-add` with active state indicators.
- **Verification:** Tests `TC-01` through `TC-10` now pass instantaneously across all viewports.

---

### Defect 2: `calcLineTotal` Method Signature Mismatch Leading to `₹NaN`
- **Severity:** High (Corrupted line item calculations in UI).
- **Environment:** Cart item rendering & quantity change handler.
- **Steps to Reproduce:**
  1. Define `calcLineTotal(item)` expecting an item object `{ price, quantity }`.
  2. In UI component, invoke `calcLineTotal(product.price, product.quantity)`.
- **Expected Result:** Correct line total formatted in INR (`₹1,598`).
- **Actual Result:** UI displayed `₹NaN` for item line totals because `item.price` was evaluated on an integer (`799.price => undefined`).
- **Root Cause:** Polymorphic call signatures were not handled in `currency.js`.
- **Resolution:** Overloaded `calcLineTotal` in [src/utils/currency.js](file:///home/aryan/Desktop/fynd_hackathon/mini-checkout/src/utils/currency.js) to detect whether the first argument is an object or a number:
  ```javascript
  export function calcLineTotal(itemOrPrice, maybeQty) {
    if (typeof itemOrPrice === 'object' && itemOrPrice !== null) {
      return (Number(itemOrPrice.price) || 0) * (Number(itemOrPrice.quantity) || 0);
    }
    return (Number(itemOrPrice) || 0) * (Number(maybeQty) || 0);
  }
  ```
- **Verification:** Verified by `TC-03` which explicitly checks `₹1,598` calculation on quantity increment.

---

### Defect 3: Stepper Number Concatenation (`22. DELIVERY ADDRESS`)
- **Severity:** Medium (Visual distortion in stepper bar).
- **Environment:** Stepper bar on desktop and mobile viewports.
- **Steps to Reproduce:**
  1. Render number inside `.step-circle` (`{step2Completed ? '✓' : '2'}`).
  2. Render label text as `"2. DELIVERY ADDRESS"`.
- **Expected Result:** Circular badge with `2`, followed by label `DELIVERY ADDRESS`.
- **Actual Result:** Rendered text collapsed as `22. DELIVERY ADDRESS`, `33. ORDER SUMMARY`, `44. PAYMENT`.
- **Root Cause:** Number was duplicated both in the circle badge and the label string, and missing `.step-circle` CSS caused them to run together.
- **Resolution:** Restored complete [.step-circle](file:///home/aryan/Desktop/fynd_hackathon/mini-checkout/src/styles/global.css) flex styling, and cleaned label text to `LOGIN`, `DELIVERY ADDRESS`, `ORDER SUMMARY`, and `PAYMENT`.

---

### Defect 4: Single-Toast `useEffect` Suppression on Repeated Submissions
- **Severity:** Medium (Customer confusion on repeated error clicks).
- **Environment:** Place order error handler.
- **Steps to Reproduce:**
  1. Click "Place Order" with empty cart. Toast appears and dismisses after 4s.
  2. Click "Place Order" again.
- **Expected Result:** Toast reappears with animation and page re-scrolls to deals.
- **Actual Result:** Nothing happened on the second click; no toast appeared and no scroll occurred.
- **Root Cause:** Toast trigger was inside `useEffect([validationError])`. Because `validationError` was already set to `ERRORS.EMPTY_CART`, React did not detect a state change and skipped re-running the effect.
- **Resolution:** Re-routed submission handling to `handlePlaceOrder`, evaluating validation on every button click and assigning a unique timestamp `toast.id` to force React to remount and re-animate the toast on every click.

---

## 5. How to Run the Test Suite

```bash
cd mini-checkout

# Run all 30 tests across Chromium, Firefox, and Mobile Chrome
npm test

# Run individual browser targets
npm run test:chromium
npm run test:firefox
npm run test:mobile

# Launch interactive UI mode with time-travel debugger
npm run test:ui

# View full HTML test execution report
npm run test:report
```
