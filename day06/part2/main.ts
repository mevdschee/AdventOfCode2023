const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

const time = parseInt(lines[0].split(':')[1].replace(/\s+/g, ''));
const distance = parseInt(lines[1].split(':')[1].replace(/\s+/g, ''));

let ways = 0;

for (let holdTime = 0; holdTime <= time; holdTime++) {
    const speed = holdTime;
    const travelTime = time - holdTime;
    const distanceTraveled = speed * travelTime;
    
    if (distanceTraveled > distance) {
        ways++;
    }
}

console.log(ways);
