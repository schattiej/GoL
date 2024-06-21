import Phaser from 'phaser'

import CONFIG from '../config.js'
import Hand from '../card/Hand.js'
import Deck from '../card/Deck.js'
import Board from '../board/Board.js'
import PlayZone from '../card/PlayZone.js'
import DataMaker from '../gamelogic/DataMaker.js'
import ResourcesUI from '../gamelogic/ResourcesUI.js'
import { MidgameWildcards, WildcardManager } from '../minigames/WildcardMenu.js'
import StartupDialog from '../gamelogic/StartupDialog.js'
import LogisticsUI from '../gamelogic/LogisticsUI.js'
import StyleIndicator from '../gamelogic/StyleIndicator.js'
import EventDialog from '../gamelogic/EventDialog.js'
import ChoiceMenu from '../gamelogic/ChoiceMenu.js'


class ExampleScene extends Phaser.Scene {
  preload () {
    // Loading is done in 'StartScene'
  }

  create () {
    const cardg = this.add.group()
    // Setup variables with world bounds
    DataMaker.game.setup(this.scene)

    // Add background image
    const background = this.add.image(0.5 * CONFIG.DEFAULT_WIDTH, 0.5 * CONFIG.DEFAULT_HEIGHT, 'playspace')
    this.children.add(background)

    const hand1 = new Hand(this, cardg, 0.495 * CONFIG.DEFAULT_WIDTH, 0.9 * CONFIG.DEFAULT_HEIGHT)

    this.deckg = this.add.group()
    const deck1 = new Deck(this, 0.07 * CONFIG.DEFAULT_WIDTH, 0.6 * CONFIG.DEFAULT_HEIGHT, cardg)
    const deck2 = new Deck(this, 0.1567 * CONFIG.DEFAULT_WIDTH, 0.6 * CONFIG.DEFAULT_HEIGHT, cardg, 'enter')
    const deck3 = new Deck(this, 0.2434 * CONFIG.DEFAULT_WIDTH, 0.6 * CONFIG.DEFAULT_HEIGHT, cardg, 'guest')
    const deck4 = new Deck(this, 0.33 * CONFIG.DEFAULT_WIDTH, 0.6 * CONFIG.DEFAULT_HEIGHT, cardg, 'funds')
    this.deckg.addMultiple([deck1, deck2, deck3, deck4])
 // Add text text to scene
    this.add.text(.17 * CONFIG.DEFAULT_WIDTH, .45 * CONFIG.DEFAULT_HEIGHT, 'Cards!', { fontFamily: 'Arial', fontSize: '36px', color: '#ffffff' });
    this.add.text(.845 * CONFIG.DEFAULT_WIDTH, .62 * CONFIG.DEFAULT_HEIGHT, 'AREA', { fontFamily: 'Arial', fontSize: '80px', color: '#ffffff' });
    this.add.text(.845 * CONFIG.DEFAULT_WIDTH, .52 * CONFIG.DEFAULT_HEIGHT, 'PLAY', { fontFamily: 'Arial', fontSize: '80px', color: '#ffffff' });
    this.add.text(.45 * CONFIG.DEFAULT_WIDTH, .72 * CONFIG.DEFAULT_HEIGHT, 'Hand', { fontFamily: 'Arial', fontSize: '80px', color: '#ffffff' });

// Add the statistics menu to the scene
    const rUI = new ResourcesUI(this, 0.138 * CONFIG.DEFAULT_WIDTH, 0.33 * CONFIG.DEFAULT_HEIGHT)
    const lUI = new LogisticsUI(this, 0.218 * CONFIG.DEFAULT_WIDTH, 0.08 * CONFIG.DEFAULT_HEIGHT)
    const board1 = new Board(this, 0.6 * CONFIG.DEFAULT_WIDTH, 0 * CONFIG.DEFAULT_HEIGHT)
    const zone1 = new PlayZone(this, cardg, 0.893 * CONFIG.DEFAULT_WIDTH, 0.615 * CONFIG.DEFAULT_HEIGHT)
    const startupdialog1 = new StartupDialog(this)

    MidgameWildcards.INIT()
    MidgameWildcards.POPULATE()

  }
}

export default ExampleScene
