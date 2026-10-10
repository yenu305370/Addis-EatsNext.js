import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoriteStore = create(
  persist(
    (set) => ({
      favoriteIds: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...state.favoriteIds, id],
        })),
    }),
    {
      name: 'addis-eats-favorites-storage',
    }
  )
);
