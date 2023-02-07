import { searchResultsMock } from './mocks';

export type SearchResult = typeof searchResultsMock[number];

export type RawgResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  user_platforms: boolean;
};
