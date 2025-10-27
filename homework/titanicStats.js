import {readCsvFile} from "./readFile.js";
import {getCellsArrayFromReadFile, isChild, isFemale, isMale} from "./helpers.js";

let statsVariables = { // instead of simple solo variables
    totalFares: 0,

    totalFaresForFirstClass: 0,
    totalFaresForSecondClass: 0,
    totalFaresForThirdClass: 0,

    averageFaresForFirstClass: 0,
    averageFaresForSecondClass: 0,
    averageFaresForThirdClass: 0,

    totalSurvived: 0,
    totalNotSurvived: 0,

    survivedMen: 0,
    survivedWomen: 0,
    survivedChildren: 0,

    deadMen: 0,
    deadWomen: 0,
    deadChildren: 0,
}

readCsvFile('./train.csv').then(lines => {
    for (const cellsFromOneRow of getCellsArrayFromReadFile(lines)) {

        statsVariables.totalFares += +cellsFromOneRow[9];

        if (cellsFromOneRow[2] === '1') {
            statsVariables.totalFaresForFirstClass += +cellsFromOneRow[9];
        } else if (cellsFromOneRow[2] === '2') {
            statsVariables.totalFaresForSecondClass += +cellsFromOneRow[9];
        } else if (cellsFromOneRow[2] === '3') {
            statsVariables.totalFaresForThirdClass += +cellsFromOneRow[9];
        }

        statsVariables.averageFaresForFirstClass = (statsVariables.totalFaresForFirstClass / lines.length).toFixed(2);
        statsVariables.averageFaresForSecondClass = (statsVariables.totalFaresForSecondClass / lines.length).toFixed(2)
        statsVariables.averageFaresForThirdClass = (statsVariables.totalFaresForThirdClass / lines.length).toFixed(2)

        let survived = +cellsFromOneRow[1];

        if (survived === 1) {
            statsVariables.totalSurvived++;

            if (isChild) statsVariables.survivedChildren++;
            if (isMale) statsVariables.survivedMen++;
            if (isFemale) statsVariables.survivedWomen++;


        } else if (survived === 0) {
            statsVariables.totalNotSurvived++;
            if (isChild) statsVariables.deadChildren++;
            if (isMale) statsVariables.deadMen++;
            if (isFemale) statsVariables.deadWomen++;
        }
    }
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
