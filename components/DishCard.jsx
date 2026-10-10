'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import { useToast } from '@/components/ToastProvider';

const DishCard = memo(function DishCard({
  dish = {
    id: 'doro-wot-01',
    name: 'Special Doro Wot',
    subTitle: 'Traditional Spiced Chicken Stew',
    description: 'Slow-simmered chicken drumstick and hard-boiled egg in aged berbere sauce, served with teff injera.',
    price: 750,
    imageUrl: '/images/ethiopian-platter.svg',
    category: 'traditional-wot',
    isFasting: false,
    isSpicy: true,
    isChefSpecial: true,
    prepTime: '25 min',
    portion: 'Serves 1–2',
  },
  onAddToCart,
  priority = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const notify = useToast();

  const increment = () => setQuantity((prev) => Math.min(prev + 1, 20));
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAdd = () => {
    onAddToCart?.({ ...dish, quantity });
    if (onAddToCart) {
      notify(
        `${quantity} ${quantity === 1 ? 'serving' : 'servings'} of ${dish.name} added to your bag.`
      );
    }
    setQuantity(1);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl">
      {/* Media Header */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.5rem] border-[6px] border-[#fff8ec] bg-amber-50 ring-1 ring-amber-200 shadow-[0_8px_22px_rgba(120,53,15,0.12)]">
        {dish.imageUrl ? (
          <Link
            href={`/menu/${dish.id}`}
            aria-label={`View ${dish.name} details`}
            className="absolute inset-0"
            prefetch={false}
          >
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              priority={priority}
              sizes="(max-width: 767px) calc(100vw - 5rem), (max-width: 1023px) calc(50vw - 4.25rem), (max-width: 1279px) calc(50vw - 14rem), 17rem"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍲
          </div>
        )}

        {/* Dietary / Highlight Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {dish.isChefSpecial && (
            <span className="rounded-lg bg-orange-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              Chef’s Pick
            </span>
          )}
          {dish.isFasting && (
            <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              Vegan / Fasting
            </span>
          )}
        </div>
        <FavoriteButton
          dish={dish}
          className="absolute right-3 top-3 z-10"
        />

        {/* Prep Time */}
        {dish.prepTime && (
          <span className="absolute bottom-3 right-3 rounded-lg bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
            ⏱ {dish.prepTime}
          </span>
        )}
      </div>

      {/* Body Details */}
      <div className="mt-4 flex flex-1 flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 transition-colors group-hover:text-orange-700">
                <Link
                  href={`/menu/${dish.id}`}
                  prefetch={false}
                  className="focus-visible:outline-2 focus-visible:outline-orange-600"
                >
                  {dish.name}
                </Link>
              </h3>
              {dish.subTitle && (
                <p className="text-xs font-semibold text-amber-700/80">
                  {dish.subTitle}
                </p>
              )}
            </div>

            {dish.isSpicy && (
              <span className="text-sm shrink-0" title="Spicy">
                🌶️
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {dish.description}
          </p>

          {dish.portion && (
            <span className="mt-2 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              {dish.portion}
            </span>
          )}
        </div>

        {/* Price & Order Action */}
        <div className="space-y-3 border-t border-slate-100 pt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total
            </span>
            <div className="text-right">
              <span className="text-lg font-black text-slate-900">
                {(dish.price * quantity).toLocaleString()}
              </span>
              <span className="ml-1 text-xs font-bold text-amber-600">ETB</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={decrement}
                disabled={quantity <= 1}
                className="h-7 w-7 rounded-lg bg-white text-xs font-extrabold text-slate-700 shadow-2xs hover:bg-slate-100 disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-black text-slate-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increment}
                className="h-7 w-7 rounded-lg bg-white text-xs font-extrabold text-slate-700 shadow-2xs hover:bg-slate-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-orange-700 active:scale-95"
            >
              <span>+ Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

export default DishCard;