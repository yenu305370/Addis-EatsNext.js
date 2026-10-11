import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Addis Eats | Authentic Ethiopian Dining';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return readFile(join(process.cwd(), 'public', 'images', 'Special Doro Wat.jpg')).then((photo) =>
    new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#21130f', color: '#fff' }}>
        <div style={{ display: 'flex', width: '54%', height: '100%', overflow: 'hidden' }}>
          <img
            src={`data:image/jpeg;base64,${photo.toString('base64')}`}
            alt="Ethiopian Doro Wat served with injera"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '46%', padding: '52px', borderLeft: '8px solid #f59e0b' }}>
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, letterSpacing: '5px', color: '#fbbf24', marginBottom: 24 }}>ADDIS EATS</div>
          <div style={{ display: 'flex', fontSize: 54, lineHeight: 1.05, fontWeight: 900 }}>A taste of tradition</div>
          <div style={{ display: 'flex', fontSize: 27, lineHeight: 1.35, color: '#f3e8df', marginTop: 22 }}>Doro Wat, simmered with care.</div>
          <div style={{ display: 'flex', fontSize: 20, color: '#fbbf24', marginTop: 36 }}>AUTHENTIC ETHIOPIAN DINING</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
    )
  );
}
