import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");

const grid = input.split("\n").map((x) => x.split(""));

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function countXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isValid(r, c) {
    // remain inside the grid
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  function checkPattern(r, c, dr, dc, pattern, visited) {
    let currentKey = `${r},${c}`;

    for (let i = 0; i < pattern.length; i++) {
      const nr = r + i * dr;
      const nc = c + i * dc;

      currentKey = `${nr},${nc}`;

      if (!isValid(nr, nc) || grid[nr][nc] !== pattern[i]) {
        return false;
      }
    }

    // check if the current key has been visited
    if (visited.has(currentKey)) {
      return false;
    }

    return true;
  }

  // set to keep track of valid starting points
  const visited = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r},${c}`;
      if (grid[r][c] === "X" || grid[r][c] === "S") {
        for (const [dr, dc] of directions) {
          if (checkPattern(r, c, dr, dc, "XMAS", visited)) {
            visited.add(key);
            count++;
          } else if (checkPattern(r, c, dr, dc, "SAMX", visited)) {
            visited.add(key);
            count++;
          }
        }
      }
    }
  }
  return count;
}

console.log(countXMAS(grid));
