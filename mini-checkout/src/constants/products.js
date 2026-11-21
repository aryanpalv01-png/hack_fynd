/**
 * PRODUCTS CATALOG
 * ----------------
 * 4 Curated Precision Hardware Products.
 * Preserves all original IDs (prod-mouse, prod-keyboard) for 100% test compatibility.
 */
export const PRODUCTS = [
  {
    id: 'prod-mouse',
    sku: 'KL-M01',
    name: 'Wireless Mouse',
    shortName: 'Mouse',
    category: 'Input',
    badge: 'Best Seller',
    originalPrice: 1299,
    price: 799,
    spec: '2.4 GHz Wireless · 58g Ultra-light · 16K DPI Optical',
    description: 'Precision ergonomic wireless mouse with honeycomb magnesium structure and 60-hour battery life.',
  },
  {
    id: 'prod-keyboard',
    sku: 'KL-K65',
    name: 'Mechanical Keyboard',
    shortName: 'Keyboard',
    category: 'Input',
    badge: 'Popular',
    originalPrice: 2199,
    price: 1499,
    spec: '65% Form Factor · Gateron Tactile · Hot-swappable',
    description: 'Aircraft-grade aluminum chassis with custom pre-lubed switches and double-shot PBT keycaps.',
  },
  {
    id: 'prod-headphones',
    sku: 'KL-H01',
    name: 'Studio Headphones',
    shortName: 'Headphones',
    category: 'Audio',
    badge: 'New Arrival',
    originalPrice: 3499,
    price: 2499,
    spec: 'Planar Magnetic · Open-Back · Detachable Braided Cable',
    description: 'High-resolution audiophile monitoring headphones with memory-foam ear cushions.',
  },
  {
    id: 'prod-deskmat',
    sku: 'KL-D90',
    name: 'Desk Mat Pro',
    shortName: 'Desk Mat',
    category: 'Accessories',
    badge: 'Essential',
    originalPrice: 899,
    price: 499,
    spec: '900 × 400 mm · Cordura Spill-Proof · Micro-stitched',
    description: 'Extended pro gaming and workstation desk pad with textured glide surface and anti-slip rubber base.',
  },
];

export const CATEGORIES = ['All', 'Input', 'Audio', 'Accessories'];

export const SHIPPING_COST = 0;
export const LOCALE = 'en-IN';
export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';
