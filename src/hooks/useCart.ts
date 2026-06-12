import { create } from 'zustand';

import { CartItem, Product, Variation } from '@/types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variation?: Variation) => void;
  removeItem: (productId: string | number, variationName?: string) => void;
  updateQuantity: (
    productId: string | number,
    quantity: number,
    variationName?: string
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, variation) => {
    set(state => {
      const existingItemIndex = state.items.findIndex(
        item =>
          item.id === product.id &&
          item.selectedVariation?.name === variation?.name
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { items: newItems };
      }

      return {
        items: [
          ...state.items,
          { ...product, quantity: 1, selectedVariation: variation }
        ]
      };
    });
  },

  removeItem: (productId, variationName) => {
    set(state => ({
      items: state.items.filter(
        item =>
          !(
            item.id === productId &&
            item.selectedVariation?.name === variationName
          )
      )
    }));
  },

  updateQuantity: (productId, quantity, variationName) => {
    if (quantity <= 0) {
      get().removeItem(productId, variationName);
      return;
    }

    set(state => ({
      items: state.items.map(item =>
        item.id === productId && item.selectedVariation?.name === variationName
          ? { ...item, quantity }
          : item
      )
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  totalPrice: () => {
    return get().items.reduce((total, item) => {
      const price = item.selectedVariation?.price ?? item.price;
      return total + price * item.quantity;
    }, 0);
  }
}));
