import * as fs from 'fs';

const passports: string[] = fs.readFileSync('./day4/input.txt', 'utf-8')
    .split('\n\n');

const requiredFields = [
    'byr', 'iyr', 'eyr',
    'hgt', 'hcl', 'ecl', 'pid'
];

let validCounter = 0;


for (const pass of passports) {
    const pairs = pass.split(/\s/);
    const passData: Map<string, string> = new Map();
    pairs.forEach(
        pair => {
            const [field, value] = pair.split(':');
            passData.set(field, value);
        }
    );

    let isValid = true;

    for (const field of requiredFields) {
        if (!passData.has(field)) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        validCounter += 1;
    }

}

console.log(`Answer: ${validCounter}`);