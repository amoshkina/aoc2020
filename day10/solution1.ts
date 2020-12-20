import * as fs from 'fs';


class Solver {

    preamble: number = 25;

    run(filename: string) {
        const joltages: number[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n')
            .map(num => parseInt(num));
        
        const maxJoltage: number = Math.max(...joltages);
        joltages.push(maxJoltage + 3);

        const joltagesSet: Set<number> = new Set(joltages);
        
        let currentJoltage: number = 0;

        const counter = {
            1: 0,
            2: 0,
            3: 0
        };

        while (currentJoltage < maxJoltage + 3) {
            for (let i = 1; i <= 3; i++) {
                if (joltagesSet.has(currentJoltage + i)) {
                    counter[i] += 1;
                    currentJoltage += i;
                    break;
                }
            }
        }

        console.log(`Answer: ${counter[1] * counter[3]}`);
    }
}

new Solver().run('./day10/input.txt')
