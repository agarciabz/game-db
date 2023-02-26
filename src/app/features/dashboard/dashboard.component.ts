import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, map, switchMap, tap } from 'rxjs';
import { ApiService } from '../../api/api.service';

const platforms = [7, 18, 1];
const searchTerm = '';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private searchTermSubject = new BehaviorSubject(searchTerm);
  public searchTerm$ = this.searchTermSubject.asObservable();

  private loadingSubject = new BehaviorSubject(false);
  public loading$ = this.loadingSubject.asObservable();

  private search$ = this.searchTerm$.pipe(
    debounceTime(300),
    tap(() => this.loadingSubject.next(true)),
    switchMap((term) => this.api.searchGames(platforms, term))
  );

  public results$ = this.search$.pipe(
    tap(() => this.loadingSubject.next(false)),
    map((res) => res.results)
  );

  constructor(private api: ApiService, private router: Router) {}

  public handleSearch(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermSubject.next(value);
  }

  public navigate(id: number) {
    this.router.navigateByUrl(`/game/${id.toString()}`);
  }
}
