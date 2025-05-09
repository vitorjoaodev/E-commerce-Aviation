import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { formatPrice } from "@/lib/utils";
import { addItem } from "@/store/cartSlice";
import { toggleCart } from "@/store/uiSlice";
import { Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Truck, ArrowLeft, Shield, Clock } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });
  
  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery<Product[]>({
    queryKey: ['/api/products/related', productId],
  });

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.availableSizes && !selectedSize) {
      // Show error - size required
      return;
    }
    
    if (product.availableColors && !selectedColor) {
      // Show error - color required
      return;
    }
    
    dispatch(addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    }));
    
    dispatch(toggleCart(true));
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="aspect-square w-full rounded" />
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-adventure text-primary mb-4">Product Not Found</h1>
        <p className="text-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <a className="inline-block bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300">
            Browse Products
          </a>
        </Link>
      </div>
    );
  }

  const additionalImages = product.additionalImages || [];
  const allImages = [product.imageUrl, ...additionalImages];

  return (
    <>
      <Helmet>
        <title>{product.name} - AviatorX</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <Link href="/products">
          <a className="inline-flex items-center text-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </a>
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="bg-card rounded-lg overflow-hidden">
              <img 
                src={allImages[activeImage]} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {allImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      index === activeImage ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-adventure text-primary mb-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-5 w-5" 
                    fill={(i < Math.floor(product.rating || 5)) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.numReviews || 0} reviews)
              </span>
            </div>
            
            <p className="text-foreground mb-6">{product.description}</p>
            
            <div className="text-2xl font-semibold text-primary mb-6">
              {formatPrice(product.price)}
            </div>
            
            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-foreground font-semibold mb-2">Size</h3>
                <RadioGroup
                  value={selectedSize || ""}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.availableSizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        id={`size-${size}`}
                        value={size}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-md border ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        } cursor-pointer text-sm transition-colors`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Color Selection */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-foreground font-semibold mb-2">Color</h3>
                <RadioGroup
                  value={selectedColor || ""}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2"
                >
                  {product.availableColors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem
                        id={`color-${color}`}
                        value={color}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className={`inline-flex h-10 px-4 items-center justify-center rounded-md border ${
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        } cursor-pointer text-sm transition-colors`}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-foreground font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="h-10 w-10 rounded-l-md bg-muted border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="h-10 w-14 border-t border-b border-border flex items-center justify-center text-foreground">
                  {quantity}
                </div>
                <button
                  className="h-10 w-10 rounded-r-md bg-muted border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              className="w-full bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg mb-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            
            {/* Shipping Info */}
            <div className="border border-border rounded-md p-4 mb-6">
              <div className="flex items-start space-x-3 mb-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold">Free Shipping</h4>
                  <p className="text-muted-foreground text-sm">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 mb-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold">2-Year Warranty</h4>
                  <p className="text-muted-foreground text-sm">Quality guarantee on all products</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold">30-Day Returns</h4>
                  <p className="text-muted-foreground text-sm">Hassle-free return policy</p>
                </div>
              </div>
            </div>
            
            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="materials">
                <AccordionTrigger className="text-foreground font-semibold">
                  Materials & Care
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {product.materialsCare || "Premium materials built to last. Dry clean only or hand wash with cold water. Do not bleach."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="details">
                <AccordionTrigger className="text-foreground font-semibold">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {product.details || "Authentic vintage-inspired design with modern functionality. Features multiple pockets and adjustable elements for the perfect fit."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-foreground font-semibold">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Free shipping on orders over $100. 30-day return policy for unworn items. See our full policy for details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-adventure text-primary mb-2">
              You May Also Like
            </h2>
            <div className="adventure-divider w-40 my-4"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {isLoadingRelated ? (
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
                ))
              ) : (
                relatedProducts.slice(0, 4).map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
