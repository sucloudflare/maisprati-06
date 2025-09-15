import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import { products, delay } from '../data/products';

export default function TailwindApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartCount, setCartCount] = useState(0);
  const [productsData, setProductsData] = useState<typeof products>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-tailwind') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-tailwind', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        cartCount={cartCount} 
      />
      <main className="pt-20 max-w-7xl mx-auto px-4 pb-12">
        <ProductGrid 
          products={productsData}
          loading={loading}
          onAddToCart={addToCart}
        />
      </main>
    </div>
  );
}