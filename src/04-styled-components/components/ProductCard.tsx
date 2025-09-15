import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Button from './Button';
import { Product } from '../../data/products';
import {
  CardContainer,
  ImageContainer,
  ProductImage,
  ProductTag,
  Content,
  Title,
  Price,
  Rating,
  RatingText
} from './ProductCard.styles';

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
    <CardContainer>
      <ImageContainer>
        <ProductImage 
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
        {product.tag && (
          <ProductTag $variant={product.tag.toLowerCase() as 'novo' | 'promo'}>
            {product.tag}
          </ProductTag>
        )}
      </ImageContainer>
      
      <Content>
        <Title title={product.title}>
          {product.title}
        </Title>
        
        <Price>
          R$ {product.price.toFixed(2).replace('.', ',')}
        </Price>
        
        <Rating aria-label={`Rating: ${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index}
              size={16}
              style={{
                color: index < Math.floor(product.rating) ? '#f59e0b' : '#94a3b8',
                fill: index < Math.floor(product.rating) ? 'currentColor' : 'none'
              }}
            />
          ))}
          <RatingText>({product.rating})</RatingText>
        </Rating>
        
        <Button 
          variant="solid"
          onClick={handleAddToCart}
          disabled={loading}
          loading={loading}
        >
          Adicionar
        </Button>
      </Content>
    </CardContainer>
  );
}