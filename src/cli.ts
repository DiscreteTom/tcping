#!/usr/bin/env node

import { run } from "./lib";
import { statsToString } from "./stats";

async function main() {
  await Promise.any([
    run(),
    new Promise<void>((resolve, reject) => {
      process.on("SIGINT", function () {
        resolve();
      });
    }),
  ]);

  console.log(); // empty line
  console.log(statsToString());

  process.exit(0);
}

main();
