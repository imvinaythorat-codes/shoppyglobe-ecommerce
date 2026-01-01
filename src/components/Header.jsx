import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice';

export default function Header() {
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <header className="header">
      <div
        className="header-left"
        onClick={() => navigate('/')}
        role="button"
      >
        <span className="logo-dot" />
        <span className="logo-text">ShoppyGlobe</span>
      </div>

      <nav className="header-nav">
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>
        <NavLink to="/cart" className={navClass}>
          Cart
        </NavLink>
        <NavLink to="/checkout" className={navClass}>
          Checkout
        </NavLink>
        <button
          type="button"
          className="cart-icon"
          onClick={() => navigate('/cart')}
        >
          <span className="cart-icon-badge">{cartCount}</span>
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </nav>
    </header>
  );
}