import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../store/cartSlice';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

// Shows all items currently in the cart along with the running total.
export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleIncrease = (id) => dispatch(increaseQuantity(id));
  const handleDecrease = (id) => dispatch(decreaseQuantity(id));
  const handleRemove = (id) => dispatch(removeFromCart(id));

  return (
    <section className="page page-cart">
      <header className="page-header">
        <h1 className="page-title">Your Cart</h1>
      </header>

      {items.length === 0 ? (
        <p className="muted-text">
          Your cart is empty. Browse the <Link to="/">products</Link> to
          add some items.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="cart-summary">
            <p className="cart-total">
              Total: <strong>${total.toFixed(2)}</strong>
            </p>
            <Link to="/checkout" className="btn btn-primary">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}