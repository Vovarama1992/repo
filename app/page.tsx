/* eslint-disable react/react-in-jsx-scope */
import MailingList from './ReposList';
import Search from './Search';
import Pagination from './Pagination';
import { Suspense } from 'react';
import Skeleton from './Skeleton';
import { fetchCommon } from './lib/fetchers';
import Modal from './Modal';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    showGifts?: boolean;
    item?: string;
    date?: string;
    num?: string;
    username?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCommon(query);

  const username = searchParams?.username || '';
  return (
    <>
      {!username ? (
        <Modal />
      ) : (
        <>
          <Search />
          <Suspense fallback={<Skeleton />}>
            <MailingList
              query={query}
              username={username}
              currentPage={currentPage}
            />
          </Suspense>
          <Pagination totalPages={totalPages} />
        </>
      )}
    </>
  );
}
