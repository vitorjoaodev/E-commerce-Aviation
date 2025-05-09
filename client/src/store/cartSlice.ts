import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  color?: string;
}

// Define the cart state interface
interface CartState {
  items: CartItem[];
}

// Define the initial state
const initialState: CartState = {
  items: [],
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  }
  return [];
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Load cart from localStorage
    loadCart: (state) => {
      state.items = loadCartFromLocalStorage();
    },
    
    // Add item to cart
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === newItem.id && 
          item.size === newItem.size && 
          item.color === newItem.color
      );
      
      // If item exists, increment quantity
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Otherwise add new item
        state.items.push(newItem);
      }
      
      // Save to localStorage
      saveCartToLocalStorage(state.items);
    },
    
    // Remove item from cart
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    
    // Increment item quantity
    incrementItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state.items);
      }
    },
    
    // Decrement item quantity
    decrementItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state.items);
      }
    },
    
    // Update item quantity
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCartToLocalStorage(state.items);
      }
    },
    
    // Clear cart
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { 
  loadCart,
  addItem, 
  removeItem, 
  incrementItem, 
  decrementItem, 
  updateItemQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
