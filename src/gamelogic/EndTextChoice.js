import DataMaker from '../gamelogic/DataMaker.js'

let finalText = '';
let moneyText = '';
let peopleText = '';
let reputationText = '';

//comments made based on how much money people have
function moneyComment(money) {
    if (money < 0) {
        moneyText = 'You have overspent on expenses and could not gain enough back. This negatively impacts your final score significantly';
       
    }
    else if (money < 100) {
        moneyText = 'You made it through the event with some money to spare but hardly enough for any follow up events. This somewhat negatively impacts your final score';
       
    }
    else if (money >= 100 && money < 250) {
        moneyText = 'You have left the event with a great surplus of money to boot. This somewhat positively impacts your final score.';
        
    }
    else if (money >= 250 && money < 500) {
        moneyText = 'You have a great amount of money from the event. This moderately improves your final score!'
        
    }
    else if (money >= 500) {
        moneyText = 'You have an overwhelming surplus of money from the event. This improves your score significantly!';
        
    }
}

//comments made based on the popularity of the event
function peopleComment(people) {
    if (people <= 0) {
        peopleText = 'What a truly catastrophic event. No one has arrived. This event is an automatic failure.';
        
    }
    else if (people < 50) {
        peopleText = 'A small showing. This could be better. This event somewhat negatively impacts your score.';
        
    }
    else if (people >= 50 && people < 125) {
        peopleText = 'You had a successful attendance to the event. Your score is positively impacted.';
        
    }
    else if (people >= 125 && people < 250) {
        peopleText = 'A great showing! This score is greatly improved';
        
    }
    else if (people >= 250) {
        peopleText = 'Wow! What a massive, successful event! The score is maximized!';
        
    }
}

//choosing the reputation and popularity
function popularityComment(reputation) {
    if (reputation <= 0) {
        reputationText = 'There is not enough goodwill for any of us here today. This massively negatively impacts your score.';
        
    }
    else if (reputation <= 50) {
        reputationText = 'An event is surely an event sure, but its impact has not been felt today. This somewhat negatively impacts your score.';
        
    }
    else if (reputation > 50 && reputation <= 125) {
        reputationText = 'A positive event with moderate buzz about it. This somewhat improves your score.';
        
    }
    else if (reputation > 125 && reputation < 250) {
        reputationText = 'This event has captured the minds of many attendees and even beyond the event itself. This moderately improves your score.';
        
    }
    else if (reputation >= 250) {
        reputationText = 'A truly marvelous event! It has reached all corners of the world and you are the envy of your peers. You have maximized this score!';
        
    }
}

//Returning function for the text that will be displayed

function returnFinalText(money_, people_, reputation_) {
    moneyComment(money_);
    peopleComment(people_);
    popularityComment(reputation_);

    finalText = moneyText + '\n' +
        peopleText + '\n' +
        reputationText + '\n';

    return finalText;
}

export default returnFinalText;
