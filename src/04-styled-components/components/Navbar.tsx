import React from 'react';
import { Sun, Moon, ShoppingCart, Store } from 'lucide-react';
import {
  NavbarContainer,
  NavbarContent,
  Logo,
  Actions,
  IconButton,
  CartBadge
} from './Navbar.styles';

interface NavbarProps {
  onToggleTheme: () => void;
  cartCount: number;
  isDark: boolean;
}

export default function Navbar({ onToggleTheme, cartCount, isDark }: NavbarProps) {
  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo>
          <Store size={24} />
          <span>TechStore</span>
        </Logo>
        
        <Actions>
          <IconButton 
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
          
          <IconButton aria-label="Shopping cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <CartBadge aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </CartBadge>
            )}
          </IconButton>
        </Actions>
      </NavbarContent>
    </NavbarContainer>
  );
}