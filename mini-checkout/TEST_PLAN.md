# QA Test Plan & Multi-Browser Verification Report — FlipStore Checkout

**Branch:** `test/cross-browser-suite`  
**Application:** FlipStore Mini Checkout  
**Testing Framework:** Playwright Multi-Browser Engine  
**Execution Matrix:** Desktop Chrome (Chromium), Desktop Firefox (Gecko), Mobile Chrome (Pixel 5), Desktop Safari / WebKit  
**Total Executed Tests:** 27 Tests (9 Tests × 3 Active Engines)  
**Status:** **27 / 27 PASS (100% Green)**  

---

## 1. Scope & Quality Standards

This test suite covers functional, edge-case, and cross-browser regression testing for the single-page checkout flow across multiple viewport profiles and layout rendering engines.

### Testing Objectives Enforced:
1. **Dynamic Cart Mathematics**: Synced derivation of line totals (`price × qty`) and order totals in INR (`₹`) without stale state.
2. **Defensive Validation Guards**: Blocking submissions on empty carts and whitespace-only name inputs while preserving user input.
3. **Idempotent Order Placement**: Preventing duplicate order generation under high-frequency double clicks via synchronous `useRef` mutex lock.
4. **Deterministic State Reset**: Clean teardown and reset upon clicking "Continue Shopping / Start New Order".
5. **Cross-Browser & Viewport Parity**: Identical behavior and layout integrity across Chromium, Firefox, and Mobile viewports.

---

## 2. Cross-Browser Matrix & Verified Test Results

| Test ID | Test Scenario | Verified Assertions | Chromium | Firefox | Mobile Chrome |
|---|---|---|---|---|---|
| **TC-01** | Happy Path Checkout | Confirmation visible, `ORD-XXXXXX` generated, name & price verified | ✅ PASS (2.3s) | ✅ PASS (11.7s) | ✅ PASS (2.3s) |
| **TC-02** | Missing Name Field | Error banner displayed, cart item preserved, no confirmation shown | ✅ PASS (2.3s) | ✅ PASS (11.7s) | ✅ PASS (2.1s) |
| **TC-03** | Quantity & Price Math | Base price ₹799, qty updated to 2, line total ₹1,598, order total ₹1,598 | ✅ PASS (0.9s) | ✅ PASS (12.1s) | ✅ PASS (2.0s) |
| **TC-04** | Empty Cart Guard | Error "Your cart is empty", customer name preserved, checkout blocked | ✅ PASS (0.8s) | ✅ PASS (11.8s) | ✅ PASS (2.1s) |
| **TC-05** | Decrement to Zero | Item removed from DOM when qty reaches 0, order total resets to ₹0 | ✅ PASS (0.8s) | ✅ PASS (15.0s) | ✅ PASS (1.2s) |
| **TC-06** | Double Click Idempotency | Rapid double-click produces exactly 1 confirmation and 1 reference ID | ✅ PASS (2.4s) | ✅ PASS (18.0s) | ✅ PASS (2.4s) |
| **TC-07** | Direct Item Removal | Clicking Remove immediately deletes item with qty 3, total resets to ₹0 | ✅ PASS (0.7s) | ✅ PASS (15.8s) | ✅ PASS (1.4s) |
| **TC-08** | Repeated Item Addition | Adding same item twice increments quantity to 2 with total ₹1,598 | ✅ PASS (0.5s) | ✅ PASS (10.3s) | ✅ PASS (1.2s) |
| **TC-09** | Clean State Reset | Reset action dismisses confirmation, clears cart & name, resets total to ₹0 | ✅ PASS (0.9s) | ✅ PASS (4.2s) | ✅ PASS (1.2s) |
| **Total** | **All 9 Scenarios** | **Exhaustive coverage of Problem Statement requirements** | **9 / 9 PASS** | **9 / 9 PASS** | **9 / 9 PASS** |

*Overall Multi-Browser Suite Result: 27 passed in 1.3 minutes.*

---

## 3. Manual Exploratory Testing Log (Recorded Scenarios)

### Scenario A: Empty Cart Checkout Attempt
- **Steps**:
  1. Navigate to `/` on fresh load.
  2. Leave cart empty (`[]`).
  3. Enter customer name: `"Priya Sharma"`.
  4. Click `PLACE ORDER`.
- **Observed Behavior**:
  - The submission is blocked immediately.
  - A red alert banner appears: `"Your cart is empty. Please add at least one item."`
  - The customer name `"Priya Sharma"` remains typed in the input field without being erased.
  - No order confirmation is generated.
- **Verdict**: ✅ Pass.

### Scenario B: Rapid Multi-Click on Submission Button (Idempotency)
- **Steps**:
  1. Add Wireless Mouse (₹799) to cart.
  2. Fill Full Name: `"Rapid Clicker"`.
  3. Double-click `PLACE ORDER` within 50ms.
- **Observed Behavior**:
  - The synchronous `submittingRef` mutex locks immediately on the first event loop pass.
  - Exactly one order confirmation panel is mounted to the DOM.
  - Only one order reference (`ORD-XXXXXX`) is generated.
  - Subsequent clicks are ignored and discarded safely.
- **Verdict**: ✅ Pass.

### Scenario C: Whitespace-Only Name Input
- **Steps**:
  1. Add Mechanical Keyboard (₹1,499) to cart.
  2. In Full Name, type 5 blank spaces (`"     "`).
  3. Click `PLACE ORDER`.
- **Observed Behavior**:
  - Submission is blocked by the `.trim()` validation guard.
  - Warning banner displays: `"Full Name is required."`
  - Cart item remains in the cart without loss of state.
- **Verdict**: ✅ Pass.

---

## 4. Multi-Browser Test Execution Commands

```bash
# Run all configured browsers (Chromium, Firefox, Mobile Chrome)
npm run test:all

# Run specific browser targets
npm run test:chromium
npm run test:firefox
npm run test:mobile

# Run full matrix including WebKit/Safari (on macOS or CI with libavif)
ALL_BROWSERS=true npm test
```
