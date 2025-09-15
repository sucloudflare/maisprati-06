import React from 'react';
import Toast from './Toast';
import { useAppContext } from '../context/AppContext';

export default function ToastContainer() {
  const { state, dispatch } = useAppContext();

  const handleClose = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
    // Remove after animation
    setTimeout(() => {
      // In a real app, you'd have a separate action to remove notifications
    }, 300);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications
        .filter(notification => !notification.read)
        .slice(0, 5)
        .map((notification) => (
          <Toast
            key={notification.id}
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={handleClose}
          />
        ))}
    </div>
  );
}