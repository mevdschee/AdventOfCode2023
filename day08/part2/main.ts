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

const startNodes: string[] = [];
for (const node of network.keys()) {
    if (node.endsWith('A')) {
        startNodes.push(node);
    }
}

const cycleLengths = startNodes.map(startNode => {
    let currentNode = startNode;
    let steps = 0;
    let instructionIndex = 0;
    
    while (!currentNode.endsWith('Z')) {
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
    
    return steps;
});

function gcd(a: number, b: number): number {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

let result = cycleLengths[0];
for (let i = 1; i < cycleLengths.length; i++) {
    result = lcm(result, cycleLengths[i]);
}

console.log(result);
