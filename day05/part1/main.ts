const input = await Deno.readTextFile('input');
const sections = input.trim().split('\n\n');

const seedLine = sections[0];
const seeds = seedLine.split(': ')[1].split(' ').map(n => parseInt(n));

interface MapRange {
    destStart: number;
    sourceStart: number;
    length: number;
}

const maps: MapRange[][] = [];

for (let i = 1; i < sections.length; i++) {
    const lines = sections[i].split('\n');
    const ranges: MapRange[] = [];
    
    for (let j = 1; j < lines.length; j++) {
        const [destStart, sourceStart, length] = lines[j].split(' ').map(n => parseInt(n));
        ranges.push({ destStart, sourceStart, length });
    }
    
    maps.push(ranges);
}

let minLocation = Infinity;

for (const seed of seeds) {
    let value = seed;
    
    for (const mapRanges of maps) {
        let mapped = value;
        for (const range of mapRanges) {
            if (value >= range.sourceStart && value < range.sourceStart + range.length) {
                mapped = range.destStart + (value - range.sourceStart);
                break;
            }
        }
        value = mapped;
    }
    
    minLocation = Math.min(minLocation, value);
}

console.log(minLocation);
