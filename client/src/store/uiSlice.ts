import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the UI state interface
interface UiState {
  isCartOpen: boolean;
  isExitPopupOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
}

// Define the initial state
const initialState: UiState = {
  isCartOpen: false,
  isExitPopupOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toggle cart open/close state
    toggleCart: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.isCartOpen = action.payload;
      } else {
        state.isCartOpen = !state.isCartOpen;
      }
      
      // Close other UI elements when opening cart
      if (state.isCartOpen) {
        state.isMobileMenuOpen = false;
        state.isSearchOpen = false;
      }
    },
    
    // Show or hide exit popup
    showExitPopup: (state, action: PayloadAction<boolean>) => {
      state.isExitPopupOpen = action.payload;
    },
    
    // Toggle mobile menu open/close state
    toggleMobileMenu: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.isMobileMenuOpen = action.payload;
      } else {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;
      }
      
      // Close other UI elements when opening mobile menu
      if (state.isMobileMenuOpen) {
        state.isCartOpen = false;
        state.isSearchOpen = false;
      }
    },
    
    // Toggle search open/close state
    toggleSearch: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.isSearchOpen = action.payload;
      } else {
        state.isSearchOpen = !state.isSearchOpen;
      }
      
      // Close other UI elements when opening search
      if (state.isSearchOpen) {
        state.isCartOpen = false;
        state.isMobileMenuOpen = false;
      }
    },
    
    // Close all UI elements
    closeAllUiElements: (state) => {
      state.isCartOpen = false;
      state.isMobileMenuOpen = false;
      state.isSearchOpen = false;
    },
  },
});

export const { 
  toggleCart, 
  showExitPopup, 
  toggleMobileMenu, 
  toggleSearch, 
  closeAllUiElements 
} = uiSlice.actions;

export default uiSlice.reducer;
