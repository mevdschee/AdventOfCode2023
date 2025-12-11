const input = await Deno.readTextFile(new URL('input', import.meta.url));
const lines = input.trim().split('\n');

const sum = lines.reduce((total: number, line: string) => {
    const [, setsStr] = line.split(': ');
    const sets = setsStr.split('; ');
    
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    
    for (const set of sets) {
        const cubes = set.split(', ');
        
        for (const cube of cubes) {
            const [countStr, color] = cube.split(' ');
            const count = parseInt(countStr);
            
            if (color === 'red' && count > maxRed) {
                maxRed = count;
            } else if (color === 'green' && count > maxGreen) {
                maxGreen = count;
            } else if (color === 'blue' && count > maxBlue) {
                maxBlue = count;
            }
        }
    }
    
    const power = maxRed * maxGreen * maxBlue;
    return total + power;
}, 0);

console.log(sum);
