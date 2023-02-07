import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawgResponse, SearchResult } from './api';

const apiKey = '55429d73c4dd4beea5e20c09d50734e6';
const apiBaseUrl = 'https://api.rawg.io/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public searchGames(
    platforms: number[],
    searchTerm: string
  ): Observable<RawgResponse<SearchResult>> {
    const url = `${apiBaseUrl}/games?platforms=${platforms}&search=${searchTerm}&key=${apiKey}`;
    return this.httpClient.get<RawgResponse<SearchResult>>(url);
  }
}
