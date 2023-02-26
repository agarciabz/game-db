import { Component, Input } from '@angular/core';

type GameItem = {
  name: string;
};

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input()
  game!: GameItem;
}
