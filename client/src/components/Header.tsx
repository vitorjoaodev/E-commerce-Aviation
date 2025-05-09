import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart, openSearch } from "@/store/uiSlice";
import { RootState } from "@/store";
import { Search, User, ShoppingBag, Menu } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [location] = useLocation();
  const { items } = useSelector((state: RootState) => state.cart);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleOpenCart = () => {
    dispatch(toggleCart(true));
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo - Compass Style */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12 mr-2 border-2 border-primary rounded-full flex items-center justify-center overflow-hidden">
              {/* Compass face */}
              <div className="absolute inset-0 bg-background"></div>
              
              {/* Compass ring with markings */}
              <div className="absolute inset-0 border-4 border-primary rounded-full"></div>
              
              {/* North marker */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-accent"></div>
              
              {/* Compass needle */}
              <div className="absolute top-1/2 left-1/2 w-8 h-1 bg-primary origin-center animate-[compass-spin_8s_linear_infinite]" 
                   style={{ transform: 'translate(-50%, -50%)' }}>
                <div className="absolute right-0 w-4 h-1 bg-accent"></div>
              </div>
              
              {/* Central pivot */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <span className="text-xl font-adventure text-primary">Aviator Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products/mens" className={`text-foreground hover:text-primary uppercase tracking-wider text-sm ${location.startsWith('/products/mens') ? 'text-primary' : ''}`}>
              Men
            </Link>
            <Link href="/products/womens" className={`text-foreground hover:text-primary uppercase tracking-wider text-sm ${location.startsWith('/products/womens') ? 'text-primary' : ''}`}>
              Women
            </Link>
            <Link href="/products/accessories" className={`text-foreground hover:text-primary uppercase tracking-wider text-sm ${location.startsWith('/products/accessories') ? 'text-primary' : ''}`}>
              Accessories
            </Link>
            <Link href="/products/collections" className={`text-foreground hover:text-primary uppercase tracking-wider text-sm ${location.startsWith('/products/collections') ? 'text-primary' : ''}`}>
              Collections
            </Link>
            <Link href="/about" className={`text-foreground hover:text-primary uppercase tracking-wider text-sm ${location === '/about' ? 'text-primary' : ''}`}>
              About
            </Link>
          </nav>

          {/* Search, Account, Cart */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-foreground hover:text-primary"
              onClick={() => dispatch({ type: 'ui/toggleSearch', payload: true })}
              aria-label="Open search"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link href="/account" className="text-foreground hover:text-primary">
              <User className="h-6 w-6" />
            </Link>
            <button 
              className="text-foreground hover:text-primary relative"
              onClick={handleOpenCart}
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-foreground hover:text-primary"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-3 bg-card border-t border-border">
            <Link href="/products/mens" className="block text-foreground hover:text-primary py-2 uppercase tracking-wider text-sm">
              Men
            </Link>
            <Link href="/products/womens" className="block text-foreground hover:text-primary py-2 uppercase tracking-wider text-sm">
              Women
            </Link>
            <Link href="/products/accessories" className="block text-foreground hover:text-primary py-2 uppercase tracking-wider text-sm">
              Accessories
            </Link>
            <Link href="/products/collections" className="block text-foreground hover:text-primary py-2 uppercase tracking-wider text-sm">
              Collections
            </Link>
            <Link href="/about" className="block text-foreground hover:text-primary py-2 uppercase tracking-wider text-sm">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
