import net from "net";
import dns from "dns";
import { config } from "./config";
import { stats } from "./stats";
import * as https from "https";

async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/** Get current time in microseconds. */
function now() {
  const hrtime = process.hrtime();
  return hrtime[0] * 1000000 + hrtime[1] / 1000;
}

export async function run() {
  console.log(
    `host: ${config.host}, port: ${config.port}, count: ${config.count}`
  );

  // check whether host is ip address using regex
  if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(config.host)) {
    // not ip address, dns lookup
    try {
      await new Promise<void>((resolve, reject) => {
        dns.lookup(config.host, (err, address, family) => {
          if (err) {
            reject(err);
            return;
          }
          console.log(
            `finish dns lookup, address: ${address} family: IPv${family}`
          );
          resolve();
        });
      });
    } catch (e) {
      console.error(e);
      return;
    }
  }

  console.log(); // empty line

  while (stats.sent < config.count) {
    try {
      await new Promise<void>((resolve, reject) => {
        const sock = new net.Socket();
        sock.setTimeout(config.timeout);

        const start = now();
        sock
          .on("connect", function () {
            const latencyMs = (now() - start) / 1000;
            const result =
              (config.timestamp ? new Date().toISOString() + " " : "") +
              `connected: ${latencyMs.toFixed(3)}ms`;
            console.log(result);
            sock.destroy();

            // update stats on success
            stats.sent++;
            stats.received++;
            stats.min = Math.min(stats.min, latencyMs);
            stats.max = Math.max(stats.max, latencyMs);
            stats.sum += latencyMs;
            // record latency for percentile calculation
            if (config.percentile.length > 0) stats.records.push(latencyMs);

            resolve();
          })
          .on("error", function (e) {
            reject(e);
          })
          .on("timeout", function () {
            reject("timeout");
          })
          .connect(config.port, config.host);
      });
    } catch (e) {
      // update stats on failure
      stats.sent++;
      console.log(e);
    }

    await sleep(config.interval);
  }
}

export async function runHttp() {
  console.log(`HTTP mode, url: ${config.url}, count: ${config.count}`);
  console.log(); // empty line

  while (stats.sent < config.count) {
    try {
      await new Promise<void>((resolve, reject) => {
        const start = now();
        https
          .request(config.url, { timeout: config.timeout }, (res) => {
            res.on("data", () => {}); // ignore response body. this function is required to receive response.
            res.on("close", () => {
              const latencyMs = (now() - start) / 1000;
              const result =
                (config.timestamp ? new Date().toISOString() + " " : "") +
                `get: ${latencyMs.toFixed(3)}ms, status: ${
                  res.statusCode
                }, length: ${res.headers["content-length"]}`;
              console.log(result);

              // update stats on success
              stats.sent++;
              stats.received++;
              stats.min = Math.min(stats.min, latencyMs);
              stats.max = Math.max(stats.max, latencyMs);
              stats.sum += latencyMs;
              // record latency for percentile calculation
              if (config.percentile.length > 0) stats.records.push(latencyMs);

              resolve();
            });
            res.on("error", (e) => reject(e));
          })
          .on("error", (e) => reject(e))
          .on("timeout", () => reject("timeout"))
          .end();
      });
    } catch (e) {
      // update stats on failure
      stats.sent++;
      console.log(e);
    }

    await sleep(config.interval);
  }
}
