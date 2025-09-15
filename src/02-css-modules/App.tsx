import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import { products, delay } from '../data/products';
import styles from './App.module.css';

export default function CssModulesApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [productsData, setProductsData] = useState<typeof products>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-css-modules') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-css-modules', theme);
    document.documentElement.setAttribute('data-theme-modules', theme);
  }, [theme]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await delay(1500);
      setProductsData(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className={styles.app}>
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        cartCount={cartCount} 
      />
      <main className={styles.main}>
        <ProductGrid 
          products={productsData}
          loading={loading}
          onAddToCart={addToCart}
        />
      </main>
    </div>
  );
}