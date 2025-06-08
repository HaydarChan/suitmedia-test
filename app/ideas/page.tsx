'use client'
// Library Import
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
// Components Import
import SlantedBanner from '@/components/ideas/SlantedBanner';
import SortControls from '@/components/ideas/SortControls';
import IdeaCard from '@/components/ideas/IdeaCard';
import Pagination from '@/components/ideas/Pagination';

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
        console.log(data.data)
      })
      .catch(() => setError('Failed to fetch ideas'))
      .finally(() => setLoading(false));
  }, [page, perPage, sort]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <main className="py-22 w-full flex flex-col items-center gap-y-12">
      <SlantedBanner />
      <div className="w-full max-w-7xl px-4">
        <SortControls total={total} />
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea: any) => (
                <IdeaCard
                  key={idea.id}
                  title={idea.title}
                  description={idea.description}
                  created_at={idea.created_at}
                />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
          </>
        )}
      </div>
    </main>
  );
}
