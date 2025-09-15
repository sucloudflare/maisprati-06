import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import { products, delay } from '../data/products';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles, AppContainer } from './styles';

export default function StyledComponentsApp() {
  const [isDark, setIsDark] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [productsData, setProductsData] = useState<typeof products>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-styled-components');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-styled-components', isDark ? 'dark' : 'light');
  }, [isDark]);

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
    setIsDark(prev => !prev);
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        <Navbar 
          onToggleTheme={toggleTheme} 
          cartCount={cartCount}
          isDark={isDark}
        />
        <main>
          <ProductGrid 
            products={productsData}
            loading={loading}
            onAddToCart={addToCart}
          />
        </main>
      </AppContainer>
    </ThemeProvider>
  );
}