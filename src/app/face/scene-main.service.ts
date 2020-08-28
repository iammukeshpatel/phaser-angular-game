import { Injectable } from '@angular/core';
import { AlignService } from 'src/app/shared/phaser/utility/align.service';
import { AlignGridService } from 'src/app/shared/phaser/utility/align-grid.service';
import 'phaser';

@Injectable({
  providedIn: 'root',
})
export class SceneMainService extends Phaser.Scene {
  grid: AlignGridService;
  physicGroup: Phaser.Physics.Arcade.Group;
  gameHeight: number;
  gamewidht: number;
  faceParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  coinParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  daimondParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  score = 0;
  scoreText;
  gameOver = false;
  markers: any;
  fx;

  constructor(private align: AlignService) {
    super({ key: 'sceneMain' });
  }

  init(): void {
    this.gameHeight = this.game.config.height as number;
    this.gameHeight = this.game.config.width as number;


    this.grid = new AlignGridService({
      game: this.game,
      scene: this,
      rows: 11,
      cols: 11,
    });
    // this.grid.showNumbers();

    this.physicGroup =  this.physics.add.group();
  }

  preload(): void {
    const png = ['bomb', 'coin', 'face'];

    png.forEach((img) => {
      this.load.image(img, `assets/bomber/${img}.png`);
    });

    this.load.image('startBtn', 'assets/bomber/coin1.png');
    // this.load.image('daimond', 'assests/daimonds/single.png');


    this.load.image('daimond', 'assets/bomber/daimonds/single.png');

    this.load.audio('sfx', [
      'assets/audio/magical_horror_audiosprite.ogg',
      'assets/audio/magical_horror_audiosprite.mp3'
    ]);

    this.markers = [
      { name: 'charm', start: 0, duration: 2.7, config: {} },
      { name: 'curse', start: 4, duration: 2.9, config: {} },
      { name: 'fireball', start: 8, duration: 5.2, config: {} },
      { name: 'spell', start: 14, duration: 2.7, config: {} },
      { name: 'soundscape', start: 20, duration: 18.8, config: {} }
  ];
  }

  create(): void {
    const style = {
      font: 'bold 32px Arial',
      fill: '#fff',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
    };

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.fx = this.sound.add('sfx');

    this.markers.forEach(marker => {
      this.fx.addMarker(marker);
    });

    // const face = this.add.image(0, 0, 'face');
    // const face2 = this.add.image(0, 0, 'face');

    // this.align.center(face);
    // this.align.center(face2);
    // this.align.scaleToGameW(face, 0.1);
    // this.align.scaleToGameW(face2, 0.1);

    this.dropBomb();
    this.faceParticles = this.createParticales('face');
    this.coinParticles = this.createParticales('coin');
    this.daimondParticles = this.createParticales('daimond');

    this.time.addEvent({
      delay: 1000,
      callback: this.dropBomb.bind(this),
      loop: true
    });

    // window.scene = this;

    this.input.on('gameobjectdown', this.clickElement);

  }

  createParticales(name): Phaser.GameObjects.Particles.ParticleEmitterManager {
    const particles = this.add.particles(name);

    particles.createEmitter({
      x: 400,
      y: 300,
      // speed: { min: -800, max: 800 },
      speed: 200,
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      // blendMode: 'SCREEN',
      blendMode: 'ADD',
      // active: false,
      lifespan: 800,
      // gravityY: 800,
      on: false
    });

    return particles;
  }

  dropBomb(): void {
    const elementList = ['bomb', 'coin', 'face'];
    const element = elementList[Math.floor(Math.random() * elementList.length)];
    const pos = Phaser.Math.Between(0, 10);

    const elementInstance: any = this.placeImage(element, pos, .1, true);
    elementInstance.type = element;
    elementInstance.type1 = 'falling';
    elementInstance.setInteractive();
    this.physicGroup.add(elementInstance, true);

    // elementInstance.body.setVelocityY(100);
    elementInstance.body.setGravityY(100);

  }

  clickElement = (position, element): void => {
    console.log(element);
    if (element.type1 !== 'falling') {
      return;
    }

    if (element.type === 'face') {
      this.fx.play('charm');
      // this.faceParticles.emitParticleAt(element.x, element.y, 50);
      this.score += 1;
    } else if (element.type === 'coin') {
      this.fx.play('charm');
      // this.coinParticles.emitParticleAt(element.x, element.y, 50);
      this.score += 1;
    } else if (element.type === 'bomb') {
      this.fx.play('fireball');
      this.gameOver = true;
      this.add.text(800 / 2, 600 / 2, 'Game Over', { fill: '#fff' });
      this.scene.pause('sceneMain');
      return;
    }

    this.scoreText.setText('Score: ' + this.score);
    this.daimondParticles.emitParticleAt(element.x, element.y, 50);

    element.destroy();


  }

  placeImage(imgKey: string, position, scale, physics = false): void {
    let image;

    if (physics) {
      image = this.physics.add.sprite(0, 0, imgKey);
    } else {
      image = this.add.sprite(0, 0, imgKey);
    }

    if (isNaN(position)) {
      this.grid.placeAt(position.x, position.y, image);
    } else {
      this.grid.placeAtIndex(position, image);
    }

    if ( scale !== -1) {
      this.align.scaleToGameW(image, scale);
    }

    return image;
  }

  makeUI(): void {

  }

  update(): void {
      
    this.physicGroup.children.entries.forEach(function(child: any): void {
      // console.log(child);
      if (child && child.y === this.gameHeight / 2) {
        child.destroy();
      }
    }.bind(this));
  }
}
