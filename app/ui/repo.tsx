/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link';
import { Repo as RepoType } from '../lib/definitions';
import styles from '../page.module.scss';

export default function Repo({
  id,
  name,
  stars,
  lastCommit,
  url,
  owner,
  languages,
  description,
  query,
}: RepoType) {
  const fixedName = encodeURIComponent(name);
  const fixedOwnerName = encodeURIComponent(owner.name);
  const fixedOwnerUrl = encodeURIComponent(owner.url);
  const fixedOwnerAvatarUrl = owner.avatarUrl
    ? encodeURIComponent(owner.avatarUrl)
    : '';
  const fixedLanguages = encodeURIComponent(languages.join(','));
  const fixedDescription = encodeURIComponent(description);

  return (
    <div className={styles.mailing} id={id}>
      <div className={styles.Element}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </div>
      <div className={styles.Element}>Stars: {stars}</div>
      <div className={styles.Element}>
        Last Commit: {new Date(lastCommit).toLocaleDateString()}
      </div>
      <div className={styles.Element}>
        Owner:{' '}
        <a href={owner.url} target="_blank" rel="noopener noreferrer">
          {owner.name}
        </a>
      </div>

      <div className={styles.redactor}>
        <Link
          href={`/repoeditor?id=${id}&username=${fixedName}&query=${query}&stars=${stars}&lastCommit=${lastCommit}&url=${url}&ownerName=${fixedOwnerName}&ownerUrl=${fixedOwnerUrl}&ownerAvatarUrl=${fixedOwnerAvatarUrl}&languages=${fixedLanguages}&description=${fixedDescription}`}
        >
          <button className={styles.button}></button>
        </Link>
      </div>
    </div>
  );
}
