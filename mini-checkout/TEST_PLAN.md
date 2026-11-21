# QA Test Plan — Mini Checkout

**Version:** 1.0  
**Author:** QA Team  
**Application:** Kinetic Labs Mini Checkout  
**Date:** 2026-11-21

---

## 1. Scope

This plan covers functional, edge-case, and regression testing for the single-page checkout flow. No backend, no payment processing, no external APIs — scope is entirely client-side.

---

## 2. Risk Prioritisation Matrix

| # | Risk | Severity | Likelihood | Priority |
|---|---|---|---|---|
| R1 | Duplicate order from rapid double-click | 🔴 Critical | Medium | **P0** |
| R2 | Checkout accepted with empty cart | 🔴 High | High | **P1** |
| R3 | Whitespace-only name accepted as valid | 🔴 High | High | **P1** |
| R4 | Cart math drifts (totals not updated after qty change) | 🔴 High | Low | **P1** |
| R5 | Cart state lost when validation error occurs | 🟡 Medium | Medium | **P2** |
| R6 | Quantity reaches 0 or negative without item removal | 🟡 Medium | Low | **P2** |
| R7 | Multiple cart rows for the same product | 🟡 Medium | Low | **P2** |
| R8 | Order reference ID collision | 🟢 Low | Very Low | **P3** |
| R9 | UI not usable without a mouse (keyboard navigation) | 🟢 Low | Low | **P3** |

---

## 3. Automated Test Suite

Executed with Playwright (`npx playwright test`). Full suite runs in < 15 seconds.

### Test Cases

#### TC-01 — Successful Checkout *(Risk R1 coverage)*
**Precondition:** Fresh page load.  
**Steps:**
1. Click Add to Cart on Wireless Mouse.
2. Enter `Aryan Pal` in Full Name.
3. Click Place Order.

**Expected:**
- Order confirmation panel is visible.
- Order reference matches `/^ORD-[A-Z0-9]{6}$/`.
- Confirmation contains `Aryan Pal` and `₹799`.

**Result:** ✅ PASS

---

#### TC-02 — Blank Name Blocks Checkout *(Risk R3)*
**Precondition:** Fresh page load.  
**Steps:**
1. Click Add to Cart on Mechanical Keyboard.
2. Enter `   ` (spaces only) in Full Name.
3. Click Place Order.

**Expected:**
- Error banner visible: *"Full Name is required."*
- Confirmation not visible.
- Cart item still present.

**Result:** ✅ PASS

---

#### TC-03 — Quantity Change Updates Totals *(Risk R4)*
**Precondition:** Fresh page load.  
**Steps:**
1. Click Add to Cart on Wireless Mouse (₹799).
2. Assert order total = `₹799`.
3. Click `+` (increment).
4. Assert quantity = `2`, line total = `₹1,598`, order total = `₹1,598`.

**Expected:** All three assertions pass simultaneously.  
**Result:** ✅ PASS

---

#### TC-04 — Empty Cart Blocks Checkout *(Risk R2)*
**Precondition:** Fresh page load.  
**Steps:**
1. Enter `Priya Sharma` in Full Name (do not add items).
2. Click Place Order.

**Expected:**
- Error: *"Your cart is empty. Please add at least one item."*
- Name input still contains `Priya Sharma`.
- Confirmation not visible.

**Result:** ✅ PASS

---

#### TC-05 — Decrement to Zero Removes Item *(Risk R6)*
**Precondition:** Fresh page load.  
**Steps:**
1. Add Wireless Mouse (qty = 1).
2. Click `−`.

**Expected:** Cart item row removed. Order total = `₹0`.  
**Result:** ✅ PASS

---

#### TC-06 — Rapid Double-Click Idempotency *(Risk R1)*
**Precondition:** Fresh page load.  
**Steps:**
1. Add mouse, enter valid name.
2. Click Place Order twice in rapid succession (no await between clicks).

**Expected:** Exactly one confirmation panel. Exactly one order-reference element.  
**Result:** ✅ PASS

---

#### TC-07 — Remove Button (Any Quantity) *(Risk R6)*
**Precondition:** Fresh page load.  
**Steps:**
1. Add mouse, increment to qty 3.
2. Click Remove.

**Expected:** Item gone immediately, total = `₹0`.  
**Result:** ✅ PASS

---

#### TC-08 — Adding Same Product Merges Rows *(Risk R7)*
**Precondition:** Fresh page load.  
**Steps:**
1. Click Add to Cart on Wireless Mouse twice.

**Expected:** One cart row, qty = 2, total = `₹1,598`.  
**Result:** ✅ PASS

---

#### TC-09 — Start New Order Resets All State
**Precondition:** Completed order (TC-01 scenario).  
**Steps:**
1. Click Start New Order.

**Expected:** Confirmation gone, name input blank, cart empty, total = `₹0`.  
**Result:** ✅ PASS

---

## 4. Manual Exploratory Test Log

### ET-01 — Empty Cart Checkout Attempt

| Field | Detail |
|---|---|
| **Tester** | QA |
| **Date** | 2026-11-21 |
| **Browser** | Chromium (Playwright Desktop Chrome) |

| Step | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Navigate to `http://localhost:5173` | Clean UI, cart empty | Cart shows "Your cart is empty" | ✅ |
| 2 | Type `Test User` in Full Name | Input shows the value | Input shows `Test User` | ✅ |
| 3 | Click Place Order | Error: "Your cart is empty…" shown; name preserved | Error banner appears; name `Test User` remains | ✅ |
| 4 | Add Wireless Mouse to cart | Error banner disappears (auto-cleared) | Error cleared; mouse appears in cart | ✅ |
| 5 | Click Place Order again | Order confirmed | Confirmation panel renders with reference ID | ✅ |

**Defects Found:** None.

---

### ET-02 — Rapid Double-Click / Idempotency Guard

| Field | Detail |
|---|---|
| **Tester** | QA |
| **Date** | 2026-11-21 |
| **Browser** | Chromium (Playwright Desktop Chrome) |

| Step | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Add Mechanical Keyboard to cart | 1 item in cart | Cart shows keyboard, qty 1, total ₹1,499 | ✅ |
| 2 | Enter `Double Click Test` in name | Input shows value | Populated | ✅ |
| 3 | Click Place Order button twice, as fast as possible | 1 confirmation panel, 1 reference ID, button disabled after first click | Exactly one confirmation rendered; `[disabled]` on button observed | ✅ |
| 4 | Inspect DOM for `data-testid="order-reference"` count | Count = 1 | Count = 1 | ✅ |
| 5 | Click Start New Order | App resets to clean state | All state cleared | ✅ |

**Defects Found:** None.

---

## 5. Defect Report Template

If a defect is found during testing, use this format:

```
DEFECT-XXX: <Short Title>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Severity:    [Critical | High | Medium | Low]
Component:   [Cart | Validation | Checkout | Confirmation | UI]
Found in:    [Manual / Playwright TC-XX]
Date:        YYYY-MM-DD

Description:
  <What went wrong>

Steps to Reproduce:
  1. ...
  2. ...
  3. ...

Expected Result:
  <What should have happened>

Actual Result:
  <What actually happened>

Evidence:
  - Screenshot: <path or description>
  - Console error: <if applicable>
  - Test output: <if applicable>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Defects Logged to Date:** 0 — no real defects were found during this build cycle.
