const input = await Deno.readTextFile('input');
const lines = input.trim().split('\n');

interface Hand {
    cards: string;
    bid: number;
}

const cardValues: { [key: string]: number } = {
    'J': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'T': 10, 'Q': 12, 'K': 13, 'A': 14
};

function getHandType(cards: string): number {
    const counts = new Map<string, number>();
    
    for (const card of cards) {
        counts.set(card, (counts.get(card) || 0) + 1);
    }
    
    const jokerCount = counts.get('J') || 0;
    
    if (jokerCount === 5) {
        return 7;
    }
    
    if (jokerCount > 0) {
        counts.delete('J');
        
        const sortedEntries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
        const bestCard = sortedEntries[0][0];
        counts.set(bestCard, counts.get(bestCard)! + jokerCount);
    }
    
    const sortedCounts = Array.from(counts.values()).sort((a, b) => b - a);
    
    if (sortedCounts[0] === 5) return 7;
    if (sortedCounts[0] === 4) return 6;
    if (sortedCounts[0] === 3 && sortedCounts[1] === 2) return 5;
    if (sortedCounts[0] === 3) return 4;
    if (sortedCounts[0] === 2 && sortedCounts[1] === 2) return 3;
    if (sortedCounts[0] === 2) return 2;
    return 1;
}

const hands: Hand[] = [];

for (const line of lines) {
    const [cards, bidStr] = line.split(' ');
    hands.push({ cards, bid: parseInt(bidStr) });
}

hands.sort((a: Hand, b: Hand) => {
    const typeA = getHandType(a.cards);
    const typeB = getHandType(b.cards);
    
    if (typeA !== typeB) {
        return typeA - typeB;
    }
    
    for (let i = 0; i < 5; i++) {
        const valueA = cardValues[a.cards[i]];
        const valueB = cardValues[b.cards[i]];
        
        if (valueA !== valueB) {
            return valueA - valueB;
        }
    }
    
    return 0;
});

let totalWinnings = 0;

for (let i = 0; i < hands.length; i++) {
    const rank = i + 1;
    totalWinnings += hands[i].bid * rank;
}

console.log(totalWinnings);
