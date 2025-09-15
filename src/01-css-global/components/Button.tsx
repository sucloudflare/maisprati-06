import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'solid',
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`css-global-button css-global-button--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading && <Loader2 size={16} className="css-global-button-spinner" />}
      {children}
    </button>
  );
}