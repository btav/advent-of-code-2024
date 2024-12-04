import { readFile } from "node:fs/promises";
const input = await readFile("input.txt", "utf-8");

const puzzle = input.split("\n").join();

function extractInstructions(input) {
  const pattern = /mul\s*\(([\w\.]+),([\w\.]+)\)/g;
  const matches = input.match(pattern);
  return matches || [];
}

const instructions1 = extractInstructions(puzzle);

const sum1 = instructions1.reduce((acc, cur) => {
  const [_, a, b] = cur.match(/mul\s*\(([\w\.]+),([\w\.]+)\)/);
  return acc + a * b;
}, 0);

console.log(`Part 1: ${sum1}`);

const instructions2 = extractInstructions2(puzzle);

function extractInstructions2(input) {
  const pattern = /(?:mul|do|don't)\s*(?:\([^)]+\)|\(.*?\))/gi;
  const matches = input.match(pattern);
  return matches || [];
}

let sum2 = 0;
let isEnabled = true;

for (let i = 0; i < instructions2.length; i++) {
  const instruction = instructions2[i];
  if (instruction.startsWith("mul")) {
    try {
      const [_, a, b] = instruction.match(/mul\s*\(([\w\.]+),([\w\.]+)\)/);
      if (isEnabled) {
        sum2 += a * b;
      }
    } catch (e) {
      // ignore instructions with regex errors, this is because my parsing regex is not great
    }
  }
  if (instruction.startsWith("do()")) {
    isEnabled = true;
  }
  if (instruction.startsWith("don't()")) {
    isEnabled = false;
  }
}

console.log(`Part 2: ${sum2}`);
