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
    <article className="css-global-product-card">
      <div className="css-global-product-image-container">
        <img 
          src={product.image}
          alt={product.title}
          className="css-global-product-image"
          loading="lazy"
        />
        {product.tag && (
          <span className={`css-global-product-tag css-global-product-tag--${product.tag.toLowerCase()}`}>
            {product.tag}
          </span>
        )}
      </div>
      
      <div className="css-global-product-content">
        <h3 className="css-global-product-title" title={product.title}>
          {product.title}
        </h3>
        
        <div className="css-global-product-price">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
        
        <div className="css-global-product-rating" aria-label={`Rating: ${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index}
              size={16}
              className={index < Math.floor(product.rating) ? 'css-global-star--filled' : 'css-global-star--empty'}
            />
          ))}
          <span className="css-global-rating-text">({product.rating})</span>
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