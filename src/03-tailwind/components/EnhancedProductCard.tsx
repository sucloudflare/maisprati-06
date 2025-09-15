import React, { useState } from 'react';
import { 
  Star, Heart, BarChart3, ShoppingCart, Eye, Truck, 
  Package, Clock, Zap, Award, Tag as TagIcon 
} from 'lucide-react';
import Button from './Button';
import { Product } from '../../data/products';
import { useAppContext } from '../../context/AppContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface EnhancedProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onQuickView?: (product: Product) => void;
}

export default function EnhancedProductCard({ product, onAddToCart, onQuickView }: EnhancedProductCardProps) {
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { state, dispatch } = useAppContext();
  const { targetRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const isFavorite = state.favorites.includes(product.id);
  const isComparing = state.comparing.includes(product.id);

  const handleAddToCart = async () => {
    setLoading(true);
    setTimeout(() => {
      onAddToCart();
      dispatch({
        type: 'ADD_TO_CART',
        payload: { product }
      });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'success',
          title: 'Produto adicionado!',
          message: `${product.title} foi adicionado ao carrinho.`
        }
      });
      setLoading(false);
    }, 500);
  };

  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.id });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'info',
        title: isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
        message: `${product.title} ${isFavorite ? 'foi removido dos' : 'foi adicionado aos'} favoritos.`
      }
    });
  };

  const handleToggleCompare = () => {
    if (state.comparing.length >= 4 && !isComparing) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'warning',
          title: 'Limite atingido',
          message: 'Você pode comparar no máximo 4 produtos.'
        }
      });
      return;
    }

    dispatch({ type: 'TOGGLE_COMPARE', payload: product.id });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        type: 'info',
        title: isComparing ? 'Removido da comparação' : 'Adicionado à comparação',
        message: `${product.title} ${isComparing ? 'foi removido da' : 'foi adicionado à'} comparação.`
      }
    });
  };

  const handleQuickView = () => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product.id });
    onQuickView?.(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <article 
      ref={targetRef}
      className="group relative flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-slate-900/30 hover:border-slate-300 dark:hover:border-slate-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-50 dark:bg-slate-700 overflow-hidden">
        {hasIntersected && (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
            )}
            <img 
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tag && (
            <span className={`px-2 py-1 text-xs font-bold text-white rounded-lg uppercase tracking-wider shadow-lg ${
              product.tag === 'Novo' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
              product.tag === 'Promo' ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
              product.tag === 'Bestseller' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
              'bg-gradient-to-r from-red-500 to-red-600'
            }`}>
              {product.tag === 'Bestseller' ? (
                <div className="flex items-center gap-1">
                  <Award size={10} />
                  {product.tag}
                </div>
              ) : (
                product.tag
              )}
            </span>
          )}
          
          {discountPercentage && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
              <TagIcon size={10} />
              -{discountPercentage}%
            </span>
          )}

          {!product.inStock && (
            <span className="bg-slate-500 text-white px-2 py-1 text-xs font-medium rounded-lg">
              Esgotado
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
              isFavorite 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:bg-pink-500 hover:text-white'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
          </button>

          <button
            onClick={handleToggleCompare}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
              isComparing 
                ? 'bg-amber-500 text-white' 
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:bg-amber-500 hover:text-white'
            }`}
            aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            <BarChart3 size={16} />
          </button>

          <button
            onClick={handleQuickView}
            className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white rounded-full shadow-lg transition-all duration-200"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Stock indicator */}
        {product.inStock && product.stockCount <= 5 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded-lg flex items-center gap-1">
              <Zap size={10} />
              Últimas {product.stockCount} unidades
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col p-6 gap-4">
        {/* Brand */}
        <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          {product.brand}
        </div>

        {/* Title */}
        <h3 
          className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index}
              className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1">
              +{product.features.length - 2} mais
            </span>
          )}
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>
          {product.originalPrice && (
            <div className="text-sm text-slate-500 dark:text-slate-400 line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </div>
          )}
        </div>
        
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-1"
            aria-label={`Rating: ${product.rating} out of 5 stars`}
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index}
                  size={14}
                  className={`${
                    index < Math.floor(product.rating) 
                      ? 'text-amber-400 fill-current' 
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {product.rating}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          {product.freeShipping && (
            <div className="flex items-center gap-1">
              <Truck size={12} className="text-green-500" />
              <span>Frete grátis</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{product.deliveryTime}</span>
          </div>
          {product.inStock && (
            <div className="flex items-center gap-1">
              <Package size={12} className="text-green-500" />
              <span>Em estoque</span>
            </div>
          )}
        </div>
        
        {/* Add to cart button */}
        <Button 
          variant="solid"
          onClick={handleAddToCart}
          disabled={loading || !product.inStock}
          loading={loading}
          className="w-full"
        >
          <ShoppingCart size={16} />
          {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
        </Button>
      </div>
    </article>
  );
}