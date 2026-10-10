import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Addis Eats | Authentic Ethiopian Dining';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          border: '16px solid #f59e0b',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#f59e0b',
            letterSpacing: '2px',
          }}
        >
          ADDIS EATS
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 16,
            color: '#d1d5db',
          }}
        >
          Authentic Ethiopian Dining Experience
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}