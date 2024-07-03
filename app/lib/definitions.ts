import { ReactNode, ChangeEvent } from 'react';
export type ReposListProps = {
  query: string;
  currentPage: number;
  username: string;
};

export type Repo = {
  id: string;
  query?: string;
  name: string;
  stars: number;
  lastCommit: string;
  url: string;
  owner: {
    name: string;
    url: string;
    avatarUrl: string | null;
  };
  languages: string[];
  description: string;
};

export type RootLayoutProps = {
  children: ReactNode;
};
export type InputProps = {
  index: number;
  value: string;
  onInput: onInputChange;
};
export type onInputChange = (e: ChangeEvent<HTMLInputElement>) => void;
