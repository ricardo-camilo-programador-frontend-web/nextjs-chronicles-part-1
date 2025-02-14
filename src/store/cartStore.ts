import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Plant } from "@/types/plant.types";
import { CartItem } from "@/types/cartItem";

interface CartState {
  items: CartItem[];
  addItem: (item: Plant, quantity?: number) => void;
  removeItem: (item: Plant) => void;
  clearCart: () => void;
  decrementItemQuantity: (item: Plant) => void;
}

const ifItemExistsOnlyIncreaseQuantity = (cartItems: CartItem[], item: Plant) => {
  if(!item.id) return cartItems;

  const itemExists = cartItems.find((cartItem) => cartItem.item.id === item.id);

  if (itemExists) {
    return cartItems.map((cartItem) => cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
  }

  return [...cartItems, { item, quantity: 1 }];
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item: Plant) => set((state) => ({
        items: ifItemExistsOnlyIncreaseQuantity(state.items, item),
      })),
      decrementItemQuantity: (item: Plant) => set((state) => ({
        items: state.items.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      })),
      removeItem: (item: Plant) => set((state) => ({
        items: state.items.filter((cartItem) => cartItem.item.id !== item.id)
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
);
