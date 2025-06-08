'use client'
// Library Import
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
// Components Import
import SlantedBanner from '@/components/ideas/SlantedBanner';

const SORT_OPTIONS = [
  { label: 'Latest', value: '-published_at' },
  { label: 'Oldest', value: 'published_at' },
];
const PER_PAGE_OPTIONS = [10, 20, 50];

export default function IdeasPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ideas, setIdeas] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const sort = (searchParams.get('sort') === 'published_at' ? 'published_at' : '-published_at') as '-published_at' | 'published_at';

  useEffect(() => {
    console.log('useEffect triggered with:', { page, perPage, sort });
    setLoading(true);
    setError('');
    
    const params = new URLSearchParams();
    params.append('page[number]', page.toString());
    params.append('page[size]', perPage.toString());
    params.append('sort', sort);

    fetch(`/api/ideas?${params.toString()}`)
      .then(res => {
        if (!res.ok) {
          console.error('API Response not OK:', res.status, res.statusText);
          throw new Error(`API error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('API Data received:', data);
        setIdeas(data.data);
        setTotal(data.meta?.total || 0);
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
        setError(`Failed to fetch ideas: ${err.message || 'Unknown error'}`);
      })
      .finally(() => setLoading(false));
  }, [page, perPage, sort]);

  const updateParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    router.replace(`?${newParams.toString()}`);
  };

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const totalPages = Math.ceil(total / perPage);

  return (
    <main className="py-22 w-full flex flex-col items-center gap-y-12">
      <SlantedBanner />
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-4xl font-bold mb-8">Ideas</h1>
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
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea: any) => (
                <div key={idea.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="w-full aspect-[4/3] relative">
                    <Image
                      src="/software.png"
                      alt="Static software image"
                      className="object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="px-4 flex-1 flex flex-col">
                    <p className="text-sm text-gray-500 mt-auto">{new Date(idea.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h2 className="text-xl font-semibold mb-2 line-clamp-3" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{idea.title}</h2>
                    <p className="text-gray-600 mb-2">{idea.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => updateParams({ page: page - 1 })}
                disabled={page <= 1}
              >
                Prev
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => updateParams({ page: page + 1 })}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
