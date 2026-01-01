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