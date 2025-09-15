export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  tag: 'Novo' | 'Promo' | 'Bestseller' | 'Limited' | null;
  image: string;
  category: string;
  brand: string;
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  discount?: number;
  colors?: string[];
  sizes?: string[];
  isFavorite: boolean;
  isComparing: boolean;
  deliveryTime: string;
  freeShipping: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: '🏪', count: 24 },
  { id: 'smartphones', name: 'Smartphones', icon: '📱', count: 8 },
  { id: 'laptops', name: 'Notebooks', icon: '💻', count: 6 },
  { id: 'audio', name: 'Áudio', icon: '🎧', count: 4 },
  { id: 'wearables', name: 'Wearables', icon: '⌚', count: 3 },
  { id: 'cameras', name: 'Câmeras', icon: '📷', count: 3 }
];

export const brands: Brand[] = [
  { id: 'apple', name: 'Apple', logo: '🍎' },
  { id: 'samsung', name: 'Samsung', logo: '📱' },
  { id: 'sony', name: 'Sony', logo: '🎮' },
  { id: 'dell', name: 'Dell', logo: '💻' },
  { id: 'canon', name: 'Canon', logo: '📷' },
  { id: 'bose', name: 'Bose', logo: '🎵' }
];

export const products: Product[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max 256GB Titânio Natural',
    price: 8999.99,
    originalPrice: 9999.99,
    rating: 4.8,
    reviewCount: 2847,
    tag: 'Novo',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'smartphones',
    brand: 'apple',
    description: 'O iPhone mais avançado já criado, com chip A17 Pro, câmera de 48MP e design em titânio.',
    features: ['Chip A17 Pro', 'Câmera 48MP', 'Tela Super Retina XDR', '5G', 'Face ID'],
    inStock: true,
    stockCount: 15,
    discount: 10,
    colors: ['Titânio Natural', 'Titânio Azul', 'Titânio Branco', 'Titânio Preto'],
    sizes: ['128GB', '256GB', '512GB', '1TB'],
    isFavorite: false,
    isComparing: false,
    deliveryTime: '1-2 dias úteis',
    freeShipping: true
  },
  {
    id: 2,
    title: 'MacBook Pro 16" M3 Max 36GB RAM 1TB SSD',
    price: 24999.99,
    originalPrice: 27999.99,
    rating: 4.9,
    reviewCount: 1523,
    tag: 'Promo',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'laptops',
    brand: 'apple',
    description: 'MacBook Pro com chip M3 Max, ideal para profissionais criativos e desenvolvedores.',
    features: ['Chip M3 Max', '36GB RAM Unificada', 'Tela Liquid Retina XDR', 'Até 22h bateria'],
    inStock: true,
    stockCount: 8,
    discount: 11,
    colors: ['Cinza Espacial', 'Prata'],
    isFavorite: true,
    isComparing: false,
    deliveryTime: '2-3 dias úteis',
    freeShipping: true
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5 Headphone Noise Cancelling',
    price: 1899.99,
    rating: 4.7,
    reviewCount: 3241,
    tag: 'Bestseller',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'audio',
    brand: 'sony',
    description: 'Headphone premium com cancelamento de ruído líder da indústria e qualidade de som excepcional.',
    features: ['Cancelamento de Ruído', '30h de Bateria', 'Hi-Res Audio', 'Multipoint Connection'],
    inStock: true,
    stockCount: 23,
    colors: ['Preto', 'Prata'],
    isFavorite: false,
    isComparing: true,
    deliveryTime: '1-2 dias úteis',
    freeShipping: true
  },
  {
    id: 4,
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    price: 6999.99,
    rating: 4.6,
    reviewCount: 892,
    tag: 'Limited',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'wearables',
    brand: 'apple',
    description: 'O Apple Watch mais resistente e capaz, projetado para aventuras extremas.',
    features: ['Tela Always-On', 'GPS Dupla Frequência', 'Resistente à Água 100m', 'Bateria 36h'],
    inStock: true,
    stockCount: 5,
    colors: ['Titânio Natural', 'Titânio Azul'],
    isFavorite: true,
    isComparing: false,
    deliveryTime: '3-5 dias úteis',
    freeShipping: true
  },
  {
    id: 5,
    title: 'Canon EOS R5 Mirrorless 45MP + Lente RF 24-70mm',
    price: 18999.99,
    originalPrice: 21999.99,
    rating: 4.9,
    reviewCount: 567,
    tag: 'Promo',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'cameras',
    brand: 'canon',
    description: 'Câmera mirrorless profissional com sensor full-frame de 45MP e gravação 8K.',
    features: ['Sensor 45MP', 'Gravação 8K', 'IBIS 5-Axis', 'Dual Pixel CMOS AF II'],
    inStock: true,
    stockCount: 12,
    discount: 14,
    isFavorite: false,
    isComparing: false,
    deliveryTime: '2-4 dias úteis',
    freeShipping: true
  },
  {
    id: 6,
    title: 'iPad Pro 12.9" M2 WiFi + Cellular 1TB',
    price: 12999.99,
    rating: 4.8,
    reviewCount: 1834,
    tag: null,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'tablets',
    brand: 'apple',
    description: 'iPad Pro com chip M2, tela Liquid Retina XDR e conectividade 5G.',
    features: ['Chip M2', 'Tela Liquid Retina XDR', '5G', 'Apple Pencil 2ª geração'],
    inStock: true,
    stockCount: 18,
    colors: ['Cinza Espacial', 'Prata'],
    sizes: ['128GB', '256GB', '512GB', '1TB', '2TB'],
    isFavorite: false,
    isComparing: false,
    deliveryTime: '1-3 dias úteis',
    freeShipping: true
  },
  {
    id: 7,
    title: 'Samsung Galaxy S24 Ultra 512GB Titânio Violeta',
    price: 7499.99,
    originalPrice: 8299.99,
    rating: 4.7,
    reviewCount: 2156,
    tag: 'Novo',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'smartphones',
    brand: 'samsung',
    description: 'Galaxy S24 Ultra com S Pen integrada, câmera de 200MP e IA avançada.',
    features: ['Câmera 200MP', 'S Pen', 'Snapdragon 8 Gen 3', 'Tela Dynamic AMOLED 2X'],
    inStock: true,
    stockCount: 22,
    discount: 10,
    colors: ['Titânio Violeta', 'Titânio Preto', 'Titânio Amarelo', 'Titânio Cinza'],
    isFavorite: true,
    isComparing: true,
    deliveryTime: '1-2 dias úteis',
    freeShipping: true
  },
  {
    id: 8,
    title: 'Dell XPS 15 OLED i9 32GB RTX 4070 1TB',
    price: 16999.99,
    rating: 4.6,
    reviewCount: 743,
    tag: 'Bestseller',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'laptops',
    brand: 'dell',
    description: 'Notebook premium para criadores com tela OLED 4K e placa de vídeo RTX 4070.',
    features: ['Intel i9-13900H', 'RTX 4070', 'Tela OLED 4K', '32GB RAM', 'Thunderbolt 4'],
    inStock: true,
    stockCount: 9,
    colors: ['Prata', 'Preto'],
    isFavorite: false,
    isComparing: false,
    deliveryTime: '3-5 dias úteis',
    freeShipping: true
  },
  {
    id: 9,
    title: 'Bose QuietComfort Ultra Earbuds',
    price: 1699.99,
    originalPrice: 1899.99,
    rating: 4.5,
    reviewCount: 1287,
    tag: 'Promo',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'audio',
    brand: 'bose',
    description: 'Fones de ouvido true wireless com cancelamento de ruído imersivo.',
    features: ['Cancelamento de Ruído', 'Áudio Espacial', '6h + 18h bateria', 'IPX4'],
    inStock: true,
    stockCount: 31,
    discount: 11,
    colors: ['Preto', 'Branco Fumaça', 'Azul Meia-noite'],
    isFavorite: false,
    isComparing: false,
    deliveryTime: '1-2 dias úteis',
    freeShipping: true
  },
  {
    id: 10,
    title: 'Samsung Galaxy Watch6 Classic 47mm LTE',
    price: 2299.99,
    rating: 4.4,
    reviewCount: 654,
    tag: null,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'wearables',
    brand: 'samsung',
    description: 'Smartwatch premium com design clássico e recursos avançados de saúde.',
    features: ['Tela Super AMOLED', 'Sensor BioActive', 'GPS + LTE', 'Wear OS'],
    inStock: true,
    stockCount: 17,
    colors: ['Preto', 'Prata'],
    isFavorite: false,
    isComparing: false,
    deliveryTime: '2-3 dias úteis',
    freeShipping: true
  },
  {
    id: 11,
    title: 'Sony Alpha A7 IV Mirrorless 33MP Kit 28-70mm',
    price: 14999.99,
    originalPrice: 16999.99,
    rating: 4.8,
    reviewCount: 423,
    tag: 'Limited',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'cameras',
    brand: 'sony',
    description: 'Câmera mirrorless versátil com sensor full-frame de 33MP e gravação 4K.',
    features: ['Sensor 33MP', 'Gravação 4K 60p', 'IBIS 5.5-stop', 'Real-time Eye AF'],
    inStock: false,
    stockCount: 0,
    discount: 12,
    isFavorite: true,
    isComparing: false,
    deliveryTime: '7-10 dias úteis',
    freeShipping: true
  },
  {
    id: 12,
    title: 'MacBook Air 15" M3 16GB 512GB SSD',
    price: 12999.99,
    rating: 4.7,
    reviewCount: 987,
    tag: 'Novo',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400',
    category: 'laptops',
    brand: 'apple',
    description: 'MacBook Air de 15 polegadas com chip M3, design ultrafino e bateria de longa duração.',
    features: ['Chip M3', 'Tela Liquid Retina', 'Até 18h bateria', 'MagSafe 3'],
    inStock: true,
    stockCount: 14,
    colors: ['Cinza Espacial', 'Prata', 'Azul Meia-noite', 'Luz Estelar'],
    isFavorite: false,
    isComparing: false,
    deliveryTime: '1-3 dias úteis',
    freeShipping: true
  }
];

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'all') return products;
  return products.filter(product => product.category === categoryId);
};

export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter(product => product.brand === brandId);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case 'discount':
      return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default:
      return sorted;
  }
};

export const filterProducts = (
  products: Product[], 
  filters: {
    priceRange?: [number, number];
    rating?: number;
    inStock?: boolean;
    freeShipping?: boolean;
    brands?: string[];
    hasDiscount?: boolean;
  }
): Product[] => {
  return products.filter(product => {
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.inStock && !product.inStock) return false;
    if (filters.freeShipping && !product.freeShipping) return false;
    if (filters.hasDiscount && !product.discount) return false;
    
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(product.brand)) return false;
    }
    
    return true;
  });
};