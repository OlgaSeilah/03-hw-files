import fs from 'node:fs'

const regexPattern = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/i;

let totalFares = 0;

let averageFaresForFirstClass = 0;
let averageFaresForSecondClass = 0;
let averageFaresForThirdClass = 0;

let survived = 0;
let notSurvived = 0;


fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    } else {
        const lines = data.split('\n')
        lines.shift() // removed cells titles => Array of table LINES (strings)

        for (let i = 0; i < lines.length; i++) { // OR lines.length-1 because last line is empty
            let line = lines[i];

            if (line === '') {
                continue; // OR here we can skip the empty line
            }
            let cellsArray = line.split(regexPattern) // here I created an Array of all cells
            // console.log(`Cells Array: ${cellsArray}`);
            totalFares += +cellsArray[9];

            if (cellsArray[2] === '1') {
                averageFaresForFirstClass += +cellsArray[9];
            } else if (cellsArray[2] === '2') {
                averageFaresForSecondClass += +cellsArray[9];
            } else if (cellsArray[2] === '3') {
                averageFaresForThirdClass += +cellsArray[9];
            }

            if (cellsArray[1] === '1') {
                survived++;
                
            } else if (cellsArray[1] === '0') {
                notSurvived++;
            }
        }

        console.log(`1. Total Fares: ${totalFares}`)
        console.log(`2.1. Average Fares for First Class: ${(averageFaresForFirstClass / lines.length).toFixed(2)}
        2.2. Average Fares for Second Class: ${(averageFaresForSecondClass / lines.length).toFixed(2)}
        2.3. Average Fares for Third Class: ${(averageFaresForThirdClass / lines.length).toFixed(2)}`)

        console.log(`3. Survived: ${survived} | Not Survived: ${notSurvived}`)
    }
})

