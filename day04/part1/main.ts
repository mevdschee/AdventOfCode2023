const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

let totalPoints = 0;

for (const line of lines) {
    const [_, numbers] = line.split(': ');
    const [winningPart, havePart] = numbers.split(' | ');
    
    const winningNumbers = new Set(winningPart.trim().split(/\s+/).map(n => parseInt(n)));
    const haveNumbers = havePart.trim().split(/\s+/).map(n => parseInt(n));
    
    let matches = 0;
    for (const num of haveNumbers) {
        if (winningNumbers.has(num)) {
            matches++;
        }
    }
    
    if (matches > 0) {
        const points = Math.pow(2, matches - 1);
        totalPoints += points;
    }
}

console.log(totalPoints);
