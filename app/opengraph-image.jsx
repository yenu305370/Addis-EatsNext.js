import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Addis Eats Doro Wat served with fresh injera';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

const previewImage = readFile(
  join(process.cwd(), 'public', 'images', 'addis-eats-whatsapp-preview.jpg')
);

export default async function Image() {
  return new Response(await previewImage, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
    },
  });
}
