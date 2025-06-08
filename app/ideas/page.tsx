// app/ideas/page.tsx
import { Suspense } from 'react';
import SlantedBanner from '@/components/ideas/SlantedBanner';
import IdeasPageClient from '@/components/ideas/IdeasPageClient';

export default function IdeasPage() {
  return (
    <main className="py-22 w-full flex flex-col items-center gap-y-12">
      <SlantedBanner />
      <Suspense fallback={<div>Loading ideas...</div>}>
        <IdeasPageClient />
      </Suspense>
    </main>
  );
}
