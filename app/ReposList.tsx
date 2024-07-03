/* eslint-disable react/react-in-jsx-scope */
'use server';
import styles from './page.module.scss';
import Repo from './ui/repo';
import { fetchRepositories } from './lib/fetchers';
import { Repo as RepoType, ReposListProps } from './lib/definitions';

export default async function ReposList({
  query,
  currentPage,
  username,
}: ReposListProps) {
  const queryToFind = query ? query : username;
  const first = 10;
  const offset = (currentPage - 1) * first;

  const repos: RepoType[] = await fetchRepositories(queryToFind, first, offset);

  return (
    <div className={styles.repoList}>
      {repos.map((repo) => (
        <Repo
          key={repo.id}
          query={query}
          id={repo.id}
          name={repo.name}
          stars={repo.stars}
          lastCommit={repo.lastCommit}
          url={repo.url}
          owner={repo.owner}
          languages={repo.languages}
          description={repo.description}
        />
      ))}
    </div>
  );
}
