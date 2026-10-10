import Image from 'next/image';
import Link from 'next/link';

const highlights = ['Freshly prepared', 'Proudly Ethiopian', 'Made for sharing'];

export default function HeroBanner() {
  return (
    <section
      aria-labelledby="home-heading"
      className="grid overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_30px_90px_rgba(124,45,18,0.12)] lg:min-h-[540px] lg:grid-cols-2"
    >
      <div className="relative min-h-[340px] bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-3 sm:min-h-[420px] sm:p-5 lg:order-2 lg:min-h-full">
        <div className="absolute inset-0 opacity-40" aria-hidden="true">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-orange-300" />
          <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full border border-orange-300" />
        </div>
        <div className="absolute inset-3 overflow-hidden rounded-[1.5rem] border border-white/80 bg-[#32180f] shadow-[0_20px_55px_rgba(124,45,18,0.22)] sm:inset-5">
          <Image
            src="/images/Special%20Doro%20Wat.jpg"
            alt="Special Ethiopian Doro Wat served with injera"
            fill
            priority
            unoptimized
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-contain transition-transform duration-700 hover:scale-[1.02]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10"
          />
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-900 shadow-lg backdrop-blur-sm sm:left-6 sm:top-6">
            Addis Eats · Signature
          </span>
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/25 bg-slate-950/40 px-4 py-3 text-white shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:px-5 sm:py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100">
              A taste of tradition
            </p>
            <p className="mt-1 text-base font-extrabold sm:text-lg">
              Doro Wat, simmered with care
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center px-6 py-10 sm:px-10 sm:py-14 lg:order-1 lg:px-12 xl:px-16">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-800 sm:text-xs">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
            Addis Eats · Ethiopian dining
          </p>

          <h1
            id="home-heading"
            className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl xl:text-6xl"
          >
            Addis Eats
          </h1>

          <p className="mt-3 text-lg font-extrabold leading-snug text-orange-800 sm:text-xl">
            Authentic Ethiopian food, made for sharing.
          </p>

          <div className="mt-5 border-l-2 border-orange-500 pl-4">
            <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-orange-800">
              A taste of home, wherever you are
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              Discover beloved Ethiopian dishes prepared with care and delivered
              with the warmth of Ethiopian hospitality. From slow-simmered Doro
              Wat to colorful fasting favorites, every meal brings people
              together around the table.
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-full border border-orange-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-700"
              >
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
            >
              Explore the menu
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
            >
              Track an order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
