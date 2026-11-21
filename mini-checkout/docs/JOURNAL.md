# Engineering & Architecture Journal — Mini Checkout

## Session 01: Core Requirements & Business Logic
- Established project baseline with React 18, Vite, and Playwright.
- Implemented state management hook `useCart.js`:
  - Enforced synchronous idempotency locking via `useRef(false)` paired with `isSubmitting` state.
  - Cart derivation: `calcOrderTotal` and `calcLineTotal` compute directly from state on render, eliminating stale total bugs.
  - Defensive validation: whitespace trimming on customer name and empty cart checks.

## Session 02: Flipkart / Myntra E-Commerce Checkout Experience
- Rebranded to **FlipStore** (authentic Indian e-commerce checkout standard).
- Implemented Flipkart signature UI elements:
  - Header in `#2874f0` with `Explore Plus ✦`.
  - Multi-step checkout progress bar (`1. LOGIN` → `2. DELIVERY ADDRESS` → `3. ORDER SUMMARY` → `4. PAYMENT`).
  - Delivery address card with customer name input and `HOME` delivery preview.
  - Order summary cart items with RetailNet Assured tag, delivery promise, and stepper.
  - Iconic `PRICE DETAILS` sidebar with discounts, free delivery, total, and green savings strip.
  - Signature `#fb641b` orange `PLACE ORDER` button.
  - Order confirmation screen with order reference, tracking stepper, and item breakdown.

## Session 03: Production Refinements (Search, Real Photography & Layout Polish)
1. **Functional Search Bar**:
   - Wired live search input in header (`.fk-search-input`) with real-time filtering across name, brand, specs, and tags.
   - Added search results count banner, clear button (`✕`), and friendly empty search state with a "View All Products" button.
2. **Real Product Photography**:
   - Replaced all SVG vectors with high-resolution, photographic product images bundled locally in `/public/images/`:
     - `mouse.jpg`: Ergonomic wireless mouse on studio surface
     - `keyboard.jpg`: 87-key tenkeyless mechanical keyboard
     - `headphones.jpg`: Over-ear black studio headphones
     - `deskmat.jpg`: Extended felt wool desk mat setup
   - Styled both catalog deal cards and in-cart item thumbnails with high-resolution photography.
3. **Header Cleanup**:
   - Removed the redundant top-right cart button as requested.
4. **Sticky Footer & Visual Stepper**:
   - Solved footer floating issue by enforcing flexbox full-height viewport pinning (`min-height: 100vh`, `margin-top: auto`).
   - Added clear circular checkmarks (`✓`) and active stage indicators.
5. **Test Suite Verification**:
   - All 9 Playwright end-to-end tests continue to pass with 100% green status (9.0s).
