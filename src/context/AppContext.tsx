import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface AppState {
  cart: CartItem[];
  favorites: number[];
  comparing: number[];
  recentlyViewed: number[];
  searchHistory: string[];
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity?: number; color?: string; size?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: number }
  | { type: 'TOGGLE_COMPARE'; payload: number }
  | { type: 'CLEAR_COMPARE' }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: number }
  | { type: 'ADD_TO_SEARCH_HISTORY'; payload: string }
  | { type: 'CLEAR_SEARCH_HISTORY' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

const initialState: AppState = {
  cart: [],
  favorites: [],
  comparing: [],
  recentlyViewed: [],
  searchHistory: [],
  notifications: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1, color, size } = action.payload;
      const existingItem = state.cart.find(
        item => item.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === product.id && 
            item.selectedColor === color && 
            item.selectedSize === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, quantity, selectedColor: color, selectedSize: size }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'TOGGLE_FAVORITE': {
      const productId = action.payload;
      const isFavorite = state.favorites.includes(productId);
      
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId]
      };
    }

    case 'TOGGLE_COMPARE': {
      const productId = action.payload;
      const isComparing = state.comparing.includes(productId);
      
      if (isComparing) {
        return {
          ...state,
          comparing: state.comparing.filter(id => id !== productId)
        };
      }
      
      if (state.comparing.length >= 4) {
        return state; // Max 4 items for comparison
      }
      
      return {
        ...state,
        comparing: [...state.comparing, productId]
      };
    }

    case 'CLEAR_COMPARE':
      return {
        ...state,
        comparing: []
      };

    case 'ADD_TO_RECENTLY_VIEWED': {
      const productId = action.payload;
      const filtered = state.recentlyViewed.filter(id => id !== productId);
      
      return {
        ...state,
        recentlyViewed: [productId, ...filtered].slice(0, 10) // Keep last 10
      };
    }

    case 'ADD_TO_SEARCH_HISTORY': {
      const query = action.payload.trim();
      if (!query) return state;
      
      const filtered = state.searchHistory.filter(q => q !== query);
      
      return {
        ...state,
        searchHistory: [query, ...filtered].slice(0, 10) // Keep last 10
      };
    }

    case 'CLEAR_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: []
      };

    case 'ADD_NOTIFICATION': {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false
      };
      
      return {
        ...state,
        notifications: [notification, ...state.notifications].slice(0, 50) // Keep last 50
      };
    }

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}