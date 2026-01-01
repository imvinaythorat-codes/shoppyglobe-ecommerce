import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from '../store/cartSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      setMessage('Please fill in all fields.');
      return;
    }

    setMessage('Order placed! Redirecting back to home...');
    dispatch(clearCart());

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <section className="page page-checkout">
      <header className="page-header">
        <h1 className="page-title">Checkout</h1>
      </header>

      <div className="checkout-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className="form-input form-textarea"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {message && <p className="muted-text">{message}</p>}

          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          {items.length === 0 ? (
            <p className="muted-text">Your cart is empty.</p>
          ) : (
            <>
              <ul className="checkout-list">
                {items.map((item) => (
                  <li key={item.id}>
                    {item.title} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="cart-total">
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}