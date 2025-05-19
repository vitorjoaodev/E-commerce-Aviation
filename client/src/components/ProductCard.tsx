import { Link } from "wouter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { addItem } from "@/store/cartSlice";
import { toggleCart } from "@/store/uiSlice";
import { formatPrice } from "@/lib/utils";
import { Product } from "@shared/schema";
import { useProductTranslation } from "./ProductTranslation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const { translateProduct } = useProductTranslation();
  
  // Traduz o produto conforme o idioma atual
  const translatedProduct = translateProduct(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addItem({
      id: translatedProduct.id.toString(),
      name: translatedProduct.name,
      price: translatedProduct.price,
      imageUrl: translatedProduct.imageUrl,
      quantity: 1,
      size: translatedProduct.availableSizes ? translatedProduct.availableSizes[0] : undefined,
      color: translatedProduct.availableColors ? translatedProduct.availableColors[0] : undefined,
    }));
    
    dispatch(toggleCart(true));
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card relative group bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 block cursor-pointer">
        <div 
          className="aspect-[3/4] overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img 
            src={translatedProduct.imageUrl} 
            alt={translatedProduct.name} 
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`} 
          />
        </div>
        <div className="p-4">
          <h3 className="font-adventure text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {translatedProduct.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-3">
            {translatedProduct.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-primary font-semibold">{formatPrice(translatedProduct.price)}</span>
            <button 
              className="bg-secondary hover:bg-primary text-white p-2 rounded-full transition-colors duration-300"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
