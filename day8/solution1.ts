import * as fs from 'fs';

interface Instruction {
    cmd: string;
    param: number;
}

class Solver {

    commandRegex: RegExp = new RegExp(/^(nop|acc|jmp) ([-|+]\d+)$/);

    accumulator: number = 0;
    iptr: number = 0;
    executed: Set<number> =  new Set();

    run(filename: string) {
        const program: Instruction[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n')
            .map(
                line => {
                    const [, cmd, value] = line.trim().match(this.commandRegex);
                    return {cmd, param: parseInt(value)};
                });
        
        while (!this.executed.has(this.iptr)) {
            this.executed.add(this.iptr);
            const instruction: Instruction = program[this.iptr];
            this[instruction.cmd](instruction.param);
        }

        console.log(`Answer: ${this.accumulator}`);
    }

    nop(param: number) {
        this.iptr += 1;
    }

    acc(param: number) {
        this.accumulator += param;
        this.iptr += 1;
    }

    jmp(param: number) {
        this.iptr += param;
    }
}

new Solver().run('./day8/input.txt')
