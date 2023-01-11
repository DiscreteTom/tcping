import { config } from "./config";

function getPercentile(sorted: number[], percentile: number) {
  const index = Math.floor((percentile / 100) * sorted.length);
  return sorted[index];
}

export const stats = {
  sent: 0,
  received: 0,
  min: Infinity,
  max: 0,
  sum: 0,
  records: [] as number[],
};

export function statsToString() {
  // sort records for percentile calculation
  if (config.percentile.length > 0) stats.records.sort((a, b) => a - b);

  return (
    `statistics:\n` +
    [
      `sent: ${stats.sent}`,
      `received: ${stats.received}`,
      `success rate: ${((stats.received / stats.sent) * 100).toFixed(2)}%`,
    ].join(", ") +
    "\n" +
    [
      `min: ${stats.min.toFixed(3)}ms`,
      `max: ${stats.max.toFixed(3)}ms`,
      `avg: ${(stats.sum / stats.received).toFixed(3)}ms`,
      // percentile
      ...config.percentile.map(
        (p) => `p${p}: ${getPercentile(stats.records, p).toFixed(3)}ms`
      ),
    ].join(", ")
  );
}
