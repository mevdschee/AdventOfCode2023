const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

const instructions = lines[0];

const network = new Map<string, [string, string]>();

for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/(\w+) = \((\w+), (\w+)\)/);
    if (match) {
        const [_, node, left, right] = match;
        network.set(node, [left, right]);
    }
}

let currentNode = 'AAA';
let steps = 0;
let instructionIndex = 0;

while (currentNode !== 'ZZZ') {
    const instruction = instructions[instructionIndex];
    const [left, right] = network.get(currentNode)!;
    
    if (instruction === 'L') {
        currentNode = left;
    } else {
        currentNode = right;
    }
    
    steps++;
    instructionIndex = (instructionIndex + 1) % instructions.length;
}

console.log(steps);
