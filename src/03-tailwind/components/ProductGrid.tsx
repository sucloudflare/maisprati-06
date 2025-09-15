import React from 'react';
import ProductCard from './ProductCard';
import Skeleton from './Skeleton';
import { Product } from '../../data/products';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: () => void;
}

export default function ProductGrid({ products, loading, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
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