import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleCart } from "@/store/uiSlice";
import { decrementItem, incrementItem, removeItem } from "@/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function CartDrawer() {
  const { isCartOpen } = useSelector((state: RootState) => state.ui);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleCloseCart = () => {
    dispatch(toggleCart(false));
  };

  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(incrementItem(itemId));
  };

  const handleDecreaseQuantity = (itemId: string) => {
    dispatch(decrementItem(itemId));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 ${isCartOpen ? 'block' : 'hidden'}`}>
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={handleCloseCart}
      ></div>
      
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-card shadow-xl transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-adventure text-primary">Your Cart ({items.length})</h2>
            <button 
              className="text-foreground hover:text-primary"
              onClick={handleCloseCart}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center p-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-foreground text-lg mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6 text-center">Looks like you haven't added anything to your cart yet.</p>
              <button 
                className="bg-primary hover:bg-opacity-90 text-primary-foreground py-3 px-8 rounded font-adventure uppercase tracking-wider transition-all duration-300"
                onClick={handleCloseCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex border-b border-border pb-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded" 
                    />
                    <div className="ml-4 flex-grow">
                      <h4 className="text-foreground">{item.name}</h4>
                      <p className="text-muted-foreground text-sm">
                        {item.size && `Size: ${item.size}`} 
                        {item.color && item.size && ' / '} 
                        {item.color && `Color: ${item.color}`}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="w-6 h-6 bg-muted rounded flex items-center justify-center text-foreground"
                            onClick={() => handleDecreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-foreground">{item.quantity}</span>
                          <button 
                            className="w-6 h-6 bg-muted rounded flex items-center justify-center text-foreground"
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-primary font-semibold">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <button 
                      className="text-muted-foreground hover:text-accent"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-border">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-foreground font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(subtotal)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link 
                    href="/checkout"
                    className="block w-full bg-primary hover:bg-opacity-90 text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center"
                    onClick={handleCloseCart}
                  >
                    Checkout
                  </Link>
                  <button 
                    className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 rounded font-adventure uppercase tracking-wider transition-colors duration-300"
                    onClick={handleCloseCart}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
