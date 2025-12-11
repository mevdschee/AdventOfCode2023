const input = await Deno.readTextFile('input');
const sections = input.trim().split('\n\n');

const seedLine = sections[0];
const seedNums = seedLine.split(': ')[1].split(' ').map(n => parseInt(n));

interface Range {
    start: number;
    length: number;
}

interface MapRange {
    destStart: number;
    sourceStart: number;
    length: number;
}

const seedRanges: Range[] = [];
for (let i = 0; i < seedNums.length; i += 2) {
    seedRanges.push({ start: seedNums[i], length: seedNums[i + 1] });
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

let currentRanges = seedRanges;

for (const mapRangeSet of maps) {
    const outputRanges: Range[] = [];
    
    for (const inputRange of currentRanges) {
        const queue: Range[] = [inputRange];
        
        while (queue.length > 0) {
            const current = queue.shift()!;
            let mapped = false;
            
            for (const mapRange of mapRangeSet) {
                const sourceEnd = mapRange.sourceStart + mapRange.length;
                const currentEnd = current.start + current.length;
                
                if (current.start < sourceEnd && currentEnd > mapRange.sourceStart) {
                    const overlapStart = Math.max(current.start, mapRange.sourceStart);
                    const overlapEnd = Math.min(currentEnd, sourceEnd);
                    
                    const offset = overlapStart - mapRange.sourceStart;
                    outputRanges.push({
                        start: mapRange.destStart + offset,
                        length: overlapEnd - overlapStart
                    });
                    
                    if (current.start < overlapStart) {
                        queue.push({
                            start: current.start,
                            length: overlapStart - current.start
                        });
                    }
                    
                    if (currentEnd > overlapEnd) {
                        queue.push({
                            start: overlapEnd,
                            length: currentEnd - overlapEnd
                        });
                    }
                    
                    mapped = true;
                    break;
                }
            }
            
            if (!mapped) {
                outputRanges.push(current);
            }
        }
    }
    
    currentRanges = outputRanges;
}

let minLocation = Infinity;
for (const range of currentRanges) {
    minLocation = Math.min(minLocation, range.start);
}

console.log(minLocation);
