import Phaser from 'phaser'
import CONFIG from '../config.js'
import ResourcesUI from '../gamelogic/ResourcesUI.js'
import { MidgameWildcards, WildcardManager, endGameManager } from '../minigames/WildcardMenu.js'
import StartupDialog from '../gamelogic/StartupDialog.js'
import LogisticsUI from '../gamelogic/LogisticsUI.js'
import StyleIndicator from '../gamelogic/StyleIndicator.js'

class EventScene extends Phaser.Scene {
  preload () {
    //loading is done n 'ExampleScene'
    this.load.svg('board', 'assets/sprites/board/GameBoard.svg', { scale: 12 })
    this.load.svg('player_token', 'assets/sprites/tokens/GoL_PlayerToken.svg', { scale: 12 })
    this.load.svg('event_token', 'assets/sprites/tokens/GoL_EventDateToken.svg', { scale: 12 })
    // this.load.svg('start_token', 'assets/sprites/tokens/GoL_Start.svg', { scale: 12 })
    this.load.svg('contract_token', 'assets/sprites/tokens/GoL_ContractSigningToken.svg', { scale: 12 })
    this.load.svg('card', 'assets/sprites/TestCard.svg', { scale: 6 })
    this.load.svg('cardBtest', 'assets/sprites/CardBack.svg', { scale: 6 })
    this.load.image('cardbackTest', 'assets/sprites/CardBack_Venues.png')
    this.load.image('playspace', 'assets/ArtAssets/Playspace_NoButtons.png')
    this.load.image('curveball_menu', 'assets/ArtAssets/Curveball_Menu.png')
    this.load.image('results_menu', 'assets/ArtAssets/Results_Menu.png')

    // Background image
    this.load.image('BackgroundImage', 'assets/ArtAssets/Start_NoButtons.png', { scale: 6 })

    // GOL_MenuButton
    this.load.image('GOL_MenuButton', 'assets/ArtAssets/MenuButton.png', { scale: 8 })

    // GOL_StartButton
    this.load.image('GOL_StartButton', 'assets/ArtAssets/StartButton.png', { scale: 8 })

    // GOL_OptionsButton
    this.load.image('GOL_OptionsButton', 'assets/ArtAssets/OptionsButton.png', { scale: 8 })

    // GoLLogo
    this.load.svg('GoLLogo', 'assets/sprites/GoLLogo.svg', { scale: 2 })

    // Loading card SVGs
    this.load.svg('catering_back', 'assets/sprites/cards/Catering_back.svg', { scale: 6 })
    this.load.svg('catering_front', 'assets/sprites/cards/edited/caterfront.svg', { scale: 6 })

    this.load.svg('enter_back', 'assets/sprites/cards/Entertainment_back.svg', { scale: 6 })
    this.load.svg('enter_front', 'assets/sprites/cards/edited/enterfront.svg', { scale: 6 })

    this.load.svg('funds_back', 'assets/sprites/cards/Fundraising_back.svg', { scale: 6 })
    this.load.svg('funds_front', 'assets/sprites/cards/edited/fundfront.svg', { scale: 6 })

    this.load.svg('guest_back', 'assets/sprites/cards/GuestAccommodations_back.svg', { scale: 6 })
    this.load.svg('guest_front', 'assets/sprites/cards/edited/accofront.svg', { scale: 6 })

    this.load.svg('venue_back', 'assets/sprites/cards/Venue_back.svg', { scale: 6 })
    this.load.svg('venue_front', 'assets/sprites/cards/edited/venuefront.svg', { scale: 6 })

    this.load.svg('event_back', 'assets/sprites/cards/Event_back.svg', { scale: 6 })
    this.load.svg('event_front', 'assets/sprites/cards/edited/eventfront.svg', { setScale: 6 })

    this.load.svg('mark_back', 'assets/sprites/cards/Marketing_back.svg', { scale: 6 })
    this.load.svg('mark_front', 'assets/sprites/cards/edited/marketfront.svg', { scale: 6 })
    this.load.image('bruh', 'assets/sprites/Full.png', { scale: 6 })

    // Loading audio
    this.load.audio('button', 'assets/audio/button.wav')
    this.load.audio('cardgrab', 'assets/audio/cardpickup.wav')
    this.load.audio('cardflip', 'assets/audio/cardflip.wav')
    this.load.audio('carddrop', 'assets/audio/cardplace.wav')
    this.load.audio('confirm', 'assets/audio/confirm.wav')
  }

  create () {

    const cardg = this.add.group()
    // Setup variables with world bounds
    //DataMaker.game.setup(this.scene)
    //DataMaker.game.gameScene = this.scene

    // Add background image
    const background = this.add.image(0.5 * CONFIG.DEFAULT_WIDTH, 0.5 * CONFIG.DEFAULT_HEIGHT, 'BackgroundImage')
    this.children.add(background)
    background.setDepth(1)

    const rUI = new ResourcesUI(this, 0.138 * CONFIG.DEFAULT_WIDTH, 0.33 * CONFIG.DEFAULT_HEIGHT)
    const lUI = new LogisticsUI(this, 0.218 * CONFIG.DEFAULT_WIDTH, 0.08 * CONFIG.DEFAULT_HEIGHT)

    endGameManager.INIT()
    this.input.keyboard.on('keyup-SPACE', this.keyReleased, this)
  }

  keyReleased () {
    this.scene.start('StartScene')
  }
}

export default EventScene