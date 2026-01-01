import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://dummyjson.com/products/${productId}`);

        if (!res.ok) {
          throw new Error(`Product not found (status ${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch product.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <section className="page">
        <p>Loading product details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <p className="error-text">Error: {error}</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page">
        <p className="error-text">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="page page-detail">
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="detail-image"
            loading="lazy"
          />
        </div>

        <div className="detail-main">
          <h1 className="page-title">{product.title}</h1>
          <p className="page-subtitle">{product.brand}</p>

          <p className="detail-price">${product.price}</p>
          <p className="detail-desc">{product.description}</p>

          <p className="detail-meta">
            <span>Category: {product.category}</span>
            <span>Rating: {product.rating}</span>
            <span>Stock: {product.stock}</span>
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}