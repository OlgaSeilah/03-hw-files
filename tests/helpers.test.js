import {regexPattern, isChild, isMale, isFemale} from '../homework/helpers.js'

describe('regexPattern', () => {
    test('Pattern divides the string correctly', () => {
        const cellsArrayFromRow = '888,1,1,"Graham, Miss. Margaret Edith",female,19,0,0,112053,30,B42,S'.split(regexPattern)
        expect(cellsArrayFromRow).toEqual(['888','1','1','\"Graham, Miss. Margaret Edith\"','female','19','0','0','112053','30','B42','S'])
    })
})

describe('isChild', () => {
    test('isChild is true for age 0-18', () => {
        const arrayOfCells = ['803','1','1','\"Carter, Master. William Thornton II\"','male','11','1','2','113760','120','B96 B98','S'];
        expect(isChild(arrayOfCells)).toBe(true)
    })
    test('isChild is NOT true for age > 18', () => {
        const arrayOfCells = ['888','1','1','\"Graham, Miss. Margaret Edith\"','female','19','0','0','112053','30','B42','S'];
        expect(isChild(arrayOfCells)).toBe(false)
    })
})

describe('isMale', () => {
    test('isMale is true for male', () => {
        const arrayOfCells = ['803','1','1','\"Carter, Master. William Thornton II\"','male','11','1','2','113760','120','B96 B98','S'];
        expect(isMale(arrayOfCells)).toBe(true)
    })
    test('isMale is NOT true for female', () => {
        const arrayOfCells = ['888','1','1','\"Graham, Miss. Margaret Edith\"','female','19','0','0','112053','30','B42','S'];
        expect(isMale(arrayOfCells)).toBe(false)
    })
})

describe('isFemale', () => {
    test('isFemale is true for female', () => {
        const arrayOfCells = ['888','1','1','\"Graham, Miss. Margaret Edith\"','female','19','0','0','112053','30','B42','S'];
        expect(isFemale(arrayOfCells)).toBe(true)
    })
    test('isFemale is NOT true for male', () => {
        const arrayOfCells = ['803','1','1','\"Carter, Master. William Thornton II\"','male','11','1','2','113760','120','B96 B98','S'];
        expect(isFemale(arrayOfCells)).toBe(false)
    })
})

