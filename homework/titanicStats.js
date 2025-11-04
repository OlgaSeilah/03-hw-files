import fs from "node:fs";
import readLine from "node:readline";
import {isChild, isFemale, isMale, regexPattern} from "./helpers.js";


let statsVariables = {
    isFirstLine: true,

    passengersInFirstClass: 0, passengersInSecondClass: 0, passengersInThirdClass: 0,

    totalFares: 0,

    totalFaresForFirstClass: 0, totalFaresForSecondClass: 0, totalFaresForThirdClass: 0,

    averageFaresForFirstClass: 0, averageFaresForSecondClass: 0, averageFaresForThirdClass: 0,

    totalSurvived: 0, totalNotSurvived: 0,

    survivedMen: 0, survivedWomen: 0, survivedChildren: 0,

    deadMen: 0, deadWomen: 0, deadChildren: 0,
}

const fileStream = fs.createReadStream('./train.csv', 'utf8');
const reader = readLine.createInterface({
    input: fileStream, crlfDelay: Infinity
})


reader.on('line', (line) => {
    if (statsVariables.isFirstLine === true) {
        statsVariables.isFirstLine = false;
        return;
    }

    let oneLineArray = line.split(regexPattern) // here I split ONE line to several CELLS

    statsVariables.totalFares += +oneLineArray[9];

    if (oneLineArray[2] === '1') {
        statsVariables.totalFaresForFirstClass += +oneLineArray[9];
        statsVariables.passengersInFirstClass++;
    } else if (oneLineArray[2] === '2') {
        statsVariables.totalFaresForSecondClass += +oneLineArray[9];
        statsVariables.passengersInSecondClass++;
    } else if (oneLineArray[2] === '3') {
        statsVariables.passengersInThirdClass++;
        statsVariables.totalFaresForThirdClass += +oneLineArray[9];
    }

    let survived = +oneLineArray[1];

    if (survived === 1) {
        statsVariables.totalSurvived++;

        if (isChild(oneLineArray)) {
            statsVariables.survivedChildren++;
        }
        if (isMale(oneLineArray)) {
            statsVariables.survivedMen++;
        }
        if (isFemale(oneLineArray)) {
            statsVariables.survivedWomen++;
        }


    } else if (survived === 0) {
        statsVariables.totalNotSurvived++;
        if (isChild(oneLineArray)) {
            statsVariables.deadChildren++;
        }
        if (isMale(oneLineArray)) {
            statsVariables.deadMen++;
        }
        if (isFemale(oneLineArray)) {
            statsVariables.deadWomen++;
        }
    }

})

reader.on('close', () => {
    statsVariables.averageFaresForFirstClass = (statsVariables.totalFaresForFirstClass / statsVariables.passengersInFirstClass).toFixed(2);
    statsVariables.averageFaresForSecondClass = (statsVariables.totalFaresForSecondClass / statsVariables.passengersInSecondClass).toFixed(2)
    statsVariables.averageFaresForThirdClass = (statsVariables.totalFaresForThirdClass / statsVariables.passengersInThirdClass).toFixed(2)

    printTitanicStats();
})

function printTitanicStats() {
    console.log(`1. Total Fares: ${statsVariables.totalFares}`)

    console.log(`2.1. Average Fares for First Class: ${statsVariables.averageFaresForFirstClass}
        2.2. Average Fares for Second Class: ${statsVariables.averageFaresForSecondClass}
        2.3. Average Fares for Third Class: ${statsVariables.averageFaresForThirdClass}`)

    console.log(`3. Survived: ${statsVariables.totalSurvived} | Not Survived: ${statsVariables.totalNotSurvived}`)

    console.log(`4.1. Survived Men: ${statsVariables.survivedMen} | Survived Women: ${statsVariables.survivedWomen} | Survived Children: ${statsVariables.survivedChildren}`)
    console.log(`4.2. Dead Men: ${statsVariables.deadMen} | Dead Women: ${statsVariables.deadWomen} | Dead Children: ${statsVariables.deadChildren}`)
}
