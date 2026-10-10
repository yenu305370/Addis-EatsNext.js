// app/sitemap.js
import { dishes } from '@/lib/data';
import { siteUrl } from '@/lib/site';

const SITE_LAST_UPDATED = new Date('2026-10-01');

export default function sitemap() {
  const dishUrls = dishes.map((dish) => ({
    url: `${siteUrl}/menu/${dish.id}`,
    lastModified: dish.updatedAt ? new Date(dish.updatedAt) : SITE_LAST_UPDATED,
  }));

  return [
    { url: siteUrl, lastModified: SITE_LAST_UPDATED },
    { url: `${siteUrl}/menu`, lastModified: SITE_LAST_UPDATED },
    ...dishUrls,
  ];
}