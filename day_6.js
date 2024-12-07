import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");

const grid = input.split("\n").map((x) => x.split(""));

const rows = grid.length;
const cols = grid[0].length;
const guardPos = [];

// find starting position
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "^") {
      guardPos.push(j, i);
      break;
    }
  }
  if (guardPos.length) {
    break;
  }
}

// start going up then rotate clockwise
const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const visited = new Set();
let d = 0;
let [x, y] = guardPos;

// add starting position to visited
visited.add(`${x},${y}`);

while (x >= 0 && x < rows && y >= 0 && y < cols) {
  const [dx, dy] = directions[d];
  x = x + dx;
  y = y + dy;

  // check if we are out of bounds
  if (x < 0 || x >= cols || y < 0 || y >= rows) {
    break;
  }

  if (grid[y][x] === "#") {
    // rotate betwen clockwise between directions array
    d = (d + 1) % 4;
    x = x - dx;
    y = y - dy;
    continue;
  }

  const key = `${x},${y}`;
  if (visited.has(key) === false) {
    visited.add(key);
  }
}

console.log(`Part 1: ${visited.size}`);

let loopCount = 0;
// loop through all visited nodes and add a wall then check if we can create a loop
for (const node of visited) {
  const [tempX, tempY] = node.split(",").map(Number);
  // dumb js deep copy
  const tempGrid = JSON.parse(JSON.stringify(grid));
  tempGrid[tempY][tempX] = "#";

  const visited2 = new Set();
  let d = 0;
  let [x, y] = guardPos;

  // add starting position to visited
  visited2.add(`${x},${y},${d}`);

  while (x >= 0 && x < rows && y >= 0 && y < cols) {
    const [dx, dy] = directions[d];
    x = x + dx;
    y = y + dy;

    const key = `${x},${y},${d}`;

    // if we have visited this node before, we have a loop
    if (visited2.has(key)) {
      loopCount++;
      break;
    }

    // check if we are out of bounds
    if (x < 0 || x >= cols || y < 0 || y >= rows) {
      break;
    }

    if (tempGrid[y][x] === "#") {
      // rotate betwen clockwise between directions array
      d = (d + 1) % 4;
      x = x - dx;
      y = y - dy;
      continue;
    }

    if (visited2.has(key) === false) {
      visited2.add(key);
    }
  }
}

console.log(`Part 2: ${loopCount}`);
