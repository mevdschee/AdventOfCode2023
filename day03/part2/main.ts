const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

const numbers: { value: number; row: number; colStart: number; colEnd: number }[] = [];

for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    let col = 0;
    
    while (col < line.length) {
        if (/\d/.test(line[col])) {
            let numStr = '';
            const colStart = col;
            
            while (col < line.length && /\d/.test(line[col])) {
                numStr += line[col];
                col++;
            }
            
            const colEnd = col - 1;
            numbers.push({ value: parseInt(numStr), row, colStart, colEnd });
        } else {
            col++;
        }
    }
}

let sum = 0;

for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
        if (line[col] === '*') {
            const adjacentNumbers = numbers.filter(num => {
                if (Math.abs(row - num.row) > 1) return false;
                
                for (let c = num.colStart; c <= num.colEnd; c++) {
                    const rowDiff = Math.abs(row - num.row);
                    const colDiff = Math.abs(col - c);
                    if (rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0)) {
                        return true;
                    }
                }
                return false;
            });
            
            if (adjacentNumbers.length === 2) {
                const gearRatio = adjacentNumbers[0].value * adjacentNumbers[1].value;
                sum += gearRatio;
            }
        }
    }
}

console.log(sum);
