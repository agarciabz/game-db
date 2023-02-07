import { Component } from '@angular/core';
import { BehaviorSubject, debounceTime, map, switchMap, tap } from 'rxjs';
import { ApiService } from './api/api.service';

const platforms = [7, 18, 1];
const searchTerm = '';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private searchTermSubject = new BehaviorSubject(searchTerm);
  public searchTerm$ = this.searchTermSubject.asObservable();

  private loadingSubject = new BehaviorSubject(false);
  public loading$ = this.loadingSubject.asObservable();

  private search$ = this.searchTerm$.pipe(
    debounceTime(300),
    tap(() => this.loadingSubject.next(true)),
    switchMap((term) => this.api.searchGames(platforms, term))
  );

  public result$ = this.search$.pipe(
    tap(() => this.loadingSubject.next(false)),
    map((res) => res.results)
  );

  constructor(private api: ApiService) {}

  public handleSearch(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermSubject.next(value);
  }
}
