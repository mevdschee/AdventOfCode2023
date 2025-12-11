const input = await Deno.readTextFile(new URL('input', import.meta.url));
const lines = input.trim().split('\n');

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const sum = lines.reduce((total: number, line: string) => {
    const [gameInfo, setsStr] = line.split(': ');
    const id = parseInt(gameInfo.replace('Game ', ''));
    const sets = setsStr.split('; ');
    
    let possible = true;
    
    for (const set of sets) {
        const cubes = set.split(', ');
        
        for (const cube of cubes) {
            const [countStr, color] = cube.split(' ');
            const count = parseInt(countStr);
            
            if (color === 'red' && count > MAX_RED) {
                possible = false;
            } else if (color === 'green' && count > MAX_GREEN) {
                possible = false;
            } else if (color === 'blue' && count > MAX_BLUE) {
                possible = false;
            }
        }
    }
    
    return total + (possible ? id : 0);
}, 0);

console.log(sum);
