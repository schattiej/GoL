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
    else if (people < 50) {
        attendanceScore = 2;
    }
    else if (people >= 50 && people < 125) {
        attendanceScore = 3;
    }
    else if (people >= 125 && people < 250) {
        attendanceScore = 4;
    }
    else if (people >= 250) {
        attendanceScore = 5;
    }

}

function checkReputation(reputation) {
    if (reputation <= 0) {
        reputationScore = 0;
    }
    else if (reputation <= 50) {
        reputationScore = 2;
    }
    else if (reputation > 50 && reputation <= 125) {
        reputationScore = 3;
    }
    else if (reputation > 125 && reputation < 250) {
        reputationScore = 4;
    }
    else if (reputation >= 250) {
        reputationScore = 5;
    }
}

/*

Exported Function

*/

function returnScore(money_, attendance_, reputation_) {
    checkMoney(money_);
    checkAttendance(attendance_);
    checkReputation(reputation_);

    scoreText = `Money Score: ` + moneyScore + `/5` + `\n`      +
                `Attendance Score: ` + attendanceScore + `/5` + `\n` +
                `Reputation Score: ` + reputationScore + `/5` + `\n` +
                `Total Score: ` + (moneyScore + attendanceScore + reputationScore) + `/15` + `\n`;

    return scoreText;

}


export default returnScore;
