import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Product } from "@shared/schema";
import { debounce } from "@/lib/utils";
import { Filter, Search, SlidersHorizontal } from "lucide-react";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

export default function Products() {
  const [location] = useLocation();
  const category = location.split("/").pop() || "";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", category],
  });

  // Get all unique brands and colors for filters
  const brands = [...new Set((products || []).map(p => p.brand))].sort();
  const colors = [...new Set((products || []).map(p => p.availableColors || []).flat())].sort();

  // Filter products based on current filter state
  const filteredProducts = (products || []).filter(product => {
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by selected brands
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // Filter by selected colors
    if (selectedColors.length > 0 && 
        !product.availableColors?.some(color => selectedColors.includes(color))) {
      return false;
    }
    
    return true;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "featured":
      default:
        return b.popularity - a.popularity;
    }
  });

  // Handle search with debounce
  const handleSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  // Title based on category
  const getPageTitle = () => {
    if (!category) return "All Products";
    
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    if (category === "mens") return "Men's Collection";
    if (category === "womens") return "Women's Collection";
    return formattedCategory;
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()} - AviatorX</title>
        <meta name="description" content={`Explore our ${getPageTitle().toLowerCase()} of aviation-inspired clothing. High-quality aviation apparel made for adventure.`} />
      </Helmet>
      
      {/* Category Banner with background image */}
      <div className="relative h-[300px] mb-10">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-black via-transparent to-black"></div>
          <img 
            className="w-full h-full object-cover" 
            src={
              category === "mens" 
                ? "https://redcanoebrands.com/wp-content/uploads/2024/08/2024_MEN-BANNER-1.jpg"
                : category === "womens"
                ? "https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-category-banner.jpg"
                : category === "accessories"
                ? "https://www.atr-aircraft.com/wp-content/uploads/2023/07/ATR-110237_MD.jpg"
                : category === "hats"
                ? "https://redcanoebrands.com/wp-content/uploads/2024/08/2024_CAPS-BANNEr-1.jpg"
                : "https://redcanoebrands.com/wp-content/uploads/2024/08/2024_MEN-BANNER-1.jpg"
            } 
            alt={`${getPageTitle()} banner`} 
          />
        </div>

        <div className="relative h-full flex items-center px-4 md:px-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl text-primary mb-4 font-adventure leading-tight">
              {getPageTitle()}
            </h1>
            <div className="adventure-divider w-40 my-4"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 rounded bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
            <button
              className="flex items-center space-x-2 text-foreground hover:text-primary md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                className="bg-muted border border-border rounded px-2 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-card p-4 rounded-lg border border-border">
              <h3 className="text-lg font-adventure text-primary mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-foreground font-semibold mb-2">Price Range</h4>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Brands */}
              <div className="mb-6">
                <h4 className="text-foreground font-semibold mb-2">Brands</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm text-foreground"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Colors */}
              <div>
                <h4 className="text-foreground font-semibold mb-2">Colors</h4>
                <div className="space-y-2">
                  {colors.map(color => (
                    <div key={color} className="flex items-center">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedColors([...selectedColors, color]);
                          } else {
                            setSelectedColors(selectedColors.filter(c => c !== color));
                          }
                        }}
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="ml-2 text-sm text-foreground"
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mb-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-adventure text-primary">Filters</h3>
                  <button 
                    className="text-muted-foreground"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-foreground font-semibold mb-2">Price Range</h4>
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-foreground font-semibold mb-2">Brands</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={`mobile-brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                        />
                        <label
                          htmlFor={`mobile-brand-${brand}`}
                          className="ml-2 text-sm text-foreground"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Colors */}
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Colors</h4>
                  <div className="space-y-2">
                    {colors.map(color => (
                      <div key={color} className="flex items-center">
                        <Checkbox
                          id={`mobile-color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                        />
                        <label
                          htmlFor={`mobile-color-${color}`}
                          className="ml-2 text-sm text-foreground"
                        >
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="w-full mt-6 bg-primary text-primary-foreground py-2 rounded font-adventure uppercase tracking-wider"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className="flex-grow">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-card rounded-lg overflow-hidden">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-9 w-9 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <SearchX className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-adventure text-primary mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SearchX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m13.5 8.5-5 5" />
      <path d="m8.5 8.5 5 5" />
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
