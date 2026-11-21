import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES, SHIPPING_COST } from '@/constants/products';
import { useCart } from '@/hooks/useCart';
import { calcOrderTotal } from '@/utils/currency';
import { ProductCard } from '@/components/ProductCard';
import { CartItem, EmptyCartPlaceholder } from '@/components/CartItem';
import { OrderSummary } from '@/components/OrderSummary';
import { CheckoutForm } from '@/components/CheckoutForm';
import { OrderConfirmation } from '@/components/OrderConfirmation';
import { ShoppingCart, Sparkles, SlidersHorizontal, CheckCircle } from 'lucide-react';
import '@/styles/global.css';
import '@/styles/components.css';

/**
 * App
 * ---
 * Boutique hardware checkout page.
 * Features 4 curated tech instruments, live category filtering,
 * derived math calculations, accessible validation, and idempotent checkout.
 */
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

  const [selectedCategory, setSelectedCategory] = useState('All');

  const orderTotal = calcOrderTotal(cart);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isOrderPlaced = !!orderConfirmation;

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="app">
      {/* ── Top Navigation Bar ────────────────────────────────────────── */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-lockup">
            <div className="brand-mark">
              <Sparkles size={16} className="brand-sparkle-icon" />
            </div>
            <div>
              <div className="brand-title-wrap">
                <span className="brand-name">KINETIC LABS</span>
                <span className="brand-separator">/</span>
                <span className="brand-subtitle">STORE</span>
              </div>
              <p className="brand-tagline">Precision Input Instruments & Workstation Hardware</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="header-pill delivery-pill">
              <span className="status-dot pulse" />
              <span>Free Delivery in India</span>
            </div>

            <div className="header-pill cart-count-pill" aria-label={`${totalItemsCount} items in cart`}>
              <ShoppingCart size={14} />
              <span className="tabular">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Layout ─────────────────────────────────────────────── */}
      <main className="main" id="main-content">
        <div className="layout">

          {/* ─── LEFT COLUMN: Products & Cart (58%) ─────────────────── */}
          <div className="col-left">

            {/* Catalog Section */}
            <section className="panel catalog-panel" aria-labelledby="catalog-heading">
              <div className="panel-header">
                <div>
                  <h2 id="catalog-heading" className="panel-title">Curated Products</h2>
                  <p className="panel-desc">Handcrafted precision instruments with premium materials</p>
                </div>

                {/* Category Filter Pills */}
                <div className="category-filter-bar" role="tablist" aria-label="Filter products by category">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={selectedCategory === cat}
                      className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="product-grid">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={addToCart}
                    disabled={isOrderPlaced}
                  />
                ))}
              </div>
            </section>

            {/* Cart Section */}
            <section className="panel cart-panel" aria-labelledby="cart-heading">
              <div className="panel-header">
                <div className="cart-title-row">
                  <h2 id="cart-heading" className="panel-title">Shopping Cart</h2>
                  <span className="items-counter-badge tabular">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
                  </span>
                </div>
                {totalItemsCount > 0 && (
                  <span className="live-math-indicator">
                    <CheckCircle size={13} className="text-success" />
                    <span>Live Total Derived</span>
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <EmptyCartPlaceholder />
              ) : (
                <div className="cart-list" role="list" aria-label="Cart items">
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrement={incrementQty}
                      onDecrement={decrementQty}
                      onRemove={removeItem}
                      disabled={isOrderPlaced}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* ─── RIGHT COLUMN: Order Summary & Checkout (42%) ──────── */}
          <div className="col-right">
            <div className="sticky-panel">
              {isOrderPlaced ? (
                /* Post-Order Receipt View */
                <OrderConfirmation
                  order={orderConfirmation}
                  onNewOrder={resetOrder}
                />
              ) : (
                /* Checkout Card */
                <div className="panel checkout-panel" aria-labelledby="checkout-heading">
                  <div className="panel-header">
                    <h2 id="checkout-heading" className="panel-title">Order Summary</h2>
                    <span className="currency-indicator">INR (₹)</span>
                  </div>

                  {/* Order Summary Line Items */}
                  <OrderSummary
                    orderTotal={orderTotal}
                    shippingCost={SHIPPING_COST}
                  />

                  <div className="form-divider" aria-hidden="true" />

                  {/* Customer Checkout Form */}
                  <CheckoutForm
                    customerName={customerName}
                    onNameChange={setCustomerName}
                    validationError={validationError}
                    onSubmit={placeOrder}
                    isSubmitting={isSubmitting}
                    orderTotal={orderTotal}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* ── Clean Footer ────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>© 2026 Kinetic Labs Store · Engineered with React + Vite · Playwright Tested</p>
          <div className="footer-links">
            <span>Direct Checkout Demo</span>
            <span className="footer-bullet">•</span>
            <span>Zero External API Dependencies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
