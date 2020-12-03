import * as fs from 'fs';

interface Shift {
    i: number;
    j: number;
}

const grid: string[] = fs.readFileSync('./day3/input.txt', 'utf-8')
    .split('\n');

const jMod = grid[0].length;
const maxRow = grid.length;

const shifts: Shift[] = [
    {i: 1, j: 1},
    {i: 1, j: 3},
    {i: 1, j: 5},
    {i: 1, j: 7},
    {i: 2, j: 1}
];


let numTrees: number[] = [];

for (const shift of shifts){
    let [i, j] = [0, 0];
    let counter = 0;
    while (i < maxRow - 1) {
        i += shift.i
        j = (j + shift.j) % jMod;
        if (grid[i][j] == '#') {
            counter += 1;
        }
    }
    numTrees.push(counter);
}

console.log(`Answer: ${numTrees.reduce((a,b) => a*b, 1)}`);
