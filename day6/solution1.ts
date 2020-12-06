import * as fs from 'fs';


class Solver {
    run(filename: string) {
        const groups: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n\n');
        
        let counter = 0;
        for (const group of groups) {
            const uniques: Set<string> = new Set();
            for (const person of group.split('\n')) {
                person.split('').forEach(
                    ch => uniques.add(ch)
                );
            }
            counter += uniques.size;
        }

        console.log(`Answer: ${counter}`);
    }
}

new Solver().run('./day6/input.txt')
