import Phaser, { Data } from 'phaser'
import DataMaker from '../gamelogic/DataMaker.js'
import CONFIG from '../config.js'
import UpgradedContainer from '../gamelogic/UpgradedContainer.js'

const HowToPlay = [
  `Welcome to the event phase of the game.`,
  `You will draw a card from a deck that has been built through the game`,
  `This card will show you some things that have happened at the event, whether it be random, or based on your actions.`,
  `Press next To Continue`
]

const DecksDescription = [
    `Logistics (Gray)
    The Logistics deck handles several aspects of event planning - mainly the selection of a Hotel and deals related to it.
    Take a look at the wheel; the orange marker is the cutoff date for locking in what hotel you have chosen.
    With this deck you must try to satisfy four elements:
  
    The hotel you are choosing
    The room package for that hotel
    The amenities for that hotel
    Solving staffing issues - who will support the event?`,
    `Marketing (Blue)
    Marketing cards directly effect the guest count of the event, by generating additional interest.`,
    `Fundraising (Green)
    Fundraising is how you make money - there are recurring income methods and one-time payments.
    Most of this is vendors paying you for a spot at the event.
    Be aware that some of these sponsors may need extra help at the event throughout the year!`,
    `Entertainment (Orange)
    Entertainment cards generate approval at the event itself, and contribute greatly to your final approval score.
    As with most things, though, be prepared to accept risks regarding these entertaining activities!`
  ]

class EventDialog extends UpgradedContainer {
  constructor (scene) {
    const x = CONFIG.DEFAULT_WIDTH * 0.5
    const y = CONFIG.DEFAULT_HEIGHT * 0.5
    super(scene)
    this.width = CONFIG.DEFAULT_WIDTH * 0.8
    this.height = CONFIG.DEFAULT_HEIGHT * 0.8
    Phaser.Display.Bounds.CenterOn(this, CONFIG.DEFAULT_WIDTH * 0.5, CONFIG.DEFAULT_HEIGHT * 0.5)

    const bottom = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, '0xe94394')
    this.add(bottom)

    const introTitle = this.scene.add.text(0, 0, 'Prepare...', { font: '48.11pt "Franklin Gothic Book"', color: '#231f20' })
    this.LeftLeft(introTitle, bottom)
    this.TopTop(introTitle, bottom)
    introTitle.x += 8
    this.add(introTitle)

    this.addSafeText(this.scene, 0, 0.25, 1.9, HowToPlay[0])
    const mainText = this.list[this.list.length - 1]

    let currentPage = 1
    const megaPage = HowToPlay

    const B1 = new StartupButton(scene, 300, this.height * 0.25, 'Next', () => {
      if (currentPage < megaPage.length) {
        mainText.setText(megaPage[currentPage])
        currentPage++
      } else {
        this.leave()
      }
      scene.sound.play('button')
    }).LeftLeftT(bottom).BottomBottomT(bottom)
    this.add(B1)

    this.depth = 200000000000

    scene.add.existing(this)
    this.enter()
  }

  enter () {
    this.alpha = 0
    this.scene.tweens.add({
      targets: this,
      alpha: 1.0,
      delay: 30,
      duration: 400
    })
  }

  leave () {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      delay: 30,
      duration: 400,
      onComplete: () => {
        this.destroy()
      }
    })
  }
}

class StartupButton extends UpgradedContainer { // Class for the buttons inside of the ChoiceMenu
  constructor (scene, x, y, text, callback) {
    super(scene, x, y)
    this.width = 300
    this.height = 300 * 0.25
    const bottom = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, '0xe94394')
    this.add(bottom)

    const message = this.scene.add.text(0, 0, text, { font: '24.11pt "Franklin Gothic Book"', color: '#231f20', align: 'center' })
    Phaser.Display.Bounds.CenterOn(message, 0, 0)
    message.setWordWrapWidth(bottom.width)
    this.add(message)

    this.setInteractive()
    this
      .on('pointerover', () => {
        bottom.setFillStyle('0x390383')
      })
      .on('pointerout', () => {
        bottom.setFillStyle('0xe94394')
      })
      .on('pointerdown', () => {
        bottom.setFillStyle('0xeE390c')
        callback()
      })
      .on('pointerup', () => {
        bottom.setFillStyle('0x390383')
      })

    this.setDepth(1000)
    Phaser.Display.Bounds.CenterOn(this, x, y)
    scene.add.existing(this)
  }
}

export default EventDialog
