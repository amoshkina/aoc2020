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

    parseProgram(filename: string): Instruction[] {
        return fs
            .readFileSync(filename, 'utf-8')
            .split('\n')
            .map(
                line => {
                    const [, cmd, value] = line.trim().match(this.commandRegex);
                    return {cmd, param: parseInt(value)};
                });
    }

    exec(program: Instruction[]): boolean {
        while (!this.executed.has(this.iptr) && this.iptr < program.length) {
            this.executed.add(this.iptr);
            const instruction: Instruction = program[this.iptr];
            this[instruction.cmd](instruction.param);
        }

        return this.iptr == program.length
    }

    run(filename: string) {
        const program: Instruction[] = this.parseProgram(filename);
        
        this.exec(program);

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
