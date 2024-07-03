/* eslint-disable react/react-in-jsx-scope */
'use client';

import styles from '../page.module.scss';
import Skeleton from '../Skeleton';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Repo } from '../lib/definitions';

export default function RepoCard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DetailedRepoCard />
    </Suspense>
  );
}

function DetailedRepoCard() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams as unknown as string);
  const query = searchParams.get('query') || '';
  const username = searchParams.get('username') || '';
  const initialObj: Repo = {
    id: params.get('id') as string,
    name: params.get('name') as string,
    stars: parseInt(params.get('stars') as string),
    lastCommit: params.get('lastCommit') as string,
    url: params.get('url') as string,
    owner: {
      name: params.get('ownerName') as string,
      url: params.get('ownerUrl') as string,
      avatarUrl: params.get('ownerAvatarUrl'),
    },
    languages: params.get('languages')?.split(',') || [],
    description: params.get('description') as string,
  };

  const [repo] = useState<Repo>(initialObj);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardElement}>Stars: {repo.stars}</div>
        <div className={styles.cardElement}>
          Last Commit: {new Date(repo.lastCommit).toLocaleDateString()}
        </div>
        <div className={styles.cardElement}>
          Owner:{' '}
          <a href={repo.owner.url} target="_blank" rel="noopener noreferrer">
            {repo.owner.name}
          </a>
        </div>
        <div className={styles.cardElement}>
          {repo.owner.avatarUrl && (
            <img
              src={repo.owner.avatarUrl}
              alt={repo.owner.name}
              className={styles.avatar}
            />
          )}
        </div>
        <div className={styles.cardElement}>
          Languages: {repo.languages.join(', ')}
        </div>
        <div className={styles.cardElement}>
          Description: {repo.description}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link
          href={`/?username=${encodeURIComponent(username)}&query=${encodeURIComponent(query)}`}
        >
          <button type="button" className={styles.backButton}>
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
