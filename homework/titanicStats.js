import fs from 'node:fs'

const regexPattern = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/i;

let totalFares = 0;

let averageFaresForFirstClass = 0;
let averageFaresForSecondClass = 0;
let averageFaresForThirdClass = 0;

let totalSurvived = 0;
let totalNotSurvived = 0;

let survivedMen = 0;
let  survivedWomen = 0;
let  survivedChildren = 0;
let deadMen = 0;
let  deadWomen = 0;
let  deadChildren = 0;


fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
    } else {
        const lines = data.split('\n')
        lines.shift()

        for (let i = 0; i < lines.length; i++) { // OR lines.length-1 because last line is empty
            let line = lines[i];

            if (line === '') {
                continue; // OR here we can skip the empty line
            }
            let cellsArray = line.split(regexPattern)
            totalFares += +cellsArray[9];

            if (cellsArray[2] === '1') {
                averageFaresForFirstClass += +cellsArray[9];
            } else if (cellsArray[2] === '2') {
                averageFaresForSecondClass += +cellsArray[9];
            } else if (cellsArray[2] === '3') {
                averageFaresForThirdClass += +cellsArray[9];
            }

            let survived = +cellsArray[1];
            let gender = cellsArray[4];
            let age = +cellsArray[5];

            let isChild = !isNaN(age) && age < 18;
            let isMale = gender === 'male';
            let isFemale = gender === 'female';


            if (survived === 1) {
                totalSurvived++;

                if (isChild) {
                    survivedChildren++;
                }
                else if (isMale) {
                    survivedMen++;
                } else if (isFemale) {
                    survivedWomen++;
                }

            } else if (survived === 0) {
                totalNotSurvived++;
                if (isChild) {
                    deadChildren++;
                }
                else if (isMale) {
                    deadMen++;
                } else if (isFemale) {
                    deadWomen++;
                }
            }
        }

        console.log(`1. Total Fares: ${totalFares}`)
        console.log(`2.1. Average Fares for First Class: ${(averageFaresForFirstClass / lines.length).toFixed(2)}
        2.2. Average Fares for Second Class: ${(averageFaresForSecondClass / lines.length).toFixed(2)}
        2.3. Average Fares for Third Class: ${(averageFaresForThirdClass / lines.length).toFixed(2)}`)

        console.log(`3. Survived: ${totalSurvived} | Not Survived: ${totalNotSurvived}`)

        console.log(`4.1. Survived Men: ${survivedMen} | Survived Women: ${survivedWomen} | Survived Children: ${survivedChildren}`)
        console.log(`4.2. Dead Men: ${deadMen} | Dead Women: ${deadWomen} | Dead Children: ${deadChildren}`)
    }
})

