'use client'
// Library Import
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SlantedBanner from '@/components/ideas/SlantedBanner';
import Image from 'next/image';

const SORT_OPTIONS = [
  { label: 'Terbaru', value: '-published_at' },
  { label: 'Terlama', value: 'published_at' },
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
    setLoading(true);
    setError('');
    
    const params = new URLSearchParams();
    params.append('page[number]', page.toString());
    params.append('page[size]', perPage.toString());
    params.append('sort', sort);

    fetch(`/api/ideas?${params.toString()}`)
      .then(res => res.json())
      .then((data) => {
        setIdeas(data.data);
        setTotal(data.meta?.total || 0);
        console.log("Data", data)
      })
      .catch(() => setError('Failed to fetch ideas'))
      .finally(() => setLoading(false));
  }, [page, perPage, sort]);

  const updateParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    router.replace(`?${newParams.toString()}`);
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <main className="py-22 w-full flex flex-col items-center gap-y-12">
      <SlantedBanner />
      <div className="w-full max-w-7xl px-4">
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <label className="flex items-center gap-2">
            Sortir:
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
            Tampilkan:
            <select
              className="border rounded px-2 py-1"
              value={perPage}
              onChange={e => updateParams({ perPage: e.target.value, page: 1 })}
            >
              {PER_PAGE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            per halaman
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
                  <div className="w-full aspect-[4/3] bg-gray-100 relative">
                    <Image
                      src="/social-media.jpg"
                      alt="Static social media image"
                      className="object-cover"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-3" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{idea.title}</h2>
                    <p className="text-gray-600">{idea.description}</p>
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
              <span>Halaman {page} dari {totalPages}</span>
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
