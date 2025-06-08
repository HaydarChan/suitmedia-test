'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const SORT_OPTIONS = [
  { label: 'Latest', value: '-published_at' },
  { label: 'Oldest', value: 'published_at' },
];
const PER_PAGE_OPTIONS = [10, 20, 50];

interface SortControlsProps {
  total: number;
}

export default function SortControls({ total }: SortControlsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const sort = (searchParams.get('sort') === 'published_at' ? 'published_at' : '-published_at') as '-published_at' | 'published_at';

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const updateParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <span className="text-gray-600">
        Showing {start} - {end} of {total}
      </span>
      <label className="flex items-center gap-2">
        Sort by:
        <select
          className="border rounded px-2 py-1"
          value={sort}
          onChange={e => updateParams({ sort: e.target.value, page: 1 })}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        Show:
        <select
          className="border rounded px-2 py-1"
          value={perPage}
          onChange={e => updateParams({ perPage: e.target.value, page: 1 })}
        >
          {PER_PAGE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        per page
      </label>
    </div>
  );
} 