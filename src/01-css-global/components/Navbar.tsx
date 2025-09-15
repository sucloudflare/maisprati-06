import React from 'react';
import { Sun, Moon, ShoppingCart, Store } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  cartCount: number;
}

export default function Navbar({ theme, onToggleTheme, cartCount }: NavbarProps) {
  return (
    <nav className="css-global-navbar">
      <div className="css-global-navbar-container">
        <div className="css-global-navbar-logo">
          <Store size={24} />
          <span>TechStore</span>
        </div>
        
        <div className="css-global-navbar-actions">
          <button 
            className="css-global-theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button className="css-global-cart-button" aria-label="Shopping cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="css-global-cart-badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}