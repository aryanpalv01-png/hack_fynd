import React, { useState } from 'react';
import { MouseSVG, KeyboardSVG, HeadphonesSVG, DeskMatSVG } from './ProductIllustrations';
import { formatCurrency } from '@/utils/currency';
import { Plus, Check } from 'lucide-react';

const SVG_MAP = {
  'prod-mouse': MouseSVG,
  'prod-keyboard': KeyboardSVG,
  'prod-headphones': HeadphonesSVG,
  'prod-deskmat': DeskMatSVG,
};

/**
 * ProductCard
 * -----------
 * High-end hardware card with category badge, original vs discount price,
 * vector blueprint art, and micro-interaction add feedback.
 */
export function ProductCard({ product, onAdd, disabled }) {
  const [justAdded, setJustAdded] = useState(false);
  const Illustration = SVG_MAP[product.id] || MouseSVG;

  const handleAddClick = () => {
    onAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article className="product-card" aria-label={`Product: ${product.name}`}>
      {/* Framed vector illustration */}
      <div className="product-illustration-frame">
        <span className="product-badge">{product.badge}</span>
        <Illustration />
      </div>

      {/* Product details */}
      <div className="product-info">
        <div className="product-meta-header">
          <span className="product-sku">{product.sku}</span>
          <span className="product-category-pill">{product.category}</span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-spec">{product.spec}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="price-stack">
            {product.originalPrice && (
              <span className="original-price tabular">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="product-price tabular" data-testid={`price-${product.id}`}>
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            className={`btn btn-add-to-cart ${justAdded ? 'btn-add-to-cart--success' : ''}`}
            data-testid={`add-${product.id}`}
            onClick={handleAddClick}
            disabled={disabled}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check size={16} strokeWidth={2.5} className="btn-icon check-icon" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={16} strokeWidth={2.5} className="btn-icon" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
