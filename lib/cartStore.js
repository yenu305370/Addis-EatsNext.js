import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item or increment quantity if it already exists in the cart
      addItem: (dish) => {
        set((state) => {
          const qty = dish.quantity || 1;
          const existingIndex = state.items.findIndex((i) => i.id === dish.id);

          if (existingIndex > -1) {
            const nextItems = [...state.items];
            nextItems[existingIndex] = {
              ...nextItems[existingIndex],
              quantity: Math.min(nextItems[existingIndex].quantity + qty, 20),
            };
            return { items: nextItems };
          }
          return {
            items: [
              ...state.items,
              { ...dish, quantity: Math.min(qty, 20) },
            ],
          };
        });
      },

      // Update quantity or remove if quantity reaches 0
      updateQuantity: (id, delta) => {
        set((state) => {
          const nextItems = state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = Math.min(item.quantity + delta, 20);
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean);
          return { items: nextItems };
        });
      },

      // Remove single item
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      // Reset cart
      clearCart: () => set({ items: [] }),

      // Helpers for count and subtotal
      getTotalCount: () => {
        return get().items.reduce((acc, item) => acc + (item.quantity || 1), 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * (item.quantity || 1),
          0
        );
      },
    }),
    {
      name: 'addis-eats-cart-storage',
    }
  )
);