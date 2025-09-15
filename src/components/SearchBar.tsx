import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useAppContext } from '../context/AppContext';
import { searchProducts } from '../data/products';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = debouncedQuery ? searchProducts(debouncedQuery).slice(0, 5) : [];
  const trendingSearches = ['iPhone 15', 'MacBook Pro', 'AirPods', 'iPad', 'Apple Watch'];

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsOpen(false);
    dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: searchQuery });
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar produtos..."
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {query ? (
            <>
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 px-3 py-2">
                    Produtos
                  </div>
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearch(product.title)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                          {product.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="p-2">
              {state.searchHistory.length > 0 && (
                <>
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      Buscas recentes
                    </div>
                    <button
                      onClick={() => dispatch({ type: 'CLEAR_SEARCH_HISTORY' })}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Limpar
                    </button>
                  </div>
                  {state.searchHistory.map((historyQuery, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(historyQuery)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Clock size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-900 dark:text-slate-100">
                        {historyQuery}
                      </span>
                    </button>
                  ))}
                  <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                </>
              )}
              
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 px-3 py-2 flex items-center gap-1">
                <TrendingUp size={12} />
                Tendências
              </div>
              {trendingSearches.map((trending, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(trending)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <TrendingUp size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-900 dark:text-slate-100">
                    {trending}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}