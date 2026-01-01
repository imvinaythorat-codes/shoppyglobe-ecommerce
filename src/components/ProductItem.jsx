import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../App';

// Single product card; receives data via props from ProductList.
export default function ProductItem({ product, onAddToCart }) {
  const { showToast } = useToast();

  const handleAddClick = () => {
    onAddToCart(product);
    showToast('Added to cart');
  };

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

      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <p className="product-mini">{product.category}</p>

      <div className="product-actions">
        <Link to={`/products/${product.id}`} className="btn btn-secondary">
          Details
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddClick}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}