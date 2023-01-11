import yargs from "yargs";

const argv = yargs(process.argv.slice(2))
  .usage(
    "Usage: tcping [options] <host> [port]\nUsage (HTTP mode): tcping -h [options] <url>"
  )
  .options({
    i: { type: "number", alias: "interval", default: 500 },
    t: { type: "number", alias: "timeout", default: 3000 },
    p: {
      type: "number",
      alias: "port",
      default: 80,
      description: "Port number. Not effective in HTTP mode.",
    },
    c: {
      type: "number",
      alias: "count",
      default: -1,
      description: "Number of requests to send. -1 for infinite.",
    },
    P: {
      type: "string",
      alias: "percentile",
      default: "",
      description:
        'A list of percentile to display, separated by ",", e.g. "95,99".',
    },
    T: {
      type: "boolean",
      alias: "timestamp",
      default: false,
      description: "Display timestamp in output.",
    },
    h: {
      type: "boolean",
      alias: "http",
      default: false,
      description: "Use HTTP mode.",
    },
  })
  .parseSync();

export const config = Object.freeze({
  interval: argv.i,
  timeout: argv.t,
  port: (argv._[1] as number) ?? argv.p,
  host: argv._[0] as string,
  count: argv.c == -1 ? Infinity : argv.c,
  percentile: argv.P.split(",")
    .filter((x) => x.length > 0)
    .map((x) => Number(x)),
  timestamp: argv.T,
  http: argv.h,
  url: argv._[0] as string,
});
