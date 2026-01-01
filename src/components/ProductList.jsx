import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { addToCart } from '../store/cartSlice';
import {
  selectSearchTerm,
  setSearchTerm,
} from '../store/productsSlice';
import ProductItem from './ProductItem';

export default function ProductList() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const { products, loading, error } = useProducts();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const filteredProducts = products.filter((product) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  return (
    <section className="page page-products">
      <header className="page-header">
        <h1 className="page-title">Products</h1>
        <p className="page-subtitle">
          Browse items from the ShoppyGlobe catalogue and add them to your cart.
        </p>
      </header>

      <div className="toolbar">
        <div className="toolbar-right">
          <label htmlFor="search" className="search-label">
            Search
          </label>
          <input
            id="search"
            type="text"
            className="search-input"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="muted-text">No products match this search.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}