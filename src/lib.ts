import net from "net";
import dns from "dns";

const address = process.argv[2];
const [host, port] = address.split(":");

console.log(`host: ${host} port: ${port}`);

async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function run() {
  // check whether host is ip address using regex
  if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(host)) {
    // not ip address, dns lookup
    try {
      await new Promise<void>((resolve, reject) => {
        dns.lookup(host, (err, address, family) => {
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

  while (true) {
    try {
      await new Promise<void>((resolve, reject) => {
        const sock = new net.Socket();
        sock.setTimeout(3000);

        const start = Date.now();
        sock
          .on("connect", function () {
            console.log(`connected: ${Date.now() - start}ms`);
            sock.destroy();
            resolve();
          })
          .on("error", function (e) {
            reject(e);
          })
          .on("timeout", function () {
            reject("timeout");
          })
          .connect(Number(port), host);
      });
    } catch (e) {
      console.log(e);
    }

    await sleep(500);
  }
}
