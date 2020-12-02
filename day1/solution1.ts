import * as fs from 'fs';

var nums: Set<number> = new Set(
  fs.readFileSync('./day1/input.txt', 'utf-8')
    .split('\n')
    .map(numStr => +numStr)
);

for (const num of nums.values()) {
  const compound: number = 2020 - num;
  if (nums.has(compound)) {
    console.log(`Answer: ${num * compound}`);
    break;
  }
}
