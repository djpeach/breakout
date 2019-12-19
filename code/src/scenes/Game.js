import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
    this.paddle;
    this.bricks;
    this.ball;
    this.speed = window.innerWidth / 3.4;
    this.ballInHand = true;
  }

  init(data) {
  }

  preload () {
    this.scale.on('resize', this.resize, this);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      b_1: Phaser.Input.Keyboard.KeyCodes.Q,
      b_2: Phaser.Input.Keyboard.KeyCodes.E,
    });

    this.addEvents();
  }

  create () {
    this.physics.world.setBoundsCollision(true, true, true, false);
    this.addBricks();
    this.paddle = this.physics.add.image(window.innerWidth / 2, window.innerHeight - 129, 'breakout', 'paddle.png').setImmovable().setCollideWorldBounds();
    this.ball = this.physics.add.image(this.paddle.x, this.paddle.y - 32, 'breakout', 'ball.png').setBounce(1).setCollideWorldBounds();
    this.addCollisions();
  }

  update(time, delta) {
    let speed = this.speed;
    if (this.cursors.b_1.isDown) { speed *= 1.6 }
    if (this.cursors.left.isDown) {
      if (this.ballInHand) {
        this.ball.setVelocityX(-speed);
      }
      this.paddle.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      if (this.ballInHand) {
        this.ball.setVelocityX(speed);
      }
      this.paddle.setVelocityX(speed);
    } else {
      if (this.ballInHand) {
        this.ball.setVelocityX(0);
      }
      this.paddle.setVelocity(0);
    }

    if (this.ball.y > this.paddle.y) {
      this.ball.setTint(0xff0000);
      this.ball.setVelocity(0);
      this.ball.setY(this.paddle.y + 32);
    }
  }

  addEvents() {
    this.cursors.b_1.on('down', () => {
      if (this.ballInHand) {
        this.ballInHand = false;
        this.ball.setVelocityY(-400);
      } else if (this.ball.y > this.paddle.y) {
        this.ball.setTint(0xffffff);
        this.paddle.setX(window.innerWidth / 2);
        this.ball.setPosition(this.paddle.x, this.paddle.y - 32);
        this.ballInHand = true;
      }
    });
  }

  addBricks() {
    this.bricks = this.physics.add.staticGroup({
      key: 'breakout', frame: ['red.png', 'yellow.png', 'green.png', 'blue.png', 'purple.png', 'grey.png'], // the packed texture and frames from the atlas to use
      frameQuantity: Math.floor(window.innerWidth / 64) - 2, // the amount of times to add each frame
      gridAlign: { width: Math.floor(window.innerWidth / 64) - 2, height: 6, cellWidth: 64, cellHeight: 32, x: 32 + 64, y: 16 + 32 * 2}, // align the items in a grid defined by the config
    });
  }

  addCollisions() {
    this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
  }

  hitBrick(ball, brick) {
    brick.disableBody(true, true);
  }

  hitPaddle(ball, paddle) {
    ball.setVelocityX((ball.x - paddle.x) * 10);
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
  }
};
