import * as fs from 'fs';


class Solver {
    requiredFields = [
        'byr', 'iyr', 'eyr',
        'hgt', 'hcl', 'ecl', 'pid'
    ];

    parsePass(blob: string): Map<string, string> {
        const pairs = blob.split(/\s/);
        const passData: Map<string, string> = new Map();
        pairs.forEach(
            pair => {
                const [field, value] = pair.split(':');
                passData.set(field, value);
            }
        );
        return passData;
    }

    isValidPass(passData: Map<string, string>): boolean {
        for (const field of this.requiredFields) {
            if (!passData.has(field)) {
                return false;
            }
        }
        return true;
    }


    run(filename: string) {
        const passports: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n\n');
    
        let validCounter = 0;

        for (const pass of passports) {
            const passData = this.parsePass(pass);
        
            if (this.isValidPass(passData)) {
                validCounter += 1;
            }
        
        }
        console.log(`Answer: ${validCounter}`);
    }
}


new Solver().run('./day4/input.txt')