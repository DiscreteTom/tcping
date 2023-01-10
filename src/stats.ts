export const stats = {
  sent: 0,
  received: 0,
  min: Infinity,
  max: 0,
  sum: 0,
};

export function statsToString() {
  return (
    `statistics:\n` +
    `sent: ${stats.sent}, received: ${stats.received}, success rate: ${
      (stats.sent / stats.received) * 100
    }% \n` +
    `min: ${stats.min.toFixed(3)}ms max: ${stats.max.toFixed(3)}ms avg: ${(
      stats.sum / stats.received
    ).toFixed(3)}ms`
  );
}
