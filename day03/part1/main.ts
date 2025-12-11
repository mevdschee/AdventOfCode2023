const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

let sum = 0;

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
            const num = parseInt(numStr);
            
            let hasSymbol = false;
            for (let r = row - 1; r <= row + 1; r++) {
                if (r < 0 || r >= lines.length) continue;
                
                for (let c = colStart - 1; c <= colEnd + 1; c++) {
                    if (c < 0 || c >= lines[r].length) continue;
                    if (r === row && c >= colStart && c <= colEnd) continue;
                    
                    const char = lines[r][c];
                    if (char !== '.' && !/\d/.test(char)) {
                        hasSymbol = true;
                        break;
                    }
                }
                if (hasSymbol) break;
            }
            
            if (hasSymbol) {
                sum += num;
            }
        } else {
            col++;
        }
    }
}

console.log(sum);
