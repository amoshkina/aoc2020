import * as fs from 'fs';

const grid: string[] = fs.readFileSync('./day3/input.txt', 'utf-8')
    .split('\n');

const jMod = grid[0].length;
const maxRow = grid.length;

const [iShift, jShift] = [1, 3];

let [i, j] = [0, 0];

let numTrees = 0;

while (i < maxRow - 1) {
    i += iShift
    j = (j + jShift) % jMod;
    if (grid[i][j] == '#') {
        numTrees += 1;
    }
}

console.log(`Answer: ${numTrees}`);