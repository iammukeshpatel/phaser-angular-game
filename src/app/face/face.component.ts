import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FaceSceneService } from './face-scene.service';
import { SceneMainService } from './scene-main.service';
import 'phaser';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class FaceComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') el: ElementRef;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  keyPressed = '';

  constructor(private faceScene: FaceSceneService, private sceneMainService: SceneMainService) {}

  ngOnInit(): void {
    this.config = {
      type: Phaser.CANVAS,
      height: 600,
      width: 800,
      scene: [this.faceScene, this.sceneMainService],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
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
