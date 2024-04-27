import WebAudioSound = Phaser.Sound.WebAudioSound;

export default class Food extends Phaser.GameObjects.Image {
  private eatSound: Phaser.Sound.WebAudioSound;
  public total: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'food');

    this.total = 0;
    this.eatSound = scene.sound.add('eat') as WebAudioSound;

    this.setPosition(x * 16, y * 16);
    this.setOrigin(0);

    scene.children.add(this);
  }

  eat() {
    this.total++;

    this.eatSound.play();
  }
}
