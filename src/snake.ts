import { Directions } from './config.ts';
import Food from './food.ts';

import WebAudioSound = Phaser.Sound.WebAudioSound;

export default class Snake {
  private headPosition: Phaser.Geom.Point;
  private body: Phaser.GameObjects.Group;
  private head: any;
  private speed: number;
  private moveTime: number;
  private tail: Phaser.Math.Vector2;
  private heading: Directions;
  private direction: Directions;
  private deathSound: Phaser.Sound.WebAudioSound;

  public alive: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.headPosition = new Phaser.Geom.Point(x, y);

    this.body = scene.add.group();

    this.head = this.body.create(x * 16, y * 16, 'body');
    this.head.setOrigin(0);

    this.alive = true;

    this.speed = 100;

    this.moveTime = 0;

    this.tail = new Phaser.Math.Vector2(x, y);

    this.heading = Directions.RIGHT;
    this.direction = Directions.RIGHT;

    this.deathSound = scene.sound.add('die') as WebAudioSound;
  }

  update(time: number) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
  }

  move(time: number) {
    /**
     * Based on the heading property (which is the direction the pgroup pressed)
     * we update the headPosition value accordingly.
     *
     * The Math.wrap call allow the snake to wrap around the screen, so when
     * it goes off any of the sides it re-appears on the other.
     */
    switch (this.heading) {
      case Directions.LEFT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
        break;

      case Directions.RIGHT:
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
        break;

      case Directions.UP:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
        break;

      case Directions.DOWN:
        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
        break;
    }

    this.direction = this.heading;

    //  Update the body segments and place the last coordinate into this.tail
    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1,
      this.tail
    );

    //  Check to see if any of the body pieces have the same x/y as the head
    //  If they do, the head ran into the body

    const hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

    if (hitBody) {
      this.deathSound.play();
      this.alive = false;

      return false;
    } else {
      //  Update the timer ready for the next movement
      this.moveTime = time + this.speed;

      return true;
    }
  }

  faceRight() {
    if (this.direction === Directions.UP || this.direction === Directions.DOWN) {
      this.heading = Directions.RIGHT;
    }
  }

  faceLeft() {
    if (this.direction === Directions.UP || this.direction === Directions.DOWN) {
      this.heading = Directions.LEFT;
    }
  }

  faceDown() {
    if (this.direction === Directions.LEFT || this.direction === Directions.RIGHT) {
      this.heading = Directions.DOWN;
    }
  }

  faceUp() {
    if (this.direction === Directions.LEFT || this.direction === Directions.RIGHT) {
      this.heading = Directions.UP;
    }
  }

  grow() {
    const newPart = this.body.create(this.tail.x, this.tail.y, 'body');

    newPart.setOrigin(0);
  }

  collideWithFood(food: Food) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.grow();

      food.eat();

      //  For every 5 items of food eaten we'll increase the snake speed a little
      if (this.speed > 20 && food.total % 5 === 0) {
        this.speed -= 5;
      }

      return true;
    }

    return false;
  }

  updateGrid(grid: any) {
    //  Remove all body pieces from valid positions list
    this.body.children.each((segment: any): boolean => {
      var bx = segment.x / 16;
      var by = segment.y / 16;

      grid[by][bx] = false;

      return true;
    });

    return grid;
  }
}
