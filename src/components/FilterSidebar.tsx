import React, { useState } from 'react';
import { Filter, X, Star, Truck, Tag, Package } from 'lucide-react';
import { brands, categories } from '../data/products';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    priceRange: [number, number];
    rating: number;
    inStock: boolean;
    freeShipping: boolean;
    brands: string[];
    hasDiscount: boolean;
    categories: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export default function FilterSidebar({ isOpen, onClose, filters, onFiltersChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = localFilters[key as keyof typeof localFilters] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 30000] as [number, number],
      rating: 0,
      inStock: false,
      freeShipping: false,
      brands: [],
      hasDiscount: false,
      categories: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(localFilters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length;
    if (typeof value === 'boolean') return count + (value ? 1 : 0);
    if (typeof value === 'number' && value > 0) return count + 1;
    return count;
  }, 0) - (localFilters.priceRange[0] === 0 && localFilters.priceRange[1] === 30000 ? 0 : 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-white dark:bg-slate-800 
        border-r border-slate-200 dark:border-slate-700 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600 dark:text-slate-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Filtros
              </h2>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Limpar
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
              Faixa de Preço
            </h3>
            <div className="space-y-3">
              <div>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="100"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => updateFilter('priceRange', [Number(e.target.value), localFilters.priceRange[1]])}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>R$ {localFilters.priceRange[0].toLocaleString()}</span>
                  <span>R$ {localFilters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="100"
                value={localFilters.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [localFilters.priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
              Categorias
            </h3>
            <div className="space-y-2">
              {categories.filter(cat => cat.id !== 'all').map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.categories.includes(category.id)}
                    onChange={() => toggleArrayFilter('categories', category.id)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.name}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      ({category.count})
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
              Marcas
            </h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.brands.includes(brand.id)}
                    onChange={() => toggleArrayFilter('brands', brand.id)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span>{brand.logo}</span>
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-3">
              Avaliação Mínima
            </h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={localFilters.rating === rating}
                    onChange={() => updateFilter('rating', rating)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className={index < rating ? 'text-amber-400 fill-current' : 'text-slate-300 dark:text-slate-600'}
                      />
                    ))}
                    <span className="text-sm text-slate-700 dark:text-slate-300 ml-1">
                      {rating}+ estrelas
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Filtros Rápidos
            </h3>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <Package size={16} className="text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Apenas em estoque
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.freeShipping}
                onChange={(e) => updateFilter('freeShipping', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <Truck size={16} className="text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Frete grátis
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.hasDiscount}
                onChange={(e) => updateFilter('hasDiscount', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <Tag size={16} className="text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Com desconto
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}