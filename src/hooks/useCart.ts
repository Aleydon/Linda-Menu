import { create } from 'zustand';

import { CartItem, Product, Variation } from '@/types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variation?: Variation, quantity?: number) => void;
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

  addItem: (product, variation, quantity = 1) => {
    set(state => {
      const existingItemIndex = state.items.findIndex(
        item =>
          item.id === product.id &&
          item.selectedVariation?.name === variation?.name
      );

      const availableStock = variation ? variation.stock : product.stock;

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        const currentQty = newItems[existingItemIndex].quantity;
        const newQty = Math.min(currentQty + quantity, availableStock);
        newItems[existingItemIndex].quantity = newQty;
        return { items: newItems };
      }

      const initialQty = Math.min(quantity, availableStock);
      if (initialQty <= 0 && availableStock > 0) return state; // Should not happen if UI handles it

      return {
        items: [
          ...state.items,
          { ...product, quantity: initialQty, selectedVariation: variation }
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
      items: state.items.map(item => {
        if (
          item.id === productId &&
          item.selectedVariation?.name === variationName
        ) {
          const availableStock = item.selectedVariation
            ? item.selectedVariation.stock
            : item.stock;
          return { ...item, quantity: Math.min(quantity, availableStock) };
        }
        return item;
      })
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
