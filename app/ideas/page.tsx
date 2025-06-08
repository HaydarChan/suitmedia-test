// app/ideas/page.tsx
import { Suspense } from 'react';
import SlantedBanner from '@/components/ideas/SlantedBanner';
import SortControls from '@/components/ideas/SortControls';
import IdeaCard from '@/components/ideas/IdeaCard';
import Pagination from '@/components/ideas/Pagination';
import { GET as ideasApiHandler } from '@/app/api/ideas/route';

import { headers } from 'next/headers';

async function getIdeas(page: number, perPage: number, sort: string) {
  const params = new URLSearchParams();
  params.append('page[number]', page.toString());
  params.append('page[size]', perPage.toString());
  params.append('sort', sort);

  const mockRequest = {
    nextUrl: {
      searchParams: params,
    },
  } as any;

  const response = await ideasApiHandler(mockRequest);
  if (!response.ok) {
    throw new Error(`Failed to fetch ideas: ${response.statusText}`);
  }
  return response.json();
}

export default async function IdeasPage() {
  const headersList = await headers();
  const fullUrl = headersList.get('x-url') || '';
  const url = new URL(fullUrl || 'http://localhost:3000/ideas');

  const searchParams = url.searchParams;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const sortParam = searchParams.get('sort');
  const sort = sortParam === 'published_at' ? 'published_at' : '-published_at';

  const data = await getIdeas(page, perPage, sort);
  const ideas = data.data;
  const total = data.meta?.total || 0;
  const totalPages = Math.ceil(total / perPage);

  return (
    <main className="py-22 w-full flex flex-col items-center gap-y-12">
      <SlantedBanner />
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-4xl font-bold mb-8">Ideas</h1>
        <Suspense fallback={<div>Loading controls...</div>}>
          <SortControls total={total} />
        </Suspense>
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
        <Suspense fallback={<div>Loading pagination...</div>}>
          <Pagination currentPage={page} totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
