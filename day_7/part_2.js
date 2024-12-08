import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");

const lines = input.split("\n");

function getCombinations(arr) {
  const result = [];

  function combination(current, index) {
    if (index >= arr.length) {
      result.push(current);
      return;
    }

    combination(current + arr[index], index + 1);
    combination(current * arr[index], index + 1);
    combination(Number(`${current}${arr[index]}`), index + 1);
  }

  combination(arr[0], 1);
  return result;
}

let sum = 0;

for (let i = 0; i < lines.length; i++) {
  const [totalStr, numsStr] = lines[i].split(":");
  const total = Number(totalStr);

  const nums = numsStr
    .split(" ")
    .map(Number)
    .filter((x) => x !== 0);

  const combinations = getCombinations(nums);

  for (let j = 0; j < combinations.length; j++) {
    if (combinations[j] === total) {
      sum += combinations[j];
      break;
    }
  }
}

console.log(`Part 2: ${sum}`);
