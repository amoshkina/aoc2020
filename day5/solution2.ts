import * as fs from 'fs';


class Solver {
    run(filename: string) {
        const passes: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n');
    
        let [maxSid, minSid] = [0, 9999999999999];
        const presentSids: Set<number> = new Set();

        for (const pass of passes) {
            const sid: number = parseInt(
                pass.replace(/R/g, '1')
                    .replace(/L/g, '0')
                    .replace(/B/g, '1')
                    .replace(/F/g, '0'),
                2);
            [maxSid, minSid] = [Math.max(maxSid, sid), Math.min(minSid, sid)];
            presentSids.add(sid);
        }

        const allSids: number[] = [];
        for (var i = minSid; i <= maxSid; i++) { allSids.push(i); }

        console.log(`Answer: ${allSids.filter(item => !presentSids.has(item))}`);
    }
}

new Solver().run('./day5/input.txt')
