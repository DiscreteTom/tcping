import yargs from "yargs";

export const argv = yargs(process.argv.slice(2)).options({
  i: { type: "number", alias: "interval", default: 500 },
  t: { type: "number", alias: "timeout", default: 3000 },
}).argv;
