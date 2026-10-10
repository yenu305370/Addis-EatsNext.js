'use client';

import { useMemo, useState } from 'react';
import { dishes } from '@/lib/data';
import { useCartStore } from '@/lib/cartStore';
import CategorySidebar from '@/components/CategorySidebar';
import DishCard from '@/components/DishCard';
import MenuSearch from '@/components/MenuSearch';
import { useFavoriteStore } from '@/lib/favoriteStore';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyFasting, setOnlyFasting] = useState(false);
  const [priceRange, setPriceRange] = useState(2500);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const favoriteIds = useFavoriteStore((state) => state.favoriteIds);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categoryCounts = useMemo(
    () =>
      dishes.reduce(
        (counts, dish) => {
          counts[dish.category] = (counts[dish.category] ?? 0) + 1;
          return counts;
        },
        { all: dishes.length }
      ),
    []
  );

  const filteredDishes = useMemo(
    () =>
      dishes.filter((dish) => {
        const matchesCategory =
          selectedCategory === 'all' || dish.category === selectedCategory;
        const matchesFasting = !onlyFasting || dish.isFasting === true;
        const matchesPrice = dish.price <= priceRange;
        const matchesFavorite =
          !favoritesOnly || favoriteIds.includes(dish.id);
        const matchesQuery =
          !normalizedQuery ||
          `${dish.name} ${dish.description}`.toLowerCase().includes(normalizedQuery);

        return (
          matchesCategory &&
          matchesFasting &&
          matchesPrice &&
          matchesFavorite &&
          matchesQuery
        );
      }),
    [
      favoritesOnly,
      favoriteIds,
      normalizedQuery,
      onlyFasting,
      priceRange,
      selectedCategory,
    ]
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-slate-50 to-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-[0_18px_60px_rgba(124,45,18,0.07)] md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-700">
            The Addis Eats collection
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
            A table worth gathering around.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Explore carefully prepared Ethiopian classics and signature dishes, made fresh and delivered with care.
          </p>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onlyFasting={onlyFasting}
            onToggleFasting={setOnlyFasting}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            totalItemsCount={filteredDishes.length}
            categoryCounts={categoryCounts}
          />

          <section className="w-full flex-1">
            <div className="mb-6 flex flex-col gap-4 border-b border-orange-100 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-black capitalize text-slate-900">
                  {selectedCategory === 'all'
                    ? 'All Selections'
                    : selectedCategory}
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  Freshly prepared and curated for executive dining
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                <button
                  type="button"
                  aria-pressed={favoritesOnly}
                  onClick={() => setFavoritesOnly((current) => !current)}
                  className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition ${
                    favoritesOnly
                      ? 'border-rose-600 bg-rose-600 text-white shadow-sm'
                      : 'border-rose-100 bg-white text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  <span aria-hidden="true">♥</span>
                  Favorites ({favoriteIds.length})
                </button>
                <MenuSearch value={searchQuery} onChange={setSearchQuery} />
                <span className="self-start rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold text-orange-900">
                  {filteredDishes.length} dishes
                </span>
              </div>
            </div>

            {filteredDishes.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-orange-200 bg-white/70 p-12 text-center">
                <p className="text-sm font-bold text-slate-600">
                  No dishes found matching your selected criteria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setOnlyFasting(false);
                    setPriceRange(2500);
                    setSearchQuery('');
                    setFavoritesOnly(false);
                  }}
                  className="mt-4 text-xs font-bold text-orange-700 underline hover:text-orange-800"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onAddToCart={addItem}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}