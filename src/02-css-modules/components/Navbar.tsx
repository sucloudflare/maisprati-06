import React from 'react';
import { Sun, Moon, ShoppingCart, Store } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  cartCount: number;
}

export default function Navbar({ theme, onToggleTheme, cartCount }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Store size={24} />
          <span>TechStore</span>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button className={styles.cartButton} aria-label="Shopping cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className={styles.cartBadge} aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}