import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Grid, List, ArrowUp } from 'lucide-react';
import EnhancedNavbar from './components/EnhancedNavbar';
import EnhancedProductCard from './components/EnhancedProductCard';
import Skeleton from './components/Skeleton';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import CategoryTabs from '../components/CategoryTabs';
import ToastContainer from '../components/ToastContainer';
import { 
  products, 
  delay, 
  getProductsByCategory, 
  searchProducts, 
  sortProducts, 
  filterProducts,
  Product 
} from '../data/products';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { AppProvider } from '../context/AppContext';

function EnhancedAppContent() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme-tailwind-enhanced', 'light');
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 30000] as [number, number],
    rating: 0,
    inStock: false,
    freeShipping: false,
    brands: [] as string[],
    hasDiscount: false,
    categories: [] as string[]
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Apply theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await delay(1500);
      setProductsData(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search
    if (debouncedSearchQuery) {
      filtered = searchProducts(debouncedSearchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = getProductsByCategory(selectedCategory);
    }

    // Apply filters
    filtered = filterProducts(filtered, {
      priceRange: filters.priceRange,
      rating: filters.rating,
      inStock: filters.inStock,
      freeShipping: filters.freeShipping,
      brands: filters.brands,
      hasDiscount: filters.hasDiscount
    });

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Apply sorting
    return sortProducts(filtered, sortBy);
  }, [debouncedSearchQuery, selectedCategory, filters, sortBy]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickView = (product: Product) => {
    // In a real app, this would open a modal or navigate to product page
    console.log('Quick view:', product);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <EnhancedNavbar 
        theme={theme} 
        onToggleTheme={toggleTheme}
        onSearch={handleSearch}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex pt-20 lg:pt-24">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 pb-12">
            {/* Category Tabs */}
            <div className="mb-6">
              <CategoryTabs
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filtros</span>
                </button>

                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {loading ? (
                    'Carregando produtos...'
                  ) : (
                    `${filteredAndSortedProducts.length} produto${filteredAndSortedProducts.length !== 1 ? 's' : ''} encontrado${filteredAndSortedProducts.length !== 1 ? 's' : ''}`
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <SortDropdown
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'flex flex-col gap-4'
              }
            `}>
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} />
                ))
              ) : filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
                  <EnhancedProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={() => {}}
                    onQuickView={handleQuickView}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Tente ajustar os filtros ou buscar por outros termos.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFilters({
                        priceRange: [0, 30000],
                        rating: 0,
                        inStock: false,
                        freeShipping: false,
                        brands: [],
                        hasDiscount: false,
                        categories: []
                      });
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <ToastContainer />
    </div>
  );
}

export default function EnhancedTailwindApp() {
  return (
    <AppProvider>
      <EnhancedAppContent />
    </AppProvider>
  );
}