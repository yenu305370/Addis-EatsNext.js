import { dishes, getDishSlug } from '@/lib/data';
import JsonLd from '@/components/JsonLd';
import FavoriteButton from '@/components/FavoriteButton';
import Image from 'next/image';
import { formatETB } from '@/lib/formatters';
import { notFound } from 'next/navigation';
import { siteUrl } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { id: slug } = await params;
  const dish = dishes.find((d) => getDishSlug(d.name) === slug);
  if (!dish) return { title: 'Dish Not Found' };

  return {
    title: `${dish.name} | Addis Eats`,
    description: dish.description,
    openGraph: {
      type: 'website',
      url: `${siteUrl}/menu/${slug}`,
      siteName: 'Addis Eats',
      locale: 'en_US',
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      images: [
        {
          url: dish.imageUrl,
          alt: dish.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      images: [dish.imageUrl],
    },
  };
}

export default async function DishDetailPage({ params }) {
  const { id: slug } = await params;
  const dish = dishes.find((d) => getDishSlug(d.name) === slug);

  if (!dish) notFound();

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10">
      <JsonLd dish={dish} />
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="relative w-full h-72 rounded-xl overflow-hidden bg-slate-100">
          <FavoriteButton
            dish={dish}
            className="absolute right-3 top-3 z-10"
          />
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{dish.category}</span>
            <h1 className="text-2xl font-extrabold text-slate-900 my-2">{dish.name}</h1>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">{dish.description}</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 mb-4">{formatETB(dish.price)}</p>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all text-xs">
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
