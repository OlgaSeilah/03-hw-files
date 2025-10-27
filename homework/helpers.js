export const regexPattern = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/i;

export function* getCellsArrayFromReadFile(arrayOfLines) {
    for (let line of arrayOfLines) {
        if (line === '') {
            continue;
        }
        yield line.split(regexPattern) // here is the array of cells in ever taken line
    }

}

export const isChild = (cellsFromOneRow) => { // gets an array of cells from one line
    let age = +cellsFromOneRow[5];
    return !isNaN(age) && age < 18;
}

export const isMale = (cellsFromOneRow) => {
    let gender = cellsFromOneRow[4];
    let age = +cellsFromOneRow[5];
    return !isNaN(age) && gender === 'male';
}

export const isFemale = (cellsFromOneRow) => {
    let gender = cellsFromOneRow[4];
    let age = +cellsFromOneRow[5];
    return !isNaN(age) && gender === 'female';
}

