import React from 'react';

export default function Toast({ message, visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="toast-wrapper" onClick={onClose}>
      <div className="toast">
        <span>{message}</span>
      </div>
    </div>
  );
}