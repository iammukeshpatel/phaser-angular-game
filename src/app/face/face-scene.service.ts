import { Injectable } from '@angular/core';
import { AlignService } from 'src/app/shared/phaser/utility/align.service';
import { AlignGridService } from 'src/app/shared/phaser/utility/align-grid.service';
import 'phaser';

@Injectable({
  providedIn: 'root',
})
export class FaceSceneService extends Phaser.Scene {
  constructor(private align: AlignService) {
    super({ key: 'face' });
  }

  preload(): void {
    this.align.game = this.game;

    const png = ['bomb', 'coin', 'face'];

    png.forEach((img) => {
      this.load.image(img, `assets/bomber/${img}.png`);
    });

    this.load.image('startBtn', 'assets/bomber/coin1.png');
  }

  create(): void {
    const game: any = this.game;

    this.startGame();

    const grid = new AlignGridService({
      game: this.game,
      scene: this,
      rows: 11,
      cols: 11,
    });
    grid.showNumbers();

    const style = {
      font: 'bold 32px Arial',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
    };

    const dontClickTxt = this.add.text(10, 10, 'Dont click the Bomb', style);
    grid.placeAtIndex(36, dontClickTxt);

    const face = this.add.image(0, 0, 'face');
    this.align.center(face);
    this.align.scaleToGameW(face, 0.1);
    // grid.placeAtIndex(35, dontClickTxt);


    // To create the button
    const clickButton = this.add
      .text(100, 100, 'Start Game', { fill: '#0f0', size: '17px' })
      .setInteractive()
      .on('pointerdown', () => this.startGame());

    grid.placeAtIndex(81, clickButton);
  }

  update(): void {}

  startGame(): void {
    this.scene.start('sceneMain');
  }
}
