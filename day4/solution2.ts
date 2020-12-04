import * as fs from 'fs';


class Solver {
    requiredFields = [
        'byr', 'iyr', 'eyr',
        'hgt', 'hcl', 'ecl', 'pid'
    ];

    eyeColors = new Set([
        'amb', 'blu', 'brn', 
        'gry', 'grn', 'hzl', 'oth'
    ]);

    whitespaceRegex = new RegExp(/\s/);

    yearRegex = new RegExp(/^\d{4}$/);

    heightRegex = new RegExp(/^(\d{2,3})(cm|in)$/);

    colorRegex = new RegExp(/^#[0-9a-f]{6}$/);

    pidRegex = new RegExp(/^[0-9]{9}$/);

    parsePass(blob: string): Map<string, string> {
        const pairs = blob.split(this.whitespaceRegex);
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
            if (!passData.has(field) || !this[field](passData.get(field))) {
                return false;
            }
        }
        return true;
    }

    checkYear(value:string, from: number, to: number) {
        if (!this.yearRegex.test(value)) {
            return false;
        }

        const year = parseInt(value);
        return from <= year && year <= to;
    }

    byr(value: string): boolean {
        return this.checkYear(value, 1920, 2002);
    }

    iyr(value: string): boolean {
        return this.checkYear(value, 2010, 2020);
    }

    eyr(value: string): boolean {
        return this.checkYear(value, 2020, 2030);
    }

    hgt(value: string): boolean {
        if (!this.heightRegex.test(value)) {
            return false;
        }

        let [, heightStr, unit] = value.match(this.heightRegex);

        let height = parseInt(heightStr);

        if (unit == 'cm') {
            return 150 <= height && height <= 193;
        } else { // unit == 'in'
            return 59 <= height && height <= 76
        }

    }

    hcl(value: string): boolean {
        return this.colorRegex.test(value);
    }

    ecl(value: string): boolean {
        return this.eyeColors.has(value);
    }

    pid(value: string): boolean {
        return this.pidRegex.test(value);
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
