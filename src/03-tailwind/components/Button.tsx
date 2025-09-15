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
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium rounded-lg transition-all duration-150 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variantStyles = {
    solid: "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md",
    outline: "border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-md",
    ghost: "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 hover:-translate-y-0.5"
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}