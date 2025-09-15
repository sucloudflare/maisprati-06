import React, { useState } from 'react';
import { 
  Sun, Moon, ShoppingCart, Store, Bell, User, Menu, X, 
  Heart, BarChart3, Search, Settings 
} from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import { useAppContext } from '../../context/AppContext';

interface EnhancedNavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSearch: (query: string) => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export default function EnhancedNavbar({ 
  theme, 
  onToggleTheme, 
  onSearch, 
  onToggleMobileMenu,
  isMobileMenuOpen 
}: EnhancedNavbarProps) {
  const { state } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = state.favorites.length;
  const comparingCount = state.comparing.length;
  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Store size={20} className="text-white" />
              </div>
              <span className="hidden sm:block">TechStore</span>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Mobile search button */}
            <button className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Search size={20} />
            </button>

            {/* Theme toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </button>

            {/* Favorites */}
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Compare */}
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <BarChart3 size={20} />
              {comparingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  {comparingCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
                    <User size={16} />
                    Minha Conta
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
                    <Settings size={16} />
                    Configurações
                  </a>
                  <hr className="my-1 border-slate-200 dark:border-slate-700" />
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-red-600 dark:text-red-400">
                    Sair
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
}