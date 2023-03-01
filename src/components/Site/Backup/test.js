"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
  // Write your code here
  let rank = [];
  player.sort((a, b) => b - a);
  let start = 0;
  let now = 1;
  out: for (let i = 0; i < player.length; i++) {
    let score = player[i];
    let old = ranked[0];
    if (score >= ranked[0]) {
      rank.push(now);
      continue;
    }
    for (let j = start; j < ranked.length; j++) {
      if (score >= ranked[j]) {
        rank.push(now + 1);
        start = j;
        continue out;
      }
      if (ranked[j] != old) {
        console.log(ranked[j], old, now + 1);
        old = ranked[j];
        start = j;
        now++;
      }
    }
    if (score < old) {
      rank.push(now + 1);
    }
  }
  return rank.reverse();
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const rankedCount = parseInt(readLine().trim(), 10);

  const ranked = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((rankedTemp) => parseInt(rankedTemp, 10));

  const playerCount = parseInt(readLine().trim(), 10);

  const player = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((playerTemp) => parseInt(playerTemp, 10));

  const result = climbingLeaderboard(ranked, player);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
