import * as fs from 'fs';

const policies: string[] = fs.readFileSync('./day2/input.txt', 'utf-8')
    .split('\n');

let validCounter = 0;

for (const policy of policies) {
    let [, from, to, letter, pass] = policy.match(/(\d+)-(\d+) ([a-z]): (.*)/) || [];

    const entries = (pass.match(new RegExp(letter, 'g')) || '').length;

    if (parseInt(from) <= entries && entries <= parseInt(to)) {
        validCounter += 1;
    }
}

console.log(`Answer: ${validCounter}`)
