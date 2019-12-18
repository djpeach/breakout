import 'phaser';
import breakoutPNG from '../../assets/breakout.png'
import breakoutJSON from '../../assets/breakout.json'

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.load.atlas('breakout', breakoutPNG, breakoutJSON);
  }

  create () {
    this.scene.start('Game');
  }
};
