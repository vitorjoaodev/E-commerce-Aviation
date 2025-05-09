import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleSearch } from '@/store/uiSlice';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { Product } from '@shared/schema';

export default function SearchOverlay() {
  const { isSearchOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  // Focus the input when the overlay opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  // Close search with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        dispatch(toggleSearch(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, isSearchOpen]);

  // Search products API
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['/api/products/search', debouncedQuery],
    queryFn: () => apiRequest<Product[]>(`/api/products?search=${debouncedQuery}`),
    enabled: debouncedQuery.length > 2, // Only search when query is at least 3 characters
    staleTime: 60000 // 1 minute
  });

  const handleClose = () => {
    dispatch(toggleSearch(false));
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      handleClose();
    }
  };

  const handleProductClick = () => {
    handleClose();
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button 
            onClick={handleClose}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Close search"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative mb-8">
            <div className="relative">
              <input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-muted border-b-2 border-border focus:border-primary py-4 pl-12 pr-4 text-foreground text-xl focus:outline-none transition-colors duration-200"
                aria-label="Search"
              />
              <SearchIcon className="absolute left-0 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
          </form>

          {/* Recent searches or popular categories when there's no query */}
          {!debouncedQuery && (
            <div>
              <h3 className="text-foreground font-adventure text-lg mb-4">Popular Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Link href="/products/mens">
                  <a className="bg-muted p-4 rounded-md text-center hover:bg-primary/10 transition-colors">
                    Men's Collection
                  </a>
                </Link>
                <Link href="/products/womens">
                  <a className="bg-muted p-4 rounded-md text-center hover:bg-primary/10 transition-colors">
                    Women's Collection
                  </a>
                </Link>
                <Link href="/products/accessories">
                  <a className="bg-muted p-4 rounded-md text-center hover:bg-primary/10 transition-colors">
                    Accessories
                  </a>
                </Link>
                <Link href="/products/jackets">
                  <a className="bg-muted p-4 rounded-md text-center hover:bg-primary/10 transition-colors">
                    Jackets
                  </a>
                </Link>
                <Link href="/products/shirts">
                  <a className="bg-muted p-4 rounded-md text-center hover:bg-primary/10 transition-colors">
                    Shirts
                  </a>
                </Link>
                <Link href="/products/new-arrivals">
                  <a className="bg-muted p-4 rounded-md text-center hover:bg-primary/10 transition-colors">
                    New Arrivals
                  </a>
                </Link>
              </div>
            </div>
          )}

          {/* Search results */}
          {debouncedQuery.length > 2 && (
            <div>
              <h3 className="text-foreground font-adventure text-lg mb-4">
                {isLoading ? 'Searching...' : `Search Results for "${debouncedQuery}"`}
              </h3>
              
              {isLoading && (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              )}
              
              {!isLoading && searchResults && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-2">No products found.</p>
                  <p className="text-sm text-muted-foreground">Try a different search term or browse our categories.</p>
                </div>
              )}
              
              {!isLoading && searchResults && searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                      <a 
                        className="flex items-center p-3 hover:bg-muted rounded-md transition-colors"
                        onClick={handleProductClick}
                      >
                        <div className="w-20 h-20 bg-muted rounded-md mr-4 overflow-hidden">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium mb-1">{product.name}</h4>
                          <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}