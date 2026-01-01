import React from 'react';

// Single line item in the cart.
export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="cart-item">
      <div className="cart-thumb-wrap">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cart-thumb"
          loading="lazy"
        />
      </div>

      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">
          ${item.price} × {item.quantity} = $
          {(item.price * item.quantity).toFixed(2)}
        </p>

        <div className="cart-item-controls">
          <button
            type="button"
            className="btn-qty"
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity === 1}
          >
            −
          </button>
          <span className="cart-item-qty">{item.quantity}</span>
          <button
            type="button"
            className="btn-qty"
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>
          <button
            type="button"
            className="btn-link"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}