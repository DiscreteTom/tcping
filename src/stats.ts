import { config } from "./config";

function getPercentile(values: number[], percentile: number) {
  values.sort((a, b) => a - b);
  const index = Math.floor((percentile / 100) * values.length);
  return values[index];
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
  return (
    `statistics:\n` +
    [
      `sent: ${stats.sent}`,
      `received: ${stats.received}`,
      `success rate: ${(stats.sent / stats.received) * 100}%`,
    ].join(", ") +
    "\n" +
    [
      `min: ${stats.min.toFixed(3)}ms`,
      `max: ${stats.max.toFixed(3)}ms`,
      `avg: ${(stats.sum / stats.received).toFixed(3)}ms`,
      // percentile
      ...config.percentile
        .split(",")
        .filter((p) => p != "")
        .map(
          (p) =>
            `p${p}: ${getPercentile(stats.records, parseInt(p)).toFixed(3)}ms`
        ),
    ].join(", ")
  );
}
