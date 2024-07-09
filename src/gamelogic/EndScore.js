import DataMaker from "./DataMaker";

/* 

Variables

*/

let moneyScore = 0;
let attendanceScore = 0;
let reputationScore = 0;

let weight = 15;

let scoreText = '';

/*

Inherit Functions

*/

function checkMoney(money) {
    if (money < 0) {
        moneyScore = 0;
    }
    else if (money < 100) {
        moneyScore = 2;
    }
    else if (money >= 100 && money < 250) {
        moneyScore = 3;
    }
    else if (money >= 250 && money < 500) {
        moneyScore = 4;
    }
    else if (money >= 500) {
        moneyScore = 5;
    }
}

function checkAttendance(people) {
    if (people <= 0) {
        attendanceScore = 0;
    }
    else if (people < 250) {
        attendanceScore = 2;
    }
    else if (people >= 250 && people < 500) {
        attendanceScore = 3;
    }
    else if (people >= 500 && people < 750) {
        attendanceScore = 4;
    }
    else if (people >= 750) {
        attendanceScore = 5;
    }

}

function checkReputation(reputation) {
    if (reputation <= 0) {
        reputationScore = 0;
    }
    else if (reputation <= 75) {
        reputationScore = 2;
    }
    else if (reputation > 75 && reputation <= 150) {
        reputationScore = 3;
    }
    else if (reputation > 150 && reputation < 300) {
        reputationScore = 4;
    }
    else if (reputation >= 300) {
        reputationScore = 5;
    }
}

function checkRatio(mainRatio){
    if (mainRatio <= 0){
        ratScore = 0;
    }
    else if (mainRatio <= 1/10){
        ratScore = 2;
    }
    else if (mainRatio >1/10 && mainRation <= 1.5/10){
        ratScore = 3;
    }
    else if (mainRatio >1.5/10 && mainRation <= 2.5/10){
        ratScore = 4;
    }
    else if (mainRatio >2.5/10){
        ratScore = 5;
    }
}

/* 

Exported Function

To export functions into the main, paste this import. When retrieving the scores, just call the function.
Remember that the score is assigned when return score is called.
import returnScore, { getMoneyScore, getAttendanceScore, getReputationScore, rateScores } from '../gamelogic/EndScore.js';

*/

export function rateScores(money_, attendance_, reputation_) {
    checkMoney(money_);
    checkAttendance(attendance_);
    checkReputation(reputation_);
}

export function getMoneyScore() {
    return moneyScore;
}

export function getAttendanceScore() {
    return attendanceScore;
}

export function getReputationScore() {
    return reputationScore;
}


function returnScore(money_, attendance_, reputation_) {

    rateScores(money_, attendance_, reputation_);

    scoreText = `Money Score: ` + moneyScore + `/5` + `\n` +
        `Attendance Score: ` + attendanceScore + `/5` + `\n` +
        `Reputation Score: ` + reputationScore + `/5` + `\n` +
        `Total Score: ` + (moneyScore + attendanceScore + reputationScore) + `/15` + `\n`;

    return scoreText;

}



export default returnScore;
