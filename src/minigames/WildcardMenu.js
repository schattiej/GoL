import Phaser, { Data } from 'phaser'
import DataMaker from '../gamelogic/DataMaker.js'
import CONFIG from '../config.js'
import ChoiceMenu from '../gamelogic/ChoiceMenu.js'
import AlertManager from '../gamelogic/GameAlert.js'
import EndingDialog from '../gamelogic/EndingDialog.js'
//import ExampleScene from '../scenes/Example.js'
import EndCard from '../card/EndCard.js'
import EventDialog from '../gamelogic/EventDialog.js'
import returnScore, { getMoneyScore, getAttendanceScore, getReputationScore, rateScores } from '../gamelogic/EndScore.js';

//choice menu for the regular cards
function SimpleCM (text, options, endBool) {
  return new ChoiceMenu(DataMaker.game.RUI.scene, 0.5 * CONFIG.DEFAULT_WIDTH, 0.5 * CONFIG.DEFAULT_HEIGHT, text, options, true)
}

//choice menu for the ending cards
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

    const events = [
      MidgameWildcards.DELIVERY_NEEDED, // 1
      MidgameWildcards.AUTHORITY_FIRE,  // 2
      MidgameWildcards.AUTHORITY_FOOD,  // 3
      MidgameWildcards.AUTHORITY_FOOD,  // 4
      MidgameWildcards.DELIVERY_NEEDED, // 5
      MidgameWildcards.AUTHORITY_FIRE,  // 6
      MidgameWildcards.AUTHORITY_FOOD,  // 7
      MidgameWildcards.AUTHORITY_FOOD,  // 8
      MidgameWildcards.DELIVERY_NEEDED, // 9
      MidgameWildcards.AUTHORITY_FIRE   // 10
    ]
    
    const event = events[curveball - 1]
    event()

    return 1
  },
  DELIVERY_NEEDED: () => {
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
  },
  AUTHORITY_REMODEL: () => {
    const C = SimpleCM(
      'The hotel has to go through some unexpected remodel, they\'ve asked you to move some things!.',
      [
        ['Move the stuff', WildCardEvent.LOSEMONEY_LIGHT],
        ['Let the hotel move the stuff', WildCardEvent.LOSEMONEY_HEAVY]
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
    }
    else{
      AlertManager.alert('You don\'t have enough money to Pay!')
    }
    AdvanceRUI()
  },
  LOSEAPPROVAL_LIGHT: function () {
    if(DataMaker.game.popularity >= 7){
      DataMaker.game.popularity -= 7
      AlertManager.alert('You lost Popularity rating.')
    }
    else{
      DataMaker.game.popularity = 0
      AlertManager.alert('You have zero approval rating, yikes!')
    }
    AdvanceRUI()
  },
  LOSEMONEY_HEAVY: function () {
    if(DataMaker.game.money >= 250){
      DataMaker.game.money -= 250
      AlertManager.alert('You lost 250 dollars.')
    }
    else{
      AlertManager.alert('You don\'t have enough money to Pay!')
    }
    AdvanceRUI()
  },
  LOSEAPPROVAL_HEAVY: function () {
    if(DataMaker.game.popularity >= 15){
      DataMaker.game.popularity -= 15
      AlertManager.alert('You lost a lot of approval rating.')
    }
    else{
      DataMaker.game.popularity = 0
      AlertManager.alert('You have zero approval rating, yikes!')
    }
    AdvanceRUI()
  },
  ATROCITY: function () {
    DataMaker.game.popularity = 0
    AlertManager.alert('You have done something terrible, and possibly (definitely) illegal!')
    AdvanceRUI()
  },
  GAINAPPROVAL: function () {
    DataMaker.game.popularity += 7
    AlertManager.alert('You gained approval rating!')

    AdvanceRUI()
  },
  GAINMONEY: function () {
    DataMaker.game.money += 100
    AlertManager.alert('You gained 100 dollars!')

    AdvanceRUI()
  },
  LOSEMONEYAPPROVAL: function () {
    DataMaker.game.money -= 100
    DataMaker.game.popularity -= 7
    AlertManager.alert('You lost 100 dollars and some approval rating!')

    AdvanceRUI()
  },
  GAINAPPROVALHIGH: function () {
    DataMaker.game.popularity += 15
    AlertManager.alert('You gained a lot of approval rating!')

    AdvanceRUI()
  },
  GAINMONEYHIGH: function () {
    DataMaker.game.money += 250
    AlertManager.alert('You gained a lot of money!')

    AdvanceRUI()
  },
  LOSEMONEYLIGHTGAINAPPROVAL: function () {
    DataMaker.game.money -= 100
    DataMaker.game.popularity += 7
    AlertManager.alert('You lost 100 dollars, but got good approval rating!')

    AdvanceRUI()
  },
  LOSEMONEYMEDIUMGAINAPPROVAL: function () {
    DataMaker.game.money -= 150
    DataMaker.game.popularity += 10
    AlertManager.alert('You lost a lot of money, but got some approval rating!')

    AdvanceRUI()
  },
  LOSEMONEYHIGHGAINAPPROVAL: function () {
    DataMaker.game.money -= 250
        DataMaker.game.popularity += 15
        AlertManager.alert('You lost a lot of money, but got a lot of approval rating!')

        AdvanceRUI()
  },
  NOTHING: function () {
    AlertManager.alert('Nothing happened.')

    AdvanceRUI()
  },
  WAITEVENT: function () {
    const rando = Phaser.Math.Between(0, 100)

    if(rando >= 0 && rando <=50){
      AlertManager.alert('Thank goodness, They showed up')
      AdvanceRUI()
    }
    else if(rando >= 51 && rando <= 100){
      AlertManager.alert('Oh, oh dear, they didn\' show')
      DataMaker.game.popularity -= 15
      AdvanceRUI()
    }
  },
  WAITFOOD: function () {
    const rando = Phaser.Math.Between(0,100)

    if(rando>= 0 && rando <= 50){
      AlertManager.alert('Thank goodness, they made new food!')
      AdvanceRUI()
    }
    else if(rando >= 51 && rando <=100){
      if(DataMaker.game.money >= 150){
      AlertManager.alert('Oh no, they couldn\'t cook in time! You are forced to buy new food')
      DataMaker.game.money -= 150
      }
      else if(DataMaker.game.money < 150){
        AlertManager.alert('Oh no, oh dear, they couldn\t cook in time! You have to pay whatever you have left for left overs and your guests aren\'t happy!')
        DataMaker.game.money -= DataMaker.game.money 
        DataMaker.game.popularity -= 15
      }
      AdvanceRUI()
    }
  }
}

//Advance functions for the RUI based on the status of the game
function AdvanceRUI () { // Simple function for updating the RUI and advancing to the next option.
  DataMaker.game.RUI.updateText()
  if(DataMaker.game.gameEnd === true){
    if (DataMaker.game.fullCheck === false){
      if (DataMaker.game.attCheck === true){
        DataMaker.game.attCheck = false
        endGameManager.highChanceReputation()
        DataMaker.game.popCheck = true
      }
      else if(DataMaker.game.popCheck === true){
        DataMaker.game.popCheck = false
        endGameManager.highChanceMoney()
        DataMaker.game.moneyCheck = true
      }
      else if(DataMaker.game.moneyCheck === true){
        DataMaker.game.moneyCheck = false
        endGameManager.INIT()
      }
    }
    else if (DataMaker.game.fullCheck === true){
    const rando = Phaser.Math.Between(0, 100)
      if (rando >=50 && DataMaker.game.countEnd <= 4){
        endGameManager.INIT()
        DataMaker.game.countEnd  += 1      
      }
      else{
        endGameManager.createDialog()
      }
    }
  }
}


const WildcardManager = { // end of game events
  init: function () { // 'Constructor' for this global Wildcard Manager object. Intended to show the beginning dialogue for the end of the game.
    //const scene = DataMaker.game.RUI.scene
    //console.log(scene)
    this.choicemenu = SimpleCM(
      `It's time - the fabled day of the event has arrived! \n\n To date, the approval rating of the event based on marketing is: ${DataMaker.game.popularity}. \n\n To Date, the remaining money you have is: ${DataMaker.game.money}.\n As the event goes on, there may be hiccups that affect the total approval rating, as well as the additional approval from the entertainment venues themselves. Manage well, and you may make a lot of guests happy!\n\nManage poorly, and you may suffer the consequences...`,
      [
        ['Lets go!', () => { endGameManager.highChanceAttendance() }]
      ])
  },
}

// This is the function that handles the menu pop-ups at the end of the game
const endGameManager = { // end of game events
  INIT: function () {
    if(DataMaker.game.stopCheck === true){
    const endDia = new EventDialog(DataMaker.game.RUI.scene)
    }
    DataMaker.game.stopCheck = false
    //const scene = DataMaker.game.RUI.scene
    //DataMaker.game.gameEnd = true
    DataMaker.game.fullCheck = true
    const temp = Phaser.Math.RND.pick(['Hotel', 'Entertainment', 'Food', 'Guests', 'Celebrity', 'Fire', 'Weather', 'Power'])
    //Switch case to check for the type of warning to be displayed as well as the choices for that warning
    switch (temp) {
      case 'Hotel':
        warning = `Something has gone wrong! your ${temp} experienced issues with double booking!`
        choices = [
          ['Pay the Hotel ', WildCardEvent.LOSEMONEY_HEAVY],
          ['Wait it out', WildCardEvent.LOSEAPPROVAL_LIGHT],
          ['Who Cares?', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
        break
      case 'Entertainment':
        warning = `Something has gone wrong! your ${temp} didn't show up!`
        choices = [
          ['Pay Someone New Quick!', WildCardEvent.LOSEMONEY_HEAVY],
          ['Wait to see if they show up', WildCardEvent.WAITEVENT],
          ['Who Cares?', WildCardEvent.LOSEAPPROVAL_LIGHT]
        ]
        break
      case 'Food':
        warning = `Something has gone wrong! your ${temp} was prepared poorly!`
        choices = [
          ['Buy New Food!', WildCardEvent.LOSEMONEY_LIGHT],
          ['Wait for the cooks to make new food', WildCardEvent.WAITFOOD],
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
          ['Pay for hotel generators', WildCardEvent.LOSEMONEY_HEAVY],
          ['Eh, it will be fine.', WildCardEvent.LOSEAPPROVAL_HEAVY]
        ]
      break
    }
   //this.choicemenu.leave()
   this.choicemenu = SimpleEM(warning, choices)
  },
  createDialog: function () {
    const ED = new EndingDialog(DataMaker.game.RUI.scene)
  },
  highChanceAttendance: function () {
    rateScores(DataMaker.game.money, DataMaker.game.att, DataMaker.game.popularity)
    this.random = Phaser.Math.RND.integerInRange(1, 100)
    this.att = getAttendanceScore()
    DataMaker.game.attCheck = true
      switch (this.att) {
        case 0:
        if (this.random >0){
          warning = 'Sweet bippy! Nobody but close friends came!'
          choices = [
            ['man...', WildCardEvent.GAINAPPROVAL]
          ]
        }
        break
        case 2:
        if (this.random >0){
          warning = 'You had a pretty average turnout.'
          choices = [
            ['Wowzer!', WildCardEvent.GAINAPPROVAL]
          ]
        }
        break
        case 3:
        if (this.random >0){
          warning = 'Wow, A famous local dropped by!'
          choices = [
            ['Wowzer!', WildCardEvent.GAINAPPROVAL]
          ]
        }
        break
        case 4:
        if (this.random >0){
          warning = 'Wow, A well known youtuber decided to check out your event!'
          choices = [
            ['Wowzer!', WildCardEvent.GAINAPPROVAL]
          ]
        }
        break
        case 5:
        if (this.random >0){
          warning = 'Oh My! A celebrity came to checkout your event!'
          choices = [
            ['Wowzer!', WildCardEvent.GAINAPPROVAL]
          ]
        }
        break
    }

    return SimpleEM(warning, choices)
  },
  highChanceReputation: function () {
    rateScores(DataMaker.game.money, DataMaker.game.att, DataMaker.game.popularity)
    this.random = Phaser.Math.RND.integerInRange(1, 100)
    this.rep = getReputationScore()
    switch (this.rep) {
      case 0:
      if (this.random >0){
        warning = 'Oh No! A random youtuber made a 2 hour video essay about your event! You\'re cooked!!'
        choices = [
          ['Oh no...', WildCardEvent.GAINAPPROVAL]
        ]
      }
      break
      case 2:
      if (this.random >0){
        warning = 'You had a good reputation!'
        choices = [
          ['Wowzer!', WildCardEvent.GAINAPPROVAL]
        ]
      }
      break
      case 3:
      if (this.random >0){
        warning = 'A local news station decided to cover your event!'
        choices = [
          ['Wave to mom!', WildCardEvent.GAINAPPROVAL]
        ]
      }
      break
      case 4:
      if (this.random >0){
        warning = 'A state news station decided to cover your event!'
        choices = [
          ['Wave to mom!', WildCardEvent.GAINAPPROVAL]
        ]
      }
      break
      case 5:
      if (this.random >0){
        warning = 'National news decided to cover your even!'
        choices = [
          ['Wave to mom!', WildCardEvent.GAINAPPROVAL]
        ]
      }
      break
    }
    return SimpleEM(warning, choices)
  },

  highChanceMoney: function () {
    rateScores(DataMaker.game.money, DataMaker.game.att, DataMaker.game.popularity)
    this.random = Phaser.Math.RND.integerInRange(1, 100)
    this.mon = getMoneyScore()
    switch (this.mon) {
      case 0:
      if (this.random >0){
        warning = 'Oh my goodness, you have like no money left! How will you manage your event?'
        choices = [
          ['I guess we will see...', WildCardEvent.NOTHING]
        ]
      }
      break
      case 2:
      if (this.random >0){
        warning = 'You have a decent amount of money, do you want to take a chance and invest in some better amenities?'
        choices = [
          ['Better Food!', WildCardEvent.GAINAPPROVAL],
          ['Better HandSoap!', WildCardEvent.GAINAPPROVAL],
          ['Better Music!', WildCardEvent.GAINAPPROVAL],
          ['Nah, let\'s save money!', WildCardEvent.NOTHING]
        ]
      }
      break
      case 3:
      if (this.random >0){
        warning = 'You have a decent amount of money, would you like to invest in some amenities?'
        choices = [
          ['Better Food!', WildCardEvent.LOSEMONEYLIGHTGAINAPPROVALL],
          ['Better HandSoap!', WildCardEvent.LOSEMONEYLIGHTGAINAPPROVALL],
          ['Better Music!', WildCardEvent.LOSEMONEYLIGHTGAINAPPROVAL],
          ['Nah, let\'s save money!', WildCardEvent.NOTHING]
        ]
      }
      break
      case 4:
      if (this.random >0){
        warning = 'You have a really good amount of money, would you like to invest in some amenities?'
        choices = [
          ['Better Food!', WildCardEvent.LOSEMONEYMEDIUMGAINAPPROVAL],
          ['Better HandSoap!', WildCardEvent.LOSEMONEYMEDIUMGAINAPPROVAL],
          ['Better Music!', WildCardEvent.LOSEMONEYMEDIUMGAINAPPROVAL],
          ['Nah, let\'s save money!', WildCardEvent.NOTHING]
        ]
      }
      break
      case 5:
      if (this.random >0){
        warning = 'You have so much money that you are swimming in green. Nobody in the world is ready for your wealth, would you like to invest in some amenities?'
        choices = [
          ['Better Food!', WildCardEvent.LOSEMONEYHIGHGAINAPPROVAL],
          ['Better HandSoap!', WildCardEvent.LOSEMONEYHIGHGAINAPPROVAL],
          ['Better Music!', WildCardEvent.LOSEMONEYHIGHGAINAPPROVAL],
          ['Nah, let\'s save money!', WildCardEvent.NOTHING]
        ]
      }
      break
    }
    return SimpleEM(warning, choices)
  }
}
export { WildcardManager, MidgameWildcards, endGameManager }