import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from './Button';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    setTimeout(() => {
      onAddToCart();
      setLoading(false);
    }, 500);
  };

  return (
    <article className="group relative flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-slate-900/20 hover:border-slate-300 dark:hover:border-slate-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800">
      <div className="relative aspect-square bg-slate-50 dark:bg-slate-700 overflow-hidden">
        <img 
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        {product.tag && (
          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium text-white rounded-lg uppercase tracking-wider ${
            product.tag === 'Novo' 
              ? 'bg-emerald-500' 
              : 'bg-amber-500'
          }`}>
            {product.tag}
          </span>
        )}
      </div>
      
      <div className="flex-1 flex flex-col p-6 gap-4">
        <h3 
          className="font-medium text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug"
          title={product.title}
        >
          {product.title}
        </h3>
        
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
        
        <div 
          className="flex items-center gap-1 text-slate-600 dark:text-slate-400"
          aria-label={`Rating: ${product.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index}
              size={16}
              className={`${
                index < Math.floor(product.rating) 
                  ? 'text-amber-400 fill-current' 
                  : 'text-slate-300 dark:text-slate-600'
              }`}
            />
          ))}
          <span className="text-sm ml-1">({product.rating})</span>
        </div>
        
        <Button 
          variant="solid"
          onClick={handleAddToCart}
          disabled={loading}
          loading={loading}
        >
          Adicionar
        </Button>
      </div>
    </article>
  );
}