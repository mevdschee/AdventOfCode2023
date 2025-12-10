const input = await Deno.readTextFile(new URL('input', import.meta.url));
const lines = input.trim().split('\n');

const digitMap: Record<string, string> = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
};

function getCalibrationValue(line: string): number {
    const digits: string[] = [];
    
    // Search for digits and spelled-out numbers from left to right
    for (let i = 0; i < line.length; i++) {
        // Check for numeric digit
        if (/\d/.test(line[i])) {
            digits.push(line[i]);
        } else {
            // Check for spelled-out digit
            for (const [word, digit] of Object.entries(digitMap)) {
                if (line.substring(i).startsWith(word)) {
                    digits.push(digit);
                    break;
                }
            }
        }
    }
    
    if (digits.length === 0) {
        return 0;
    }
    
    const firstDigit = digits[0];
    const lastDigit = digits[digits.length - 1];
    return parseInt(firstDigit + lastDigit);
}

const sum = lines.reduce((total: number, line: string) => total + getCalibrationValue(line), 0);

console.log(sum);