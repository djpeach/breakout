import 'phaser';
import logo from '../../assets/logo.png'

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  preload () {
    this.load.image('logo', logo);
  }

  create () {
    this.scene.start('Game');
  }
};
