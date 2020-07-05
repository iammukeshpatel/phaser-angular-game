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

    this.load.image('face', 'assets/smiley.png');
  }

  create(): void {
    const game: any = this.game;

    const face = this.add.image(0, 0, 'face');
    const face2 = this.add.image(0, 0, 'face');

    this.align.center(face);
    this.align.scaleToGameW(face, 0.1);
    this.align.scaleToGameW(face2, 0.1);

    // face.x = game.config.width * 0.2;

    const grid = new AlignGridService({
      game: this.game,
      scene: this,
      rows: 11,
      cols: 11,
    });
    grid.showNumbers();
    grid.placeAtIndex(35, face);

    /*Ï
    const block = new UIBlock();
    block.add(face);
    block.add(face2);
    block.x = 200;
    */
  }

  update(): void {}
}
