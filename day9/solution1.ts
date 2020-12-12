import * as fs from 'fs';


class Solver {

    preamble: number = 25;

    run(filename: string) {
        const numbers: number[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n')
            .map(num => parseInt(num));

        for (let i = this.preamble; i < numbers.length; i++){
            const prevNumbers: number[] = numbers.slice(i-this.preamble, i);
            const current: number = numbers[i];
            let wrongNum: boolean = true;
            for (const num of prevNumbers) {
                const secondNum: number = current - num;
                if (secondNum != num && prevNumbers.includes(secondNum)) {
                    wrongNum = false;
                    break;
                }
            }
            if (wrongNum) {
                console.log(`Answer: ${current}`);
                return;
            }
        }
    }
}

new Solver().run('./day9/input.txt')
