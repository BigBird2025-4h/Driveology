export function createTrip({
  startTime,
  endTime,
  speedData = [],
  score,
  hardBrakes = 0,
  phoneUses = 0,
  speedingEvents = 0,
  distance = 0,
  route = [],
}) {
  const duration = Math.max((endTime - startTime) / 1000, 1);

  const avgSpeed =
    speedData.length > 0
      ? speedData.reduce((a, b) => a + b, 0) / speedData.length
      : 0;

  const maxSpeed =
    speedData.length > 0 ? Math.max(...speedData) : 0;

  return {
    id: `${Date.now()}`,
    startTime,
    endTime,
    duration,
    avgSpeed: Number(avgSpeed.toFixed(1)),
    maxSpeed: Number(maxSpeed.toFixed(1)),
    score,
    hardBrakes,
    phoneUses,
    speedingEvents,
    distance,
    route,
  };
}