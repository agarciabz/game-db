import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDetail, RawgResponse, SearchResult } from './api';

const apiKey = '55429d73c4dd4beea5e20c09d50734e6';
const apiBaseUrl = 'https://api.rawg.io/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // TODO Abstract service to include api key in all requests
  public searchGames(
    platforms: number[],
    searchTerm: string
  ): Observable<RawgResponse<SearchResult>> {
    const url = `${apiBaseUrl}/games?platforms=${platforms}&search=${searchTerm}&key=${apiKey}`;
    return this.httpClient.get<RawgResponse<SearchResult>>(url);
  }

  public getGameById(id: string): Observable<GameDetail> {
    const url = `${apiBaseUrl}/games/${id}?key=${apiKey}`;
    return this.httpClient.get<GameDetail>(url);
  }
}
