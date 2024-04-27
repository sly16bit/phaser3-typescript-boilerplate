import Phaser from 'phaser';

import Food from './food.ts';
import Snake from './snake.ts';

export default class Game extends Phaser.Scene {
  private food?: Food;
  private snake?: Snake;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    this.load.image('food', 'assets/food.png');
    this.load.image('body', 'assets/body.png');
    this.load.audio('eat', 'assets/eat.wav');
    this.load.audio('die', 'assets/die.wav');
  }

  create() {
    this.food = new Food(this, 3, 4);
    this.snake = new Snake(this, 8, 8);

    //  Create our keyboard controls
    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  update(time: number) {
    if (!this.snake?.alive) {
      return;
    }

    /**
     * Check which key is pressed, and then change the direction the snake
     * is heading based on that. The checks ensure you don't double-back
     * on yourself, for example if you're moving to the right and you press
     * the LEFT cursor, it ignores it, because the only valid directions you
     * can move in at that time is up and down.
     */
    if (this.cursors?.left.isDown) {
      this.snake.faceLeft();
    } else if (this.cursors?.right.isDown) {
      this.snake.faceRight();
    } else if (this.cursors?.up.isDown) {
      this.snake.faceUp();
    } else if (this.cursors?.down.isDown) {
      this.snake.faceDown();
    }

    if (this.snake.update(time)) {
      //  If the snake updated, we need to check for collision against food

      if (this.snake.collideWithFood(this.food!)) {
        this.repositionFood();
      }
    }
  }

  /**
   * We can place the food anywhere in our 40x30 grid
   * *except* on-top of the snake, so we need
   * to filter those out of the possible food locations.
   * If there aren't any locations left, they've won!
   *
   * @method repositionFood
   * @return {boolean} true if the food was placed, otherwise false
   */
  repositionFood(): boolean {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    const testGrid: boolean[][] = [];

    for (let y = 0; y < 30; y++) {
      testGrid[y] = [];

      for (let x = 0; x < 40; x++) {
        testGrid[y][x] = true;
      }
    }

    this.snake?.updateGrid(testGrid);

    //  Purge out false positions
    const validLocations = [];

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        if (testGrid[y][x]) {
          //  Is this position valid for food? If so, add it here ...
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length) {
      //  Use the RNG to pick a random food position
      const pos = Phaser.Math.RND.pick(validLocations);

      //  And place it
      this.food?.setPosition(pos.x * 16, pos.y * 16);

      return true;
    }

    return false;
  }
}
