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

For more options, see `tcping --help`.

## [CHANGELOG](https://github.com/DiscreteTom/tcping/blob/main/CHANGELOG.md)
