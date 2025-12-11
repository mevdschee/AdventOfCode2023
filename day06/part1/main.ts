const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

const times = lines[0].split(':')[1].trim().split(/\s+/).map(n => parseInt(n));
const distances = lines[1].split(':')[1].trim().split(/\s+/).map(n => parseInt(n));

let result = 1;

for (let i = 0; i < times.length; i++) {
    let ways = 0;
    
    for (let holdTime = 0; holdTime <= times[i]; holdTime++) {
        const speed = holdTime;
        const travelTime = times[i] - holdTime;
        const distance = speed * travelTime;
        
        if (distance > distances[i]) {
            ways++;
        }
    }
    
    result *= ways;
}

console.log(result);
