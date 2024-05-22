import Phaser, { Data } from 'phaser'
import DataMaker from '../gamelogic/DataMaker.js'
import CONFIG from '../config.js'
import ChoiceMenu from '../gamelogic/ChoiceMenu.js'
import AlertManager from '../gamelogic/GameAlert.js'
import EndingDialog from '../gamelogic/EndingDialog.js'
//import ExampleScene from '../scenes/Example.js'
import EventScene from '../scenes/EventPhase.js'
import EndCard from '../card/EndCard.js'
import EventDialog from '../gamelogic/EventDialog.js'


function SimpleCM (text, options) {
  return new ChoiceMenu(DataMaker.game.RUI.scene, 0.5 * CONFIG.DEFAULT_WIDTH, 0.5 * CONFIG.DEFAULT_HEIGHT, text, options, true)
}

function SimpleEM (text, options){
  return new EndCard(DataMaker.game.RUI.scene, 0.5 * CONFIG.DEFAULT_WIDTH, 0.5 * CONFIG.DEFAULT_HEIGHT, text, options, true)
}

// The list of possible midgame wildcard events aka curveballs
const MidgameWildcards =
{
  POSSIBLE_WILDCARDS: [

  ],
  INIT: (scene) => { // set the scene for the curveballs
    MidgameWildcards.scene = DataMaker.game.RUI.scene
  },
  POPULATE: () => { // fills the possible wildcards array with integers that can each refer to specific curveballs
    for (let i = 0; i < 10; i++) {
      const random = Phaser.Math.RND.integerInRange(1, 10)
      MidgameWildcards.POSSIBLE_WILDCARDS.push(random)
    }
  },
  PULL: () => { // remove an entry from the possible wildcards array and start a curveball
    if (MidgameWildcards.POSSIBLE_WILDCARDS.length === 0) { return -1 }
    Phaser.Math.RND.shuffle(MidgameWildcards.POSSIBLE_WILDCARDS)
    const curveball = MidgameWildcards.POSSIBLE_WILDCARDS.pop()
    switch (curveball) {
      case 1: {
        MidgameWildcards.DELIVERY_NEEDED()
        break
      } case 2: {
        MidgameWildcards.AUTHORITY_FIRE()
        break
      } case 3: {
        MidgameWildcards.AUTHORITY_FOOD()
        break
      } case 4: {
        MidgameWildcards.AUTHORITY_FOOD()
        break
      } case 5: {
        MidgameWildcards.DELIVERY_NEEDED()
        break
      } case 6: {
        MidgameWildcards.AUTHORITY_FIRE()
        break
      } case 7: {
        MidgameWildcards.AUTHORITY_FOOD()
        break
      } case 8: {
        MidgameWildcards.AUTHORITY_FOOD()
        break
      } case 9: {
        MidgameWildcards.DELIVERY_NEEDED()
        break
      } case 10: {
        MidgameWildcards.AUTHORITY_FIRE()
        break
      } default:
        MidgameWildcards.DELIVERY_NEEDED()
    }
    return 1
  },
  DELIVERY_NEEDED: (cdata) => {
    const C = SimpleCM(
      'Your crew needs space to store products at the hotel before the event. The hotel is going to charge you..',
      [
        ['Pay Hotel 100 Dollars', WildCardEvent.LOSEMONEY_HEAVY],
        ['Ignore/Negotiate', WildCardEvent.LOSEAPPROVAL_LIGHT]
      ])
  },
  AUTHORITY_FIRE: () => {
    const C = SimpleCM(
      'The fire marshal has found an issue with the event\'s floor plan. ',
      [
        ['Manually Revisit Floor Plan \n(Pay 100 Dollars)', WildCardEvent.LOSEMONEY_HEAVY],
        ['Ask Vendors to Move Themselves', WildCardEvent.LOSEMONEY_HEAVY]
      ])
  },
  AUTHORITY_FOOD: () => {
    const C = SimpleCM(
      'The health inspector has found an issue with the safety of the event\'s food!',
      [
        ['Use Plan B\n (Pay 30 Dollars)', WildCardEvent.LOSEMONEY_LIGHT],
        ['Hire Better Kitchen Staff \n(Pay 100 Dollars)', WildCardEvent.LOSEMONEY_HEAVY],
        ['Ignore the Risk', WildCardEvent.ATROCITY]
      ])
  }
}

// The list of possible outcomes for each event. Presented as a sort of pseudo-enum for easy naming and reuse.
const WildCardEvent =
{
  LOSEMONEY_LIGHT: function () {
    if(DataMaker.game.money >= 60){
      DataMaker.game.money -= 60
      AlertManager.alert('You lost 60 dollars.')
      if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
      { 
        AdvanceRUE() 
      }
      else{
        AdvanceRUI()
      }
    }
    else{
      AlertManager.alert('You don\'t have enough money to Pay!')
      if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
      { 
        AdvanceRUE() 
      }
      else{
        AdvanceRUI()
      }
    }
  },
  LOSEAPPROVAL_LIGHT: function () {
    DataMaker.game.popularity -= 7
    AlertManager.alert('You lost Popularity rating.')
    if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
    { 
      AdvanceRUE() 
    }
    else{
      AdvanceRUI()
    }
  },
  LOSEMONEY_HEAVY: function () {
    if(DataMaker.game.money >= 250){
      DataMaker.game.money -= 250
      AlertManager.alert('You lost 250 dollars.')
      if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
      { 
        AdvanceRUE() 
      }
      else{
        AdvanceRUI()
      }
    }
    else{
      AlertManager.alert('You don\'t have enough money to Pay!')
      if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
      { 
        AdvanceRUE() 
      }
      else{
        AdvanceRUI()
      }
    }
  },
  LOSEAPPROVAL_HEAVY: function () {
    if(DataMaker.game.popularity >= 15){
    DataMaker.game.popularity -= 15
    AlertManager.alert('You lost a lot of approval rating.')
    if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
    { 
      AdvanceRUE() 
    }
    else{
      AdvanceRUI()
    }
    }
    else{
      DataMaker.game.popularity -= 15
      AlertManager.alert('You are negative in popularity rating, Yikes!')
      if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
      { 
        AdvanceRUE() 
      }
      else{
        AdvanceRUI()
      }

    }
  },
  ATROCITY: function () {
    DataMaker.game.popularity = 0
    AlertManager.alert('You have done something terrible, and possibly (definitely) illegal!')
    if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
    { 
      AdvanceRUE() 
    }
    else{
      AdvanceRUI()
    }
  },
  GAINAPPROVAL: function () {
    DataMaker.game.popularity += 7
    AlertManager.alert('You gained approval rating!')
    if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
    { 
      AdvanceRUE() 
    }
    else{
      AdvanceRUI()
    }
  },
  GAINMONEY: function () {
    DataMaker.game.money += 100
    AlertManager.alert('You gained 100 dollars!')
    if (DataMaker.game.gameEnd === true) // Only chains into the next option if we are truly at the end of the game. Untested
    { 
      AdvanceRUE() 
    }
    else{
      AdvanceRUI()
    }
  }
}

function AdvanceRUI () { // Simple function for updating the RUI and advancing to the next option.
  DataMaker.game.RUI.updateText()
}

function AdvanceRUE () {
  DataMaker.game.RUI.updateText()

  const rando = Phaser.Math.Between(0, 100)
    if (rando <=0 && DataMaker.game.countEnd < 4){
      endGameManager.createDialog()
    }
    else{
      endGameManager.INIT()
      DataMaker.game.countEnd  += 1
    }
}



const WildcardManager = { // end of game events
  init: function () { // 'Constructor' for this global Wildcard Manager object. Intended to show the beginning dialogue for the end of the game.
    //const scene = DataMaker.game.RUI.scene
    //console.log(scene)
    this.choicemenu = SimpleCM(
      `It's time - the fabled day of the event has arrived! \n\n To date, the approval rating of the event based on marketing is: ${DataMaker.game.popularity}. \n\n To Date, the remaining money you have is: ${DataMaker.game.money}.\n As the event goes on, there may be hiccups that affect the total approval rating, as well as the additional approval from the entertainment venues themselves. Manage well, and you may make a lot of guests happy!\n\nManage poorly, and you may suffer the consequences...`,
      [
        ['Lets go!', () => { endGameManager.INIT() }]
      ])
  },
}
const endGameManager = { // end of game events
  INIT: function () {
    if(this.stop === true){
    const endDia = new EventDialog(DataMaker.game.RUI.scene)
    }
    this.stop = true
    const scene = DataMaker.game.RUI.scene
    DataMaker.game.gameEnd = true
    const temp = Phaser.Math.RND.pick(['Hotel', 'Entertainment', 'Food', 'Guests', 'Celebrity', 'Fire', 'Weather', 'Power', 'Donation'])
    //Switch case to check for the type of warning to be displayed as well as the choices for that warning
    switch (temp) {
      case 'Hotel':
        warning = `Something has gone wrong! your ${temp} experienced issues with double booking!`
        choices = [
          ['Pay the Hotel ', WildCardEvent.LOSEMONEY_LIGHT],
          ['Wait it out', WildCardEvent.LOSEAPPROVAL_LIGHT],
          ['Who Cares?', WildCardEvent.LOSEAPPROVAL_LIGHT]
        ]
        break
      case 'Entertainment':
        warning = `Something has gone wrong! your ${temp} didn't show up!`
        choices = [
          ['Pay Someone New Quick!', WildCardEvent.LOSEMONEY_LIGHT],
          ['Wait to see if they show up', WildCardEvent.LOSEAPPROVAL_LIGHT],
          ['Who Cares?', WildCardEvent.LOSEAPPROVAL_LIGHT]
        ]
        break
      case 'Food':
        warning = `Something has gone wrong! your ${temp} was prepared poorly!`
        choices = [
          ['Buy New Food!', WildCardEvent.LOSEMONEY_LIGHT],
          ['Wait for the cooks to make new food', WildCardEvent.LOSEAPPROVAL_LIGHT],
          ['Who Cares!', WildCardEvent.ATROCITY]
        ]
        break
      case 'Guests':
        warning = `Something has gone wrong! Some of your ${temp} showed up with banned items!`
        choices = [
          ['Store them in a secure area', WildCardEvent.LOSEMONEY_LIGHT],
          ['Send them home to come back', WildCardEvent.LOSEAPPROVAL_LIGHT],
          ['Ignore It', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
        break
      case 'Celebrity':
        warning = 'Wow! A world famous celebrity has been spotted at the event!'
        choices = [
          ['Greet them and say hi!', WildCardEvent.GAINAPPROVAL],
          ['Send them home', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
        break
      case 'Fire':
        warning = 'A fire alarm has been triggered at the event! What do you do?'
        choices = [
          ['Escort Everyone Outside', WildCardEvent.GAINAPPROVAL],
          ['Take Time to investigate yourself', WildCardEvent.LOSEAPPROVAL_HEAVY],
          ['Ensure there is no problem', WildCardEvent.ATROCITY]
        ]
      break
      case 'Weather':
        warning = 'Some awful weather has been reported at the event! What do you do?'
        choices = [
          ['Wait for it to pass', WildCardEvent.LOSEAPPROVAL_LIGHT],
          ['Ensure safe travels', WildCardEvent.LOSE_MONEY_LIGHT],
          ['Eh, it will be fine.', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
      break
      case 'Power':
        warning = 'The Power Went Out! What do you do?'
        choices = [
          ['Wait for it to pass', WildCardEvent.GAINAPPROVAL],
          ['Pay for hotel generators', WildCardEvent.LOSEAPPROVAL_HEAVY],
          ['Eh, it will be fine.', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
      break
      case 'Donation':
        warning = 'Yippee! You Received a Donation due to your high approval rating!'
        choices = [
          ['Accept the Money', WildCardEvent.GAINMONEY],
          ['Deny the Money', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
      break
    }
   //this.choicemenu.leave()
   this.choicemenu = SimpleEM(warning, choices)
  },
  createDialog: function () {
    const ED = new EndingDialog(DataMaker.game.RUI.scene)
  }

}
export { WildcardManager, MidgameWildcards, endGameManager }
