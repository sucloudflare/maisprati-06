import React from 'react';
import { Sun, Moon, ShoppingCart, Store } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  cartCount: number;
}

export default function Navbar({ theme, onToggleTheme, cartCount }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          <Store size={24} />
          <span>TechStore</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="flex items-center justify-center w-10 h-10 border border-slate-200 dark:border-slate-600 rounded-xl bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="relative flex items-center justify-center w-10 h-10 border border-slate-200 dark:border-slate-600 rounded-xl bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full px-1"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}