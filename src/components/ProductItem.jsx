import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../App';

// Single product card used in the product list.
export default function ProductItem({ product, onAddToCart }) {
  const { showToast } = useToast();

  const handleAddClick = () => {
    onAddToCart(product);
    showToast('Added to cart');
  };

  // Simple visual-only MRP / discount calculation
  const price = Math.round(product.price);
  const mrp = price + 20;
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <article className="product-card">
      <div className="product-thumb-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-thumb"
          loading="lazy"
        />
      </div>

      <div className="product-body">
        {product.brand && (
          <p className="product-brand">{product.brand}</p>
        )}

        <h3 className="product-title">{product.title}</h3>
        <p className="product-pack">{product.category}</p>

        <div className="product-rating-row">
          <span className="product-rating-badge">
            ★ {product.rating.toFixed(1)}
          </span>
          <span className="product-rating-count">
            ({product.stock} in stock)
          </span>
        </div>

        <div className="product-price-row">
          <span className="product-price">${price}</span>
          <span className="product-mrp">${mrp}</span>
          <span className="product-offer">{discount}% off</span>
        </div>
      </div>

      <div className="product-footer">
        <button
          type="button"
          className="btn btn-primary btn-add-full"
          onClick={handleAddClick}
        >
          ADD
        </button>
        <Link to={`/products/${product.id}`} className="product-details-link">
          View details
        </Link>
      </div>
    </article>
  );
}