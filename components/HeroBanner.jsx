import Image from 'next/image';
import Link from 'next/link';
import HeroShowcase from './HeroShowcase';
import { getDishSlug } from '@/lib/data';

const featuredDishes = [
  {
    id: 'dish_1',
    name: 'Royal Doro Wat',
    description: 'Slow-cooked chicken, warming berbere, and the comfort of injera.',
    image: '/images/Special%20Doro%20Wat.jpg',
    alt: 'Doro Wat served with injera and a boiled egg',
    category: 'The signature',
    price: '450',
  },
  {
    id: 'dish_2',
    name: 'Grand Beyaynetu',
    description: 'A colorful spread of seasonal plant-based Ethiopian favorites.',
    image: '/images/ethiopian-beyaynetu.jpg',
    alt: 'Colorful Ethiopian vegetarian dishes arranged over injera',
    category: 'Plant-forward',
    price: '350',
  },
  {
    id: 'dish_3',
    name: 'Gored Gored',
    description: 'Tender beef, bright mitmita, and a bold, buttery finish.',
    image: '/images/Tender%20Gored%20Gored.jpg',
    alt: 'Ethiopian Gored Gored beef served with injera',
    category: 'For the table',
    price: '500',
  },
];

const steps = [
  { number: '01', title: 'Find your favorite', copy: 'Browse a menu built around Ethiopian classics and generous, colorful plates.' },
  { number: '02', title: 'Make it yours', copy: 'Choose your dishes, adjust your cart, and add delivery details at checkout.' },
  { number: '03', title: 'Gather around', copy: 'We prepare your order fresh, ready to bring a little Addis warmth to your table.' },
];

export default function HeroBanner() {
  return (
    <div className="space-y-20 pb-4 sm:space-y-28">
      <HeroShowcase />

      <section aria-labelledby="featured-heading" className="scroll-mt-28">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700 sm:text-xs">A few favorites to begin</p>
            <h2 id="featured-heading" className="mt-3 text-3xl font-black tracking-tight text-[#251711] sm:text-4xl">Made for the middle of the table.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">A first look at the flavors, colors, and comfort waiting in our kitchen.</p>
          </div>
          <Link href="/menu" className="group inline-flex items-center gap-2 self-start text-sm font-extrabold text-orange-800 transition hover:text-orange-600 sm:self-auto">
            See the full menu <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredDishes.map((dish) => (
            <Link key={dish.id} href={`/menu/${getDishSlug(dish.name)}`} className="dish-feature group block overflow-hidden rounded-[1.5rem] border border-[#eee5d9] bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_20px_55px_rgba(75,45,25,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">
              <div className="relative aspect-[1.23] overflow-hidden bg-[#eee2d1]">
                <Image src={dish.image} alt={dish.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#21130f]/65 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.17em] text-white backdrop-blur">{dish.category}</span>
                <span className="absolute bottom-4 right-4 rounded-full bg-[#fffaf3] px-3 py-1.5 text-xs font-extrabold text-[#251711] shadow-lg">{dish.price} ETB</span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight text-[#251711]">{dish.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{dish.description}</p>
                  </div>
                  <span aria-hidden="true" className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-200 text-orange-800 transition group-hover:bg-orange-600 group-hover:text-white">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="our-story" aria-labelledby="story-heading" className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-[#efe5d6]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[340px] overflow-hidden bg-[#322018] sm:min-h-[440px]">
            <Image src="/images/ethiopian-feast.jpg" alt="Ethiopian dishes gathered together for a shared meal" fill sizes="(max-width: 1023px) 100vw, 46vw" className="object-cover transition-transform duration-1000 hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c100c]/55 to-transparent" />
            <span className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-[#21130f]/45 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">Gather · Share · Enjoy</span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14 xl:p-16">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-800 sm:text-xs">More than a meal</p>
            <h2 id="story-heading" className="mt-4 max-w-lg text-4xl font-extrabold leading-[1.08] tracking-tight text-[#251711] sm:text-5xl">The table is where the story begins.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-700 sm:text-base">
              Ethiopian food invites you to slow down. Tear a piece of injera, reach for a favorite, and share a little of everything. At Addis Eats, we bring that generous spirit into every order.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#d8c8b3] pt-6">
              <div><p className="text-lg font-extrabold tracking-tight text-orange-800">A buna moment</p><p className="mt-1 text-xs leading-5 text-stone-600">Let the meal become the occasion.</p></div>
              <div><p className="text-lg font-extrabold tracking-tight text-orange-800">A shared plate</p><p className="mt-1 text-xs leading-5 text-stone-600">There is always room for one more.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-700 sm:text-xs">Good food, made simple</p>
          <h2 id="steps-heading" className="mt-3 text-3xl font-black tracking-tight text-[#251711] sm:text-4xl">Your table is three steps away.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="rounded-[1.5rem] border border-[#eee5d9] bg-white p-6 sm:p-7">
              <span className="font-serif text-3xl italic text-orange-600">{step.number}</span>
              <h3 className="mt-5 text-lg font-extrabold text-[#251711]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#28150f] px-7 py-12 text-white sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:px-16">
        <div aria-hidden="true" className="absolute -right-16 -top-28 -z-10 h-80 w-80 rounded-full border border-orange-200/15" />
        <div aria-hidden="true" className="absolute -right-4 -top-16 -z-10 h-56 w-56 rounded-full border border-orange-200/15" />
        <div className="max-w-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-200 sm:text-xs">Pull up a chair</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Something wonderful is simmering.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">Explore the menu and find the dish that brings everyone to the table.</p>
        </div>
        <Link href="/menu" className="mt-7 inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-200 lg:mt-0">
          Find your favorite <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[#e9dfd2] pt-7 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-black tracking-[0.16em] text-orange-700">ADDIS EATS<span className="text-orange-500">.</span></Link>
        <p>Good food tastes better together.</p>
        <div className="flex gap-5 font-semibold">
          <Link href="/menu" className="transition hover:text-orange-700">Menu</Link>
          <Link href="/cart" className="transition hover:text-orange-700">Cart</Link>
          <Link href="/orders" className="transition hover:text-orange-700">Track order</Link>
        </div>
      </footer>
    </div>
  );
}
