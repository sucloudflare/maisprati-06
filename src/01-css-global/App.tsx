import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import { products, delay } from '../data/products';
import './styles/global.css';

export default function CssGlobalApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [productsData, setProductsData] = useState<typeof products>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme-css-global') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply to document
    localStorage.setItem('theme-css-global', theme);
    document.documentElement.setAttribute('data-theme-global', theme);
  }, [theme]);

  useEffect(() => {
    // Simulate loading delay
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
    <div className="css-global-app">
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        cartCount={cartCount} 
      />
      <main className="css-global-main">
        <ProductGrid 
          products={productsData}
          loading={loading}
          onAddToCart={addToCart}
        />
      </main>
    </div>
  );
}