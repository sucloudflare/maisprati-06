import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from './Button';
import { Product } from '../../data/products';
import styles from './ProductCard.module.css';

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
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
        {product.tag && (
          <span className={`${styles.tag} ${styles[`tag${product.tag}`]}`}>
            {product.tag}
          </span>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>
        
        <div className={styles.price}>
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
        
        <div className={styles.rating} aria-label={`Rating: ${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index}
              size={16}
              className={index < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
            />
          ))}
          <span className={styles.ratingText}>({product.rating})</span>
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