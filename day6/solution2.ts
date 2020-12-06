import * as fs from 'fs';


class Solver {
    run(filename: string) {
        const groups: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n\n');
        
        let counter = 0;
        for (const group of groups) {
            const answers: Map<string, number> = new Map();
            const persons: string[] = group.split('\n');
            for (const person of persons) {
                person.split('').forEach(
                    ch => {
                        answers.set(ch, (answers.get(ch) || 0) + 1)
                    }
                );
            }
            for (const [, count] of answers.entries()) {
                if (count == persons.length) {
                    counter += 1;
                }
            }
        }

        console.log(`Answer: ${counter}`);
    }
}

new Solver().run('./day6/input.txt')
