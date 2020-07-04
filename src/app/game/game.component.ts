import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MainSceneService } from './main-scene.service';
import 'phaser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') el: ElementRef;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  keyPressed = '';

  constructor(private mainScene: MainSceneService) {}

  ngOnInit(): void {
    this.config = {
      type: Phaser.CANVAS,
      height: 600,
      width: 800,
      scene: [this.mainScene],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 },
        },
      },
    };
  }

  ngAfterViewInit(): void {
    this.config.canvas = this.el.nativeElement;
    this.game = new Phaser.Game(this.config);
  }
}
