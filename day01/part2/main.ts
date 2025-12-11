const input = await Deno.readTextFile('input');
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

const sum = lines.reduce((total: number, line: string) => {
    const digits: string[] = [];
    
    for (let i = 0; i < line.length; i++) {
        if (/\d/.test(line[i])) {
            digits.push(line[i]);
        } else {
            for (const [word, digit] of Object.entries(digitMap)) {
                if (line.substring(i).startsWith(word)) {
                    digits.push(digit);
                    break;
                }
            }
        }
    }
    
    if (digits.length === 0) {
        return total;
    }
    
    const firstDigit = digits[0];
    const lastDigit = digits[digits.length - 1];
    return total + parseInt(firstDigit + lastDigit);
}, 0);

console.log(sum);