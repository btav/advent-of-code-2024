import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");

const reports = input.split("\n").map((x) => x.split(" ").map(Number));

function isReportSafe(level) {
  const isDecreasing = level[0] > level[1];
  const isIncreasing = level[0] < level[1];

  if (isDecreasing === false && isIncreasing === false) {
    return false;
  }

  let valid = true;

  for (let j = 1; j < level.length; j++) {
    if (Math.abs(level[j] - level[j - 1]) <= 3 === false) {
      valid = false;
    }
    if (isDecreasing && level[j] >= level[j - 1]) {
      valid = false;
    }
    if (isIncreasing && level[j] <= level[j - 1]) {
      valid = false;
    }
  }

  return valid;
}

function newArrayWithoutIndex(originalArray, indexToRemove) {
  return originalArray
    .slice(0, indexToRemove)
    .concat(originalArray.slice(indexToRemove + 1));
}

function calculateSafeScore(reports, part2 = false) {
  let safe = 0;

  for (let i = 0; i < reports.length; i++) {
    if (isReportSafe(reports[i])) {
      safe += 1;
    } else {
      if (part2) {
        for (let j = 0; j < reports[i].length; j++) {
          const newArray = newArrayWithoutIndex(reports[i], j);
          if (isReportSafe(newArray)) {
            safe += 1;
            break;
          }
        }
      }
    }
  }

  return safe;
}

console.log(`Part 1:${calculateSafeScore(reports)}`);
console.log(`Part 1:${calculateSafeScore(reports, true)}`);
