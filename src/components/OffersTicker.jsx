import React from 'react';

const messages = [
  '🔥 New Year Sale: Up to 40% off on electronics',
  '🚚 Free shipping on orders above $99',
  '⭐ Extra 10% off for first-time ShoppyGlobe users',
  '🎁 Buy 2 get 1 free on selected fashion items',
];

export default function OffersTicker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {messages.concat(messages).map((msg, index) => (
          <span key={index} className="ticker-item">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}