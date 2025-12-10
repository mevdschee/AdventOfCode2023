const input = await Deno.readTextFile(new URL('input', import.meta.url));
const lines = input.trim().split('\n');

function getCalibrationValue(line: string): number {
    const digits = line.match(/\d/g);
    if (!digits || digits.length === 0) {
        return 0;
    }
    const firstDigit = digits[0];
    const lastDigit = digits[digits.length - 1];
    return parseInt(firstDigit + lastDigit);
}

const sum = lines.reduce((total: number, line: string) => total + getCalibrationValue(line), 0);

console.log(sum);