import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  const status = error?.status || 404;
  const message =
    error?.statusText || error?.message || 'The requested page was not found.';

  return (
    <section className="page page-404">
      <div className="page-404-inner">
        <h1 className="page-title">Something went wrong</h1>
        <p className="page-subtitle">
          Status: {status} – {message}
        </p>

        {/* DEBUG: show the raw error so we can understand the 404 on details */}
        <pre
          style={{
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            fontSize: '0.75rem',
            marginTop: '8px',
          }}
        >
          {JSON.stringify(error, null, 2)}
        </pre>

        <p className="muted-text">
          You can go back to the home page and continue shopping.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}