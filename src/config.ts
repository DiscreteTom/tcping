import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 [options] <host> [port]")
  .options({
    i: { type: "number", alias: "interval", default: 500 },
    t: { type: "number", alias: "timeout", default: 3000 },
    p: { type: "number", alias: "port", default: 80 },
  })
  .parseSync();

export const config = {
  interval: argv.i,
  timeout: argv.t,
  port: (argv._[1] as number) ?? argv.p,
  host: argv._[0] as string,
};
