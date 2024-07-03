/* eslint-disable react/react-in-jsx-scope */
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const isBanLeft = currentPage <= 1;
  const isBanRight = currentPage >= totalPages;

  let pageNumbers = [];
  if (currentPage <= 5) {
    pageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
  } else {
    pageNumbers = Array.from({ length: 10 }, (_, i) => currentPage - 5 + i + 1);
  }

  return (
    <>
      <div className={styles.pagination}>
        <div className={styles.left}>
          <Link href={createPageURL(currentPage - 1)}>
            <button disabled={isBanLeft} className={styles.button}></button>
          </Link>
        </div>
        <div className={`${styles.left} ${styles.right}`}>
          <Link href={createPageURL(currentPage + 1)}>
            <button disabled={isBanRight} className={styles.button}></button>
          </Link>
        </div>
        <div></div>
      </div>

      <div>
        {pageNumbers.map((page) => (
          <Link key={page} href={createPageURL(page)}>
            <button>{page}</button>
          </Link>
        ))}
      </div>
    </>
  );
}
