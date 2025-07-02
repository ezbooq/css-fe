import { create } from "zustand";
import type { CartItem } from "../types/cart";

type CartState = {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  hasPackageInCategory: (categoryId: string | undefined) => boolean;
  hasIncluded: (id: string | undefined) => boolean;
};

const calculateTotalAmount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

const calculateItemCount = (items: CartItem[]) =>
  items.reduce((count, item) => count + (item.quantity || 1), 0);

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalAmount: 0,
  itemCount: 0,

  addItem: (item) => {
    const existing = get().items.find((i) => i.id === item.id);
    let updatedItems;

    if (existing) {
      updatedItems = get().items.map((i) =>
        i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
      );
    } else {
      updatedItems = [...get().items, { ...item, quantity: 1 }];
    }

    set({
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
      itemCount: calculateItemCount(updatedItems),
    });
  },

  removeItem: (id) => {
    const updatedItems = get().items.filter((item) => item.id !== id);
    set({
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
      itemCount: calculateItemCount(updatedItems),
    });
  },

  decrementItem: (id) => {
    const updatedItems = get()
      .items.map((item) => {
        if (item.id === id) {
          const newQty = (item.quantity || 1) - 1;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null);

    set({
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
      itemCount: calculateItemCount(updatedItems),
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
    if (!categoryId) return false;
    return get().items.some(
      (item) => item.type === "PACKAGE" && item.categoryId === categoryId
    );
  },

  hasIncluded: (id) => {
    if (!id) return false;
    return get().items.some((item) => item.id === id);
  },
}));

export default useCartStore;
