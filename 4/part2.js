import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");

const grid = input.split("\n").map((x) => x.split(""));

function countXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const valid = [
    // M M
    //  A
    // S S
    "MMSS",
    // M S
    //  A
    // M S
    "MSSM",
    // S S
    //  A
    // M M
    "SSMM",
    // S M
    //  A
    // S M
    "SMMS",
  ];

  // "A" cannot be on the borders
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r][c] === "A") {
        const corners = [
          grid[r - 1][c - 1],
          grid[r - 1][c + 1],
          grid[r + 1][c + 1],
          grid[r + 1][c - 1],
        ].join("");

        if (valid.includes(corners)) {
          count++;
        }
      }
    }
  }
  return count;
}

console.log(countXMAS(grid));
