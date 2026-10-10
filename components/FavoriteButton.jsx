'use client';

import { useFavoriteStore } from '@/lib/favoriteStore';
import { useToast } from '@/components/ToastProvider';

export default function FavoriteButton({ dish, className = '' }) {
  const isFavorite = useFavoriteStore((state) =>
    state.favoriteIds.includes(dish.id)
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const notify = useToast();

  const handleToggle = () => {
    toggleFavorite(dish.id);
    notify(
      isFavorite
        ? `${dish.name} removed from favorites.`
        : `${dish.name} added to favorites.`
    );
  };

  return (
    <button
      type="button"
      aria-label={`${isFavorite ? 'Remove' : 'Add'} ${dish.name} ${isFavorite ? 'from' : 'to'} favorites`}
      aria-pressed={isFavorite}
      onClick={handleToggle}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/95 text-rose-600 shadow-md transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
        />
      </svg>
    </button>
  );
}
