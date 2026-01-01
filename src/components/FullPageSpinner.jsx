import React from 'react';
// Simple full-page spinner component used as a fallback during lazy loading.
export default function FullPageSpinner() {
  return (
    <div className="spinner-fullpage">
      <div className="spinner-dot" />
      <p>Loading...</p>
    </div>
  );
}