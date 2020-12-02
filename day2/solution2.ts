import * as fs from 'fs';

const policies: string[] = fs.readFileSync('./day2/input.txt', 'utf-8')
    .split('\n');

let validCounter = 0;

for (const policy of policies) {
    let [, i, j, letter, pass] = policy.match(/(\d+)-(\d+) ([a-z]): (.*)/) || [];

    const iMatch = pass[parseInt(i)-1] == letter;
    const jMatch = pass[parseInt(j)-1] == letter;

    if (iMatch && !jMatch || !iMatch && jMatch) {
        validCounter += 1;
    }
}

console.log(`Answer: ${validCounter}`)
