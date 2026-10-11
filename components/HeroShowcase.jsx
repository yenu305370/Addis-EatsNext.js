'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const slides = [
  { image: '/images/Special%20Doro%20Wat.jpg', alt: 'A traditional Doro Wat feast, served with injera', eyebrow: 'Welcome to Addis Eats', title: 'Taste Ethiopia.', accent: 'Share the moment.', description: 'Share the dishes that bring people together. From slow-simmered Doro Wat to colorful fasting favorites, discover Ethiopian cooking made for the middle of the table.', dish: 'The Doro Wat', note: 'A little spice. A lot of soul.' },
  { image: '/images/ethiopian-beyaynetu.jpg', alt: 'A colorful Ethiopian Beyaynetu spread arranged over injera', eyebrow: 'Color for the table', title: 'Gather around.', accent: 'Taste every color.', description: 'Build a table full of vibrant plant-based favorites, generous portions, and flavors made to be passed around.', dish: 'The Beyaynetu', note: 'A little of everything, made to share.' },
  { image: '/images/Tender%20Gored%20Gored.jpg', alt: 'Ethiopian Gored Gored beef served with injera', eyebrow: 'Made for sharing', title: 'Pass the injera.', accent: 'Make it a moment.', description: 'Bring friends and family together over bold Ethiopian flavors, prepared with care and delivered to your table.', dish: 'Gored Gored', note: 'Bold, bright, and ready for the table.' },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const changeSlide = (direction) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section aria-label="Featured Ethiopian dishes" aria-roledescription="carousel" className="group relative isolate grid overflow-hidden rounded-[1.5rem] bg-[#f2e8d9] text-[#251711] shadow-[0_25px_75px_rgba(58,32,19,0.13)] transition-shadow duration-500 hover:shadow-[0_30px_90px_rgba(58,32,19,0.22)] sm:rounded-[2rem] lg:min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative z-10 flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 xl:px-16">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-orange-800">
          <span className="h-px w-8 bg-orange-600" /> Addis Eats · Ethiopian kitchen
        </div>
        <div key={slide.eyebrow} aria-live="polite" className="py-10 lg:py-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">{slide.eyebrow}</p>
          <h1 id="home-heading" className="max-w-xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
            {slide.title}<br /><span className="font-normal italic text-orange-700">{slide.accent}</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">{slide.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#292018] px-7 py-4 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">Explore the menu <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></Link>
            <a href="#our-story" className="inline-flex items-center justify-center rounded-full border border-[#d5c5b0] px-7 py-4 text-sm font-bold text-[#35271e] transition duration-200 hover:-translate-y-1 hover:border-orange-700 hover:bg-white/70 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">Our story</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d9c9b5] pt-5">
          <p className="text-xs font-semibold text-stone-600">Cooked with care · Rooted in tradition</p>
          <div className="flex items-center gap-2" aria-label="Choose a featured dish">
            <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous featured dish" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cbb9a2] transition duration-200 hover:scale-110 hover:border-orange-600 hover:bg-white hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-orange-700">←</button>
            {slides.map((item, index) => <button key={item.eyebrow} type="button" onClick={() => setActive(index)} aria-label={`Show ${item.dish}`} aria-pressed={active === index} className={`h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${active === index ? 'w-7 bg-orange-700' : 'w-2.5 bg-[#c9b8a3] hover:bg-orange-500'}`} />)}
            <button type="button" onClick={() => changeSlide(1)} aria-label="Next featured dish" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cbb9a2] transition duration-200 hover:scale-110 hover:border-orange-600 hover:bg-white hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-orange-700">→</button>
          </div>
        </div>
      </div>
      <div className="relative min-h-[360px] overflow-hidden bg-[#4a2e1d] sm:min-h-[480px] lg:min-h-[650px]">
        <Image key={slide.image} src={slide.image} alt={slide.alt} fill loading={active === 0 ? 'eager' : 'lazy'} fetchPriority={active === 0 ? 'high' : 'auto'} sizes="(max-width: 1023px) 100vw, 52vw" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06] group-hover:saturate-110" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1c100c]/50 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8">
          <p className="rounded-full border border-white/40 bg-[#21130f]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">Gather · Share · Enjoy</p>
          <div className="max-w-52 rounded-2xl border border-white/40 bg-[#fffaf3]/95 p-4 shadow-xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl sm:p-5">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-800">From our kitchen</p>
            <p className="mt-1 font-serif text-lg italic text-[#251711]">{slide.dish}</p>
            <p className="mt-1 text-[11px] leading-5 text-stone-600">{slide.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
