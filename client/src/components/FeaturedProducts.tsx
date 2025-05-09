import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "./ProductCard";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

type SortOption = "newest" | "popular" | "price";

export default function FeaturedProducts() {
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const sortedProducts = getSortedProducts(products || [], sortBy);

  function getSortedProducts(prods: Product[], sort: SortOption): Product[] {
    const productsCopy = [...prods];
    
    switch (sort) {
      case "newest":
        return productsCopy.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "popular":
        return productsCopy.sort((a, b) => b.popularity - a.popularity);
      case "price":
        return productsCopy.sort((a, b) => a.price - b.price);
      default:
        return productsCopy;
    }
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-adventure text-primary">Featured Products</h2>
            <div className="adventure-divider w-40 my-4"></div>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button 
              className={`text-sm uppercase transition-colors duration-300 ${sortBy === "newest" ? "text-primary" : "text-foreground hover:text-primary"}`}
              onClick={() => setSortBy("newest")}
            >
              Newest
            </button>
            <span className="text-border">|</span>
            <button 
              className={`text-sm uppercase transition-colors duration-300 ${sortBy === "popular" ? "text-primary" : "text-foreground hover:text-primary"}`}
              onClick={() => setSortBy("popular")}
            >
              Popular
            </button>
            <span className="text-border">|</span>
            <button 
              className={`text-sm uppercase transition-colors duration-300 ${sortBy === "price" ? "text-primary" : "text-foreground hover:text-primary"}`}
              onClick={() => setSortBy("price")}
            >
              Price
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? 
            Array(4).fill(0).map((_, i) => (
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
            )) : 
            sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>

        <div className="mt-12 text-center">
          <Link href="/products">
            <a className="inline-block bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              View All Products
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
