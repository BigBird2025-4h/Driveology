export function calculateScore(events) {
  let score = 100;

  score -= events.speeding * 10;
  score -= events.hardBraking * 8;
  score -= events.rapidAcceleration * 6;
  score -= events.sharpTurns * 5;
  score -= events.phoneUsage * 12;

  return Math.max(score, 0);
}