import React, { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Toast from './components/Toast';
import OffersTicker from './components/OffersTicker';

// Simple context so any component can trigger a toast.
const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export default function App() {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
    // Auto-hide after 1.5s
    setTimeout(() => {
      setToast((current) =>
        current.visible ? { ...current, visible: false } : current
      );
    }, 1500);
  };

  const hideToast = () =>
    setToast((current) => ({ ...current, visible: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="app-shell">
        <Header />
        <OffersTicker />
        <main className="app-main">
          <Outlet />
        </main>
        <Toast
          message={toast.message}
          visible={toast.visible}
          onClose={hideToast}
        />
      </div>
    </ToastContext.Provider>
  );
}