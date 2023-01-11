#!/usr/bin/env node

import { config } from "./config";
import { run, runHttp } from "./lib";
import { statsToString } from "./stats";

async function main() {
  await Promise.any([
    config.http ? runHttp() : run(),
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
