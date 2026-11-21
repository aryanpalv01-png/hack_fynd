# Mini Checkout — Project Journal

> **Purpose**: Living record of every architectural decision, feature implementation, UI refinement, and test outcome for the Kinetic Labs checkout application.

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Project Name** | Kinetic Labs Store — Mini Checkout |
| **Domain** | Premium E-Commerce Checkout (Single-Page App) |
| **Tech Stack** | React 18 + Vite 5 + Lucide React + Playwright |
| **Currency** | INR (₹) with Indian Number Grouping |
| **Catalog** | 4 Curated Tech Instruments (Input, Audio, Accessories) |
| **Status** | ✅ 9/9 Playwright Tests Passing |

---

## 2. Catalog & Products (4 Curated Tech Instruments)

| ID | SKU | Product Name | Category | Badge | Price | Key Spec |
|---|---|---|---|---|---|---|
| `prod-mouse` | `KL-M01` | **Wireless Mouse** | Input | Best Seller | ₹799 | 2.4 GHz Wireless · 58g Ultra-light · 16K DPI Optical |
| `prod-keyboard` | `KL-K65` | **Mechanical Keyboard** | Input | Popular | ₹1,499 | 65% Form Factor · Gateron Tactile · Hot-swappable |
| `prod-headphones` | `KL-H01` | **Studio Headphones** | Audio | New Arrival | ₹2,499 | Planar Magnetic · Open-Back · Detachable Braided Cable |
| `prod-deskmat` | `KL-D90` | **Desk Mat Pro** | Accessories | Essential | ₹499 | 900 × 400 mm · Cordura Spill-Proof · Micro-stitched |

*Note: All original test hooks (`prod-mouse`, `prod-keyboard`, and their corresponding prices ₹799 and ₹1,499) are strictly preserved.*

---

## 3. UI/UX Architecture & Professional Features

### 3.1 Clean, Uncluttered Design
- **Eliminated Abstract Filler:** Stripped out robotic or technical jargon (e.g. "TERMINAL READY", "FIG 01") in favor of crisp, intuitive e-commerce terminology ("Curated Products", "Shopping Cart", "Order Summary").
- **Visual Vector Art:** Handcrafted 4 pure SVG blueprint illustrations for each item, guaranteeing zero broken external image links.
- **Typography:** `Plus Jakarta Sans` for clean, modern headings and body; `JetBrains Mono` for tabular prices, SKUs, and order reference numbers.

### 3.2 High-Utility Interactive Features
1. **Interactive Category Filter Bar:** Filter by `All`, `Input`, `Audio`, and `Accessories` seamlessly without page reloading.
2. **Tactile Micro-Interactions:** "Add to Cart" button triggers an instant checkmark transition ("Added") to provide clear visual confirmation.
3. **Copy Order Reference:** Post-checkout confirmation includes a one-click clipboard copy button with check feedback.
4. **Trust & Delivery Badges:** "Ships within 24h", "256-Bit SSL Encrypted", and "7-Day Return Guarantee".
5. **Real-time Live Math Indicator:** Visual status badge confirming live dynamic calculation.

---

## 4. Test Verification Summary

```text
Running 9 tests using 2 workers

  ✓  TC-01: Successful checkout produces a single confirmation and order reference
  ✓  TC-02: Blank name blocks checkout and preserves cart state
  ✓  TC-03: Incrementing quantity updates line total and order total correctly
  ✓  TC-04: Empty cart blocks checkout and preserves customer name input
  ✓  TC-05: Decrement to zero removes item from cart entirely
  ✓  TC-06: Rapid double-click on Place Order produces exactly one confirmation
  ✓  TC-07: Remove button deletes item regardless of quantity
  ✓  TC-08: Adding same product twice increments quantity instead of duplicating row
  ✓  TC-09: Start New Order resets all state cleanly

9 passed (15.2s)
```
