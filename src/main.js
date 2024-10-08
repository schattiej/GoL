// Bring in the phaser library
import Phaser from 'phaser'

import CONFIG from './config.js'

// Bringing in our base example scene
import ExampleScene from './scenes/Example.js'
import StartScene from './scenes/Start.js'
import MenuScene from './scenes/Menu.js'
import ChoiceTwoScene from './scenes/ChoiceTwoScene.js'
import ChoiceThreeScene from './scenes/ChoiceThreeScene.js'
//import CustomButtonDemoScene from './scenes/CustomButtonDemoScene.ts'

const config = {
  // Configure Phaser graphics settings
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: CONFIG.DEFAULT_WIDTH,
    height: CONFIG.DEFAULT_HEIGHT
  },
  antialias: true,

  // Configure physics settings
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: CONFIG.DEFAULT_GRAVITY },
      debug: __DEV__
    }
  }
}

// Initialize the base phaser game object (must always be done once)
const game = new Phaser.Game(config)


// Add an auto-starting ExampleScene
game.scene.add('StartScene', StartScene)
game.scene.add('MenuScene', MenuScene)
game.scene.add('ExampleScene', ExampleScene)
game.scene.add('ChoiceTwoScene', ChoiceTwoScene)
game.scene.add('ChoiceThreeScene', ChoiceThreeScene)

game.scene.start('StartScene')
game.scene.add('CustomButtonDemoScene', CustomButtonDemoScene)
// game.scene.start('CustomButtonDemoScene')
