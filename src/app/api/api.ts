import { gameMock } from './mocks/game';
import { searchResultsMock } from './mocks/search';

export type SearchResult = typeof searchResultsMock[number];

export type GameDetail = typeof gameMock;

export type RawgResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  user_platforms: boolean;
};
