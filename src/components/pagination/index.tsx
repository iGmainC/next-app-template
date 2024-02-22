'use client';
import { Pagination as NextUiPagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Pagination({
  total,
  queryKey,
}: {
  total: number;
  queryKey: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(queryKey)) || 1;
  const router = useRouter();
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === 1) params.delete(queryKey);
    else params.set(queryKey, pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <NextUiPagination
      total={total}
      initialPage={currentPage}
      onChange={(page) => {
        const url = createPageURL(page);
        router.push(url);
      }}
    />
  );
}
