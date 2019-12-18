import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init(data) {
  }

  preload () {
    this.scale.on('resize', this.resize, this);
  }

  create () {
    this.logo = this.add.sprite(window.innerWidth / 2, 150, 'logo');

    this.tweens.add({
      targets: this.logo,
      y: window.innerHeight - 175,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }

  resize (gameSize, baseSize, displaySize, resolution) {
    let width = gameSize.width;
    let height = gameSize.height;
    if (width === undefined) {
      width = this.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
    this.logo.setX(width / 2);
  }
};
