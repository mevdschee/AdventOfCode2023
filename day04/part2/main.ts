const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

const matches: number[] = [];

for (const line of lines) {
    const [_, numbers] = line.split(': ');
    const [winningPart, havePart] = numbers.split(' | ');
    
    const winningNumbers = new Set(winningPart.trim().split(/\s+/).map(n => parseInt(n)));
    const haveNumbers = havePart.trim().split(/\s+/).map(n => parseInt(n));
    
    let matchCount = 0;
    for (const num of haveNumbers) {
        if (winningNumbers.has(num)) {
            matchCount++;
        }
    }
    
    matches.push(matchCount);
}

const copies = new Array(matches.length).fill(1);

for (let i = 0; i < matches.length; i++) {
    const matchCount = matches[i];
    const currentCopies = copies[i];
    
    for (let j = 1; j <= matchCount && i + j < matches.length; j++) {
        copies[i + j] += currentCopies;
    }
}

const totalCards = copies.reduce((sum, count) => sum + count, 0);

console.log(totalCards);
