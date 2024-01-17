import promptSync from 'prompt-sync';

const MAX_CELL = 8;
const GUESS_LIMIT = 20;
const NUM_SHIPS = 2;

interface ShipPosition {
  x: number;
  y: number;
}

const prompt = promptSync();

function randomNumber(max: number): number {
  return Math.floor(Math.random() * (max - 1)) + 1;
}

function generateShipPosition(): ShipPosition {
  return {
    x: randomNumber(MAX_CELL),
    y: randomNumber(MAX_CELL),
  };
}

function readUserGuess(): ShipPosition {
  const result = prompt('PLease enter ship coordinates as X Y: ');
  
  const [x, y] = result
    .split(' ')
    .map((number: string) => parseInt(number.trim()));
  
  return { x, y };
}

function calculateDistance(a: ShipPosition, b: ShipPosition): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function findShortestDistance(distances: number[]): number {
  return distances.reduce(
    (acc, distance) => acc < distance ? acc : distance,
    Number. MAX_VALUE
  );
}

function isHit(distance: number): boolean {
  return distance == 0;
}

function distanceToProximity(distance: number): string {
  switch(distance) {
    case 1:
    case 2:
      return 'Hot';
    case 3:
    case 4:
      return 'Warm';
    default:
      return 'Cold';
  }
}

function isPositionTaken(positions: ShipPosition[], newPosition: ShipPosition): boolean {
  for (const position of positions) {
    if (calculateDistance(position, newPosition) == 0) {
      return true;
    }
  }
  
  return false;
}

function setupGame(numberOfShips: number) {
  const generatedPositions: ShipPosition[] = [];
  
  while (generatedPositions.length < numberOfShips) {
    const position = generateShipPosition();
    
    if (isPositionTaken(generatedPositions, position)) {
      continue;
    }
    
    generatedPositions.push(position);
  }
  
  return generatedPositions;
}

function runGame(shipPositions: ShipPosition[], guessLimit: number): boolean {
  let guessCount = 0;
  
  while (guessCount < guessLimit && shipPositions.length != 0) {
    const survivedShips: ShipPosition[] = [];
    const distances: number[] = [];
    let hasHitInRound = false;

    const userGuess = readUserGuess();
    
    for (const shipPosition of shipPositions) {
      const distance = calculateDistance(shipPosition, userGuess);
      const hasHit = isHit(distance);

      hasHitInRound ||= hasHit;
      
      if (hasHit) {
        continue;
      } 
      
      distances.push(distance);
      survivedShips.push(shipPosition);
    }

    shipPositions = survivedShips;

    if (hasHitInRound) {
      console.log('Hit');
      continue;
    }
    
    const shortestDistance = findShortestDistance(distances);
    console.log(distanceToProximity(shortestDistance));

    guessCount += 1;
  }
  
  return shipPositions.length == 0;
}

const shipPositions = setupGame(NUM_SHIPS);
const gameResult = runGame(shipPositions, GUESS_LIMIT);

if (gameResult) {
  console.log('You won');
} else {
  console.log('You lost');
}
