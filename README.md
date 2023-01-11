# tcping

[![npm](https://img.shields.io/npm/v/@discretetom/tcping?color=green&style=flat-square)](https://www.npmjs.com/package/@discretetom/tcping)
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
Usage (HTTP mode): tcping -h [options] <url>

Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -i, --interval                                         [number] [default: 500]
  -t, --timeout                                         [number] [default: 3000]
  -p, --port        Port number. Not effective in HTTP mode.
                                                          [number] [default: 80]
  -c, --count       Number of requests to send. -1 for infinite.
                                                          [number] [default: -1]
  -P, --percentile  A list of percentile to display, separated by ",", e.g.
                    "95,99".                              [string] [default: ""]
  -T, --timestamp   Display timestamp in output.      [boolean] [default: false]
  -h, --http        Use HTTP mode.                    [boolean] [default: false]
```

## Examples

### Basics

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

### Percentile

```
# tcping baidu.com 80 -P 95
host: baidu.com, port: 80, count: Infinity
finish dns lookup, address: 39.156.66.10 family: IPv4

connected: 10.422ms
connected: 7.141ms
connected: 8.139ms
connected: 8.767ms
connected: 10.574ms
connected: 8.519ms
connected: 8.372ms
connected: 7.644ms
connected: 8.428ms
connected: 8.558ms
connected: 18.181ms
connected: 9.103ms

statistics:
sent: 12, received: 12, success rate: 100.00%
min: 7.141ms, max: 18.181ms, avg: 9.487ms, p95: 18.181ms
```

### HTTP Mode

```
# tcping -h https://baidu.com
HTTP mode, url: https://baidu.com, count: Infinity

get: 100.288ms, status: 302, length: 161
get: 25.267ms, status: 302, length: 161
get: 26.985ms, status: 302, length: 161
get: 24.540ms, status: 302, length: 161
get: 24.518ms, status: 302, length: 161

statistics:
sent: 5, received: 5, success rate: 100.00%
min: 24.518ms, max: 100.288ms, avg: 40.320ms
```

## [CHANGELOG](https://github.com/DiscreteTom/tcping/blob/main/CHANGELOG.md)
