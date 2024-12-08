import { readFile } from "node:fs/promises";

const input = await readFile("input.txt", "utf-8");
const data = input.split("\n").map((x) => x.split("  ").map(Number));

const left = [];
const right = [];
let diff = 0;

// Part 1
for (let i = 0; i < data.length; i++) {
  left.push(data[i][0]);
  right.push(data[i][1]);
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

for (let i = 0; i < left.length; i++) {
  diff += Math.abs(left[i] - right[i]);
}

console.log("Part 1 - difference:", diff);

// Part 2
let similarity = 0;
const rightMap = new Map();

for (let i = 0; i < right.length; i++) {
  if (rightMap.has(right[i])) {
    rightMap.set(right[i], rightMap.get(right[i]) + 1);
  } else {
    rightMap.set(right[i], 1);
  }
}

for (let i = 0; i < left.length; i++) {
  let score = 0;
  if (rightMap.has(left[i])) {
    score = rightMap.get(left[i]) * left[i];
  }
  similarity += score;
}

console.log("Part 2 - Similarity:", similarity);
