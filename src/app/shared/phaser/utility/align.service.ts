import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlignService {
  game: any;

  constructor() {}

  scaleToGameW(obj, per): void {
    obj.displayWidth = this.game.config.width * per;
    obj.scaleY = obj.scaleX;
  }

  centerH(obj): void {
    obj.x = this.game.config.width / 2 - obj.displayWidth / 2;
  }

  centerV(obj): void {
    obj.y = this.game.config.height / 2 - obj.displayHeight / 2;
  }

  center2(obj): void {
    obj.x = this.game.config.width / 2 - obj.displayWidth / 2;
    obj.y = this.game.config.height / 2 - obj.displayHeight / 2;
  }

  center(obj): void {
    obj.x = this.game.config.width / 2;
    obj.y = this.game.config.height / 2;
  }
}
