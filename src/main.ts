import Phaser from 'phaser';

import Game from './game.ts';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  backgroundColor: '#bfcc00',
  parent: 'app',
  scene: [Game]
};

export default new Phaser.Game(config);
