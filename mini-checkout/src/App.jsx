import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '@/constants/products';
import { useCart } from '@/hooks/useCart';
import { calcOrderTotal, calcLineTotal, formatCurrency } from '@/utils/currency';
import '@/styles/global.css';

export default function App() {
  const {
    cart,
    customerName,
    validationError,
    orderConfirmation,
    isSubmitting,
    addToCart,
    incrementQty,
    decrementQty,
    removeItem,
    setCustomerName,
    placeOrder,
    resetOrder,
  } = useCart();

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Floating Toast Notification state
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const showToast = (type, title, message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    // Unique ID guarantees React remounts and replays the slide-down animation every time
    setToast({ id: Date.now() + Math.random(), type, title, message });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Responsive mobile detection for search input placeholder
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Place Order with immediate toast notification and smooth scrolling on every attempt
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      showToast(
        'error',
        'Your Cart is Empty!',
        'Please select and add at least one item from the deals below to proceed.'
      );
      const dealsSection = document.getElementById('deals-section');
      dealsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      placeOrder();
      return;
    }

    if (customerName.trim() === '') {
      showToast(
        'error',
        'Full Name is Required!',
        'Please enter your recipient name in the delivery address field.'
      );
      const nameInput = document.getElementById('customer-name-input');
      if (nameInput) {
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameInput.focus();
        nameInput.classList.remove('fk-input-highlight');
        void nameInput.offsetWidth; // force DOM reflow to re-animate glow
        nameInput.classList.add('fk-input-highlight');
      }
      placeOrder();
      return;
    }

    placeOrder();
  };

  // Wrap addToCart to provide instant toast feedback
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(
      'info',
      'Added to Cart',
      `"${product.name}" (${formatCurrency(product.price)}) added to your order.`
    );
  };

  // Scroll to top and show success toast upon order confirmation
  useEffect(() => {
    if (orderConfirmation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast(
        'success',
        'Order Placed Successfully!',
        `Your reference ID is ${orderConfirmation.referenceId}. Tracking activated.`
      );
    }
  }, [orderConfirmation]);

  const orderTotal = calcOrderTotal(cart);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total discount calculation for authentic Flipkart price card
  const totalOriginalPrice = cart.reduce((sum, item) => {
    const orig = item.originalPrice || item.price;
    return sum + orig * item.quantity;
  }, 0);
  const totalDiscount = Math.max(0, totalOriginalPrice - orderTotal);

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.shortDesc && p.shortDesc.toLowerCase().includes(query)) ||
      (p.tag && p.tag.toLowerCase().includes(query))
    );
  });

  // Stepper state calculation
  const isAddressFilled = customerName.trim() !== '';
  const isCartFilled = cart.length > 0;
  const isOrderPlaced = !!orderConfirmation;

  // Step 2 (Address)
  const step2Completed = isOrderPlaced || isAddressFilled;
  const step2Active = !step2Completed;

  // Step 3 (Summary)
  const step3Completed = isOrderPlaced || (isCartFilled && isAddressFilled);
  const step3Active = !isOrderPlaced && isCartFilled && !isAddressFilled;

  // Step 4 (Payment / Confirmation)
  const step4Completed = isOrderPlaced;
  const step4Active = !isOrderPlaced && isCartFilled && isAddressFilled;

  return (
    <div className="fk-app">
      {/* ── Top Floating Toaster Notification ─────────────────── */}
      {toast && (
        <div
          key={toast.id}
          data-testid="toast-notification"
          className={`fk-toast fk-toast-${toast.type}`}
          role="status"
          aria-live="polite"
        >
          <div className="fk-toast-icon">
            {toast.type === 'error' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            ) : toast.type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            )}
          </div>
          <div className="fk-toast-body">
            <div className="fk-toast-title">{toast.title}</div>
            <div className="fk-toast-msg">{toast.message}</div>
          </div>
          <button
            type="button"
            className="fk-toast-close"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Flipkart / Myntra Top Header ─────────────────────── */}
      <header className="fk-header">
        <div className="fk-header-inner">
          <div className="fk-brand">
            <span className="fk-logo-text">FlipStore</span>
            <span className="fk-logo-plus">
              Explore <span className="fk-plus-gold">Plus ✦</span>
            </span>
          </div>

          {/* Active Real-Time Search Bar */}
          <div className="fk-search-preview">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2874f0"
              strokeWidth="2.5"
              style={{ marginRight: 8, flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="fk-search-input"
              placeholder={isMobile ? "Search products..." : "Search for electronics, mouse, keyboard, headphones..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                className="fk-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="fk-header-trust">
            <div className="fk-trust-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>100% Safe Payments</span>
            </div>
            {/* Note: Top right cart button removed per user request */}
          </div>
        </div>
      </header>

      {/* ── Checkout Steps Progress Bar (Clear Ticks in Circles) ── */}
      <nav className="checkout-stepper-bar" aria-label="Checkout Progress">
        <div className="checkout-stepper-inner">
          {/* Step 1: Login */}
          <div className="step-item completed">
            <span className="step-circle">✓</span>
            <span className="step-text">LOGIN</span>
          </div>

          <div className={`step-line ${step2Completed || step2Active ? 'completed' : ''}`} />

          {/* Step 2: Delivery Address */}
          <div className={`step-item ${step2Completed ? 'completed' : step2Active ? 'active' : ''}`}>
            <span className="step-circle">{step2Completed ? '✓' : '2'}</span>
            <span className="step-text">DELIVERY ADDRESS</span>
          </div>

          <div className={`step-line ${step3Completed || step3Active ? 'completed' : ''}`} />

          {/* Step 3: Order Summary */}
          <div className={`step-item ${step3Completed ? 'completed' : step3Active ? 'active' : ''}`}>
            <span className="step-circle">{step3Completed ? '✓' : '3'}</span>
            <span className="step-text">ORDER SUMMARY</span>
          </div>

          <div className={`step-line ${step4Completed || step4Active ? 'completed' : ''}`} />

          {/* Step 4: Payment / Confirmed */}
          <div className={`step-item ${step4Completed ? 'completed' : step4Active ? 'active' : ''}`}>
            <span className="step-circle">{step4Completed ? '✓' : '4'}</span>
            <span className="step-text">{step4Completed ? 'ORDER PLACED' : 'PAYMENT'}</span>
          </div>
        </div>
      </nav>

      {/* ── Main Layout: 2 Columns ───────────────────────────── */}
      <main className="fk-main">
        {orderConfirmation ? (
          /* ── Order Confirmation Screen ──────────────────────── */
          <div style={{ gridColumn: '1 / -1', width: '100%' }}>
            <div data-testid="order-confirmation" className="fk-confirmation-container">
              <div className="fk-conf-badge-icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="fk-conf-title">Order Placed Successfully!</h2>

              <p className="fk-conf-msg">
                Thank you, <strong>{orderConfirmation.customerName}</strong>. Your order is confirmed and will be delivered to your registered address.
              </p>

              {/* Order Reference Box */}
              <div className="fk-conf-ref-box">
                <span className="fk-conf-ref-label">Order Reference ID</span>
                <span data-testid="order-reference" className="fk-conf-ref-code">
                  {orderConfirmation.referenceId}
                </span>
              </div>

              {/* Delivery Timeline Tracker */}
              <div className="fk-tracker" aria-label="Order Tracking Timeline">
                <div className="fk-track-line-bg" />
                <div className="fk-track-line-progress" style={{ width: '38%' }} />

                <div className="fk-track-step completed">
                  <span className="fk-track-circle">✓</span>
                  <span className="fk-track-label">Order Placed</span>
                  <span className="fk-track-time">Today, Confirmed</span>
                </div>

                <div className="fk-track-step current">
                  <span className="fk-track-circle">
                    <span className="fk-pulse-dot" />
                  </span>
                  <span className="fk-track-label">Packed</span>
                  <span className="fk-track-time">In Progress</span>
                </div>

                <div className="fk-track-step pending">
                  <span className="fk-track-circle">3</span>
                  <span className="fk-track-label">Shipped</span>
                  <span className="fk-track-time">Tomorrow</span>
                </div>

                <div className="fk-track-step pending">
                  <span className="fk-track-circle">4</span>
                  <span className="fk-track-label">Delivered</span>
                  <span className="fk-track-time">Expected by 9 PM</span>
                </div>
              </div>

              {/* Order Items Summary with Real Photos */}
              <div className="fk-conf-items-box">
                {orderConfirmation.items.map((item) => (
                  <div key={item.id} className="fk-conf-item-row">
                    <span>{item.name} (Qty {item.quantity})</span>
                    <span className="tabular">{formatCurrency(item.lineTotal)}</span>
                  </div>
                ))}
                <div className="fk-conf-total-row">
                  <span>Total Amount Paid (Cash on Delivery)</span>
                  <span className="tabular">{formatCurrency(orderConfirmation.orderTotal)}</span>
                </div>
              </div>

              {/* Continue Shopping / Reset Button */}
              <button
                type="button"
                data-testid="new-order-btn"
                className="fk-btn-continue"
                onClick={resetOrder}
              >
                Continue Shopping / Start New Order
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ── Left Column: Address, Cart Items & Catalog ─── */}
            <div className="fk-left-col">
              {/* Step 1: Customer Details */}
              <section id="delivery-address-card" className="fk-card" aria-labelledby="delivery-heading">
                <div className="fk-step-header">
                  <div className="fk-step-title-group">
                    <span className={`fk-step-badge ${isAddressFilled ? 'done' : ''}`}>
                      {isAddressFilled ? '✓' : '1'}
                    </span>
                    <h2 id="delivery-heading" className="fk-step-heading">Delivery Address</h2>
                  </div>
                  <span className="fk-step-count">Required</span>
                </div>

                <div className="fk-address-body">
                  {validationError && (
                    <div data-testid="validation-error" role="alert" className="fk-validation-banner">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="fk-form-row">
                    <label htmlFor="customer-name-input" className="fk-label">
                      <span>Full Name</span>
                      <span className="fk-label-req">*</span>
                    </label>
                    <input
                      id="customer-name-input"
                      data-testid="customer-name-input"
                      type="text"
                      className="fk-input"
                      placeholder="e.g. Aryan Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  <div className="fk-address-mock-preview">
                    <span className="fk-badge-home">HOME</span>
                    <span>Flat 402, Tech Residency, Sector 48, Bengaluru, Karnataka - 560103</span>
                  </div>
                </div>
              </section>

              {/* Step 2: Order Summary & Cart Ledger */}
              <section className="fk-card" aria-labelledby="cart-heading">
                <div className="fk-step-header">
                  <div className="fk-step-title-group">
                    <span className={`fk-step-badge ${isCartFilled ? 'done' : ''}`}>
                      {isCartFilled ? '✓' : '2'}
                    </span>
                    <h2 id="cart-heading" className="fk-step-heading">Order Summary</h2>
                  </div>
                  <span className="fk-step-count tabular">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="fk-cart-empty">
                    <div className="fk-cart-empty-icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </div>
                    <div className="fk-cart-empty-title">Your cart is empty!</div>
                    <div className="fk-cart-empty-sub">
                      Explore our deals below and add products to complete your order.
                    </div>
                  </div>
                ) : (
                  <div className="fk-cart-list">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        data-testid={`cart-item-${item.id}`}
                        className="fk-cart-item"
                      >
                        {/* Real Photographic Product Thumbnail */}
                        <div className="fk-item-thumb">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="fk-item-img"
                            loading="lazy"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="fk-item-info">
                          <div className="fk-item-title-row">
                            <h3 className="fk-item-name">{item.name}</h3>
                            <span className="fk-delivery-promise">
                              Delivery by Tomorrow | <span className="fk-delivery-free">Free</span>
                            </span>
                          </div>

                          <div className="fk-item-seller">
                            <span>Seller: RetailNet</span>
                            <span className="fk-assured-tag">✦ Assured</span>
                          </div>

                          <div className="fk-item-pricing">
                            <span data-testid={`line-total-${item.id}`} className="fk-item-price tabular">
                              {formatCurrency(calcLineTotal(item))}
                            </span>
                            {item.originalPrice && (
                              <>
                                <span className="fk-item-orig-price tabular">
                                  {formatCurrency(item.originalPrice * item.quantity)}
                                </span>
                                <span className="fk-item-discount">{item.discount || 'Special Price'}</span>
                              </>
                            )}
                          </div>

                          {/* Stepper & Actions */}
                          <div className="fk-item-actions">
                            <div className="fk-stepper" role="group" aria-label={`Quantity for ${item.name}`}>
                              <button
                                type="button"
                                data-testid={`dec-${item.id}`}
                                className="fk-step-btn"
                                onClick={() => decrementQty(item.id)}
                                aria-label={`Decrease ${item.name} quantity`}
                              >
                                −
                              </button>
                              <span data-testid={`qty-${item.id}`} className="fk-step-qty tabular">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                data-testid={`inc-${item.id}`}
                                className="fk-step-btn"
                                onClick={() => incrementQty(item.id)}
                                aria-label={`Increase ${item.name} quantity`}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              data-testid={`remove-${item.id}`}
                              className="fk-btn-remove"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Step 3: Product Store Deals (Catalog Section with Live Search) */}
              <section id="deals-section" className="fk-catalog-section" aria-labelledby="deals-heading">
                <div className="fk-step-header">
                  <div className="fk-step-title-group">
                    <span className="fk-step-badge done">★</span>
                    <h2 id="deals-heading" className="fk-step-heading">
                      {searchQuery ? 'Search Results' : 'Recommended Electronics Deals'}
                    </h2>
                  </div>
                  <span className="fk-step-count">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>

                {/* Filter info banner when searching */}
                {searchQuery && (
                  <div className="fk-search-banner">
                    <span>
                      Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                    </span>
                    <button
                      type="button"
                      className="fk-clear-search-btn"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                {filteredProducts.length === 0 ? (
                  <div className="fk-no-results">
                    <div className="fk-no-results-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                    <div className="fk-no-results-title">No products found</div>
                    <div className="fk-no-results-sub">
                      We couldn&apos;t find any products matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or search for mouse, keyboard, or headphones.
                    </div>
                    <button
                      type="button"
                      className="fk-btn-continue"
                      style={{ marginTop: 12, fontSize: 13, minHeight: 38 }}
                      onClick={() => setSearchQuery('')}
                    >
                      View All Products
                    </button>
                  </div>
                ) : (
                  <div className="fk-deals-grid">
                    {filteredProducts.map((product) => {
                      const inCartItem = cart.find((i) => i.id === product.id);

                      return (
                        <div key={product.id} className="fk-deal-card">
                          {/* Real Photographic Product Thumbnail */}
                          <div className="fk-deal-thumb">
                            {product.tag && <span className="fk-deal-tag">{product.tag}</span>}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="fk-deal-img"
                              loading="lazy"
                            />
                          </div>

                          <h3 className="fk-deal-title">{product.name}</h3>

                          <div className="fk-deal-rating">
                            <span>★ {product.rating || '4.5'}</span>
                          </div>

                          <p className="fk-deal-desc">{product.shortDesc}</p>

                          <div className="fk-deal-price-row">
                            <span className="fk-deal-price tabular">{formatCurrency(product.price)}</span>
                            {product.originalPrice && (
                              <span className="fk-deal-orig-price tabular">{formatCurrency(product.originalPrice)}</span>
                            )}
                            {product.discount && (
                              <span className="fk-deal-discount">{product.discount}</span>
                            )}
                          </div>

                          <button
                            type="button"
                            data-testid={`add-${product.id}`}
                            className={`fk-btn-add ${inCartItem ? 'in-cart' : ''}`}
                            onClick={() => handleAddToCart(product)}
                            aria-label={`Add ${product.name} to cart`}
                          >
                            {inCartItem ? (
                              <span>Added ({inCartItem.quantity} in cart) +</span>
                            ) : (
                              <span>+ Add to Cart</span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>

            {/* ── Right Column: Sticky Price Details Card ────── */}
            <aside className="fk-right-col" aria-label="Order Price Details">
              <div className="fk-price-card">
                <div className="fk-price-header">Price Details</div>

                <div className="fk-price-breakdown">
                  <div className="fk-price-row">
                    <span>Price ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
                    <span className="tabular">{formatCurrency(totalOriginalPrice || orderTotal)}</span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="fk-price-row discount">
                      <span>Discount</span>
                      <span className="tabular">−{formatCurrency(totalDiscount)}</span>
                    </div>
                  )}

                  <div className="fk-price-row delivery">
                    <span>Delivery Charges</span>
                    <span className="free">FREE</span>
                  </div>

                  <div className="fk-price-row delivery">
                    <span>Secured Packaging Fee</span>
                    <span className="free">FREE</span>
                  </div>
                </div>

                <div className="fk-price-total-row">
                  <span>Total Amount</span>
                  <span data-testid="order-total" className="fk-price-total-amount tabular">
                    {formatCurrency(orderTotal)}
                  </span>
                </div>

                {totalDiscount > 0 && (
                  <div className="fk-savings-strip">
                    <span>🎉 You will save {formatCurrency(totalDiscount)} on this order</span>
                  </div>
                )}

                <div className="fk-checkout-action-wrap">
                  <button
                    type="button"
                    data-testid="place-order-btn"
                    className="fk-btn-place-order"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Placing Order…' : 'Place Order'}
                  </button>

                  <div className="fk-security-promise">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}
      </main>

      {/* ── Sticky Footer (Pinned to Bottom) ────────────────── */}
      <footer className="fk-footer">
        <div className="fk-footer-inner">
          <div className="fk-footer-brand">
            FlipStore India · 100% Genuine Products · Express Delivery
          </div>
          <div>
            Need help? Visit the Help Center or contact customer support
          </div>
        </div>
      </footer>
    </div>
  );
}
