import React from 'react';
import ProductCard from './ProductCard';
import Skeleton from './Skeleton';
import { Product } from '../../data/products';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: () => void;
}

export default function ProductGrid({ products, loading, onAddToCart }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} />
        ))
      ) : (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={onAddToCart}
          />
        ))
      )}
    </div>
  );
}