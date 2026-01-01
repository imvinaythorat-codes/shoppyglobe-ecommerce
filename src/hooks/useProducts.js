import { useEffect, useState } from 'react';

// Small custom hook used by ProductList to fetch all products from the API.
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://dummyjson.com/products');

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        // API returns { products: [...] }
        if (isMounted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch products.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}