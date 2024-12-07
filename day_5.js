import { readFile } from "node:fs/promises";

const orderFile = await readFile("order.txt", "utf-8");
const orders = orderFile.split("\n").map((x) => x.split("|").map(Number));

const updateFile = await readFile("updates.txt", "utf-8");
const updates = updateFile.split("\n").map((x) => x.split(",").map(Number));

const orderMap = {};

for (let i = 0; i < orders.length; i++) {
  const [a, b] = orders[i];

  if (orderMap[b] === undefined) {
    orderMap[b] = { before: {}, after: {} };
  }

  if (orderMap[a] === undefined) {
    orderMap[a] = { before: {}, after: {} };
  }

  orderMap[b].after[a] = true;
  orderMap[a].before[b] = true;
}

// part 1
const invalidUpdates = [];
const nums = [];

for (let i = 0; i < updates.length; i++) {
  let valid = true;

  for (let j = 0; j < updates[i].length - 1; j++) {
    const curr = updates[i][j];
    const next = updates[i][j + 1];

    if (orderMap[curr] !== undefined) {
      if (orderMap[curr].after[next] !== undefined) {
        valid = false;
        invalidUpdates.push(updates[i]);
        break;
      }
    }
  }
  if (valid) {
    const middle = Math.floor(updates[i].length / 2);
    nums.push(updates[i][middle]);
  }
}

const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(`Part 1: ${sum}`);

// part 2
const numsPart2 = [];

for (let i = 0; i < invalidUpdates.length; i++) {
  const invalid = invalidUpdates[i];

  for (let j = 0; j < invalid.length - 1; j++) {
    for (let k = j + 1; k < invalid.length; k++) {
      const curr = invalid[j];
      const next = invalid[k];

      if (orderMap[curr] !== undefined) {
        if (orderMap[curr].before[next] !== undefined) {
          invalid[j] = next;
          invalid[k] = curr;
        }
      }
    }
  }

  const middle = Math.floor(invalid.length / 2);
  numsPart2.push(invalid[middle]);
}

const sumPart2 = numsPart2.reduce((acc, curr) => acc + curr, 0);
console.log(`Part 2: ${sumPart2}`);
