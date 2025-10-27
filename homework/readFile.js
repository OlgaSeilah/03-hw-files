import fs from 'node:fs'

export function readCsvFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                const lines = data.split('\n');
                lines.shift(); // return an array of lines without titles
                resolve(lines)
            }
        })
    })
}