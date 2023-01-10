import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 [options] <host> [port]")
  .options({
    i: { type: "number", alias: "interval", default: 500 },
    t: { type: "number", alias: "timeout", default: 3000 },
    p: { type: "number", alias: "port", default: 80 },
    c: {
      type: "number",
      alias: "count",
      default: -1,
      description: "Number of pings to send. -1 for infinite.",
    },
    P: {
      type: "string",
      alias: "percentile",
      default: "",
      description:
        'A list of percentile to display, separated by ",", e.g. "95,99"',
    },
  })
  .parseSync();

export const config = {
  interval: argv.i,
  timeout: argv.t,
  port: (argv._[1] as number) ?? argv.p,
  host: argv._[0] as string,
  count: argv.c == -1 ? Infinity : argv.c,
  percentile: argv.P,
};
