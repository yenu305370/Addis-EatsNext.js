'use client';

import { useId } from 'react';

const CATEGORIES = [
  { id: 'all', name: 'All Selections', icon: '🍽️' },
  { id: 'Traditional', name: 'Traditional', icon: '🍲' },
  { id: 'Meat', name: 'Meat', icon: '🥩' },
  { id: 'Vegetarian', name: 'Vegetarian', icon: '🌱' },
  { id: 'Signature', name: 'Signature', icon: '🍱' },
  { id: 'Seafood', name: 'Seafood', icon: '🐟' },
  { id: 'Breakfast', name: 'Breakfast', icon: '🍳' },
];

export default function CategorySidebar({
  selectedCategory = 'all',
  onSelectCategory,
  onlyFasting = false,
  onToggleFasting,
  priceRange = 1500,
  onPriceChange,
  totalItemsCount = 18,
  categoryCounts = {},
}) {
  const priceInputId = useId();
  const fastingInputId = useId();

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72 lg:self-start">
      <div className="mb-3 flex items-center gap-3 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-3 shadow-sm lg:hidden">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-lg text-white shadow-md shadow-orange-600/20">
          🍽️
        </span>
        <div>
          <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-orange-700">
            Addis Eats · Discover
          </span>
          <h3 className="text-sm font-black tracking-tight text-slate-900">
            Explore by category
          </h3>
        </div>
      </div>

      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-4 lg:hidden">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory?.(cat.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                  : 'bg-white border-orange-100 text-slate-700 hover:bg-orange-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Sticky Sidebar Card */}
      <div className="hidden max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border border-orange-100/90 bg-white/95 shadow-[0_24px_70px_rgba(124,45,18,0.10)] backdrop-blur-sm lg:block">
        <div className="relative overflow-hidden rounded-t-[1.7rem] bg-gradient-to-br from-orange-800 via-orange-600 to-amber-500 px-6 py-6 text-white">
          <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[18px] border-white/10" />
          <div className="absolute -bottom-16 right-16 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl" />
          <div className="relative">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-100">
              Addis Eats · Curated
            </span>
            <h3 className="mt-2 text-xl font-black tracking-tight">
              Find your favorite.
            </h3>
            <p className="mt-1 text-xs leading-5 text-orange-50">
              {totalItemsCount} thoughtfully prepared selections
            </p>
          </div>
        </div>

        <div className="space-y-6 p-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-3.5 shadow-sm">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-lg text-white shadow-md shadow-orange-600/20">
                🍽️
              </span>
              <div>
                <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-orange-700">
                  Addis Eats · Discover
                </span>
                <h3 className="text-sm font-black tracking-tight text-slate-900">
                  Explore by category
                </h3>
              </div>
            </div>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'translate-x-0.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-600 hover:translate-x-0.5 hover:bg-orange-50 hover:text-orange-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-base transition-colors ${
                    isActive ? 'bg-white/15' : 'bg-orange-50 group-hover:bg-orange-100'
                  }`}>{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-orange-50 text-orange-800'
                  }`}
                >
                  {categoryCounts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

          <div className="space-y-3 border-t border-orange-100 pt-5">
            <span className="block px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Made for your table
            </span>
            <label
              htmlFor={fastingInputId}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
                onlyFasting
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-slate-100 bg-slate-50/70 hover:border-orange-100 hover:bg-orange-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-base shadow-sm">
                  🌿
                </span>
                <div>
                <span className="text-xs font-bold text-orange-900">
                    Vegan & fasting
                  </span>
                  <span className="mt-0.5 block text-[10px] text-slate-500">
                    Plant-based favorites
                  </span>
                </div>
              </div>
              <input
                id={fastingInputId}
                type="checkbox"
                checked={onlyFasting}
                onChange={(event) => onToggleFasting?.(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-orange-600 focus:ring-orange-500"
              />
            </label>
          </div>

          <div className="space-y-3 border-t border-orange-100 pt-5">
          <div className="flex items-center justify-between px-2">
            <label
              htmlFor={priceInputId}
              className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
            >
              Price range
            </label>
            <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-800">
              {priceRange} ETB
            </span>
          </div>
          <input
            id={priceInputId}
            type="range"
            min={200}
            max={2500}
            step={50}
            value={priceRange}
            onChange={(e) => onPriceChange?.(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer rounded-lg bg-orange-100 accent-orange-600"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
            <span>200 ETB</span>
            <span>2,500 ETB</span>
          </div>
          </div>
        </div>
      </div>
    </aside>
  );
}