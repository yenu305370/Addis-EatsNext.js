export default function JsonLd({ dish }) {
  const schema = {
    '@context': '[link removed]',
    '@type': 'MenuItem',
    name: dish.name,
    description: dish.description,
    offers: {
      '@type': 'Offer',
      price: dish.price,
      priceCurrency: 'ETB',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}