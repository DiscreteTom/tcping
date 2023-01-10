# tcping

[![npm](https://img.shields.io/npm/v/@discretetom/tcping?style=flat-square)](https://www.npmjs.com/package/@discretetom/tcping)
![license](https://img.shields.io/github/license/DiscreteTom/tcping?style=flat-square)

A CLI tool to test how long it takes to establish an TCP connection to a specific address, with percentile support (e.g. p99).

## Installation

```sh
npm install -g @discretetom/tcping
```

## Usage

```
# tcping --help
Usage: tcping [options] <host> [port]

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -i, --interval                                         [number] [default: 500]
  -t, --timeout                                         [number] [default: 3000]
  -p, --port                                              [number] [default: 80]
  -c, --count       Number of pings to send. -1 for infinite.
                                                          [number] [default: -1]
  -P, --percentile  A list of percentile to display, separated by ",", e.g.
                    "95,99".                              [string] [default: ""]
  -T, --timestamp   Display timestamp in output.      [boolean] [default: false]
```

## Example

```
# tcping baidu.com 443
host: baidu.com, port: 443, count: Infinity
finish dns lookup, address: 39.156.66.10 family: IPv4

connected: 52.546ms
connected: 54.906ms
connected: 50.258ms
connected: 50.999ms
connected: 56.020ms
connected: 54.988ms
connected: 344.278ms
connected: 46.484ms

statistics:
sent: 8, received: 8, success rate: 100%
min: 46.484ms, max: 344.278ms, avg: 88.810ms
```

## [CHANGELOG](https://github.com/DiscreteTom/tcping/blob/main/CHANGELOG.md)
