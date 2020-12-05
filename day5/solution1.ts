import * as fs from 'fs';


class Solver {
    run(filename: string) {
        const passes: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n');
    
        let maxSid = 0;

        for (let pass of passes) {
            pass = pass
                .replace(/R/g, '1')
                .replace(/L/g, '0')
                .replace(/B/g, '1')
                .replace(/F/g, '0');
            maxSid = Math.max(maxSid, parseInt(pass, 2));
        }
        console.log(`Answer: ${maxSid}`);
    }
}

new Solver().run('./day5/input.txt')
