'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function MenuSearch({ value, onChange }) {
  const [query, setQuery] = useState(value);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    onChange(debouncedQuery);
  }, [debouncedQuery, onChange]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <label className="relative block w-full md:max-w-sm">
      <span className="sr-only">Search dishes</span>
      <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        ⌕
      </span>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search dishes or ingredients"
        className="menu-search pr-4"
      />
    </label>
  );
}
