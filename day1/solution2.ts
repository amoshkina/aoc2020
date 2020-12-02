import * as fs from 'fs';

var numsArray: number[] = fs.readFileSync('./day1/input.txt', 'utf-8')
    .split('\n')
    .map(numStr => +numStr);

var numsSet: Set<number> = new Set(numsArray);
var pairsMap: Map<number, Array<number>> = new Map();

for (const num1 of numsArray) {
  for (const num2 of numsArray) {
    pairsMap.set(num1 + num2, [num1, num2]);
  }
}


for (const num of numsArray) {
  const compound: number = 2020 - num;
  if (pairsMap.has(compound)) {
    const numArray: number[] = pairsMap.get(compound);
    console.log(`Answer: ${num * numArray[0] * numArray[1]}`);
    break;
  }
}