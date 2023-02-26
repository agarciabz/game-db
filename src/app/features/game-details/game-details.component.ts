import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent {
  private loadingSubject = new BehaviorSubject(false);
  public loading$ = this.loadingSubject.asObservable();

  public gameId$ = this.route.params.pipe(
    map((params) => params['id'] as string)
  );

  public game$ = this.gameId$.pipe(
    tap(() => this.loadingSubject.next(true)),
    switchMap((id) => this.api.getGameById(id)),
    tap(() => this.loadingSubject.next(false))
  );

  constructor(private route: ActivatedRoute, private api: ApiService) {}
}
