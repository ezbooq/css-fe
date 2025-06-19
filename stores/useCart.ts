import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "../types/cart";

type CartState = {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  hasPackageInCategory: (categoryId: string | undefined) => boolean;
  hasIncluded: (id: string | undefined) => boolean;
};

const calculateTotalAmount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price, 0);

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalAmount: 0,
      itemCount: 0,

      addItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) return;

        const updatedItems = [...get().items, item];
        set({
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
          itemCount: updatedItems.length,
        });
      },

      removeItem: (id) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
          itemCount: updatedItems.length,
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalAmount: 0,
          itemCount: 0,
        });
      },

      hasPackageInCategory: (categoryId) => {
        return get().items.some(
          (item) => item.type === "PACKAGE" && item.categoryId === categoryId
        );
      },
      hasIncluded: (id) => {
        return get().items.some((item) => item.id === id);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useCartStore;
