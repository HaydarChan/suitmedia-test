'use client';

import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => updateParams({ page: currentPage - 1 })}
        disabled={currentPage <= 1}
      >
        Prev
      </button>
      <span>Halaman {currentPage} dari {totalPages}</span>
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => updateParams({ page: currentPage + 1 })}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
} 