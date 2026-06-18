export function generateCoachFeedback(trip) {
  const messages = [];

  const {
    score,
    hardBrakes,
    phoneUses,
    speedingEvents,
    avgSpeed,
    maxSpeed,
    distance,
    duration,
  } = trip;

  // -----------------------
  // SCORE SUMMARY
  // -----------------------
  if (score >= 90) {
    messages.push("Excellent driving — very safe and controlled trip.");
  } else if (score >= 75) {
    messages.push("Good driving overall, with a few minor issues.");
  } else if (score >= 60) {
    messages.push("Moderate driving performance — room for improvement.");
  } else {
    messages.push("High-risk driving detected — please be more cautious.");
  }

  // -----------------------
  // HARD BRAKING
  // -----------------------
  if (hardBrakes >= 8) {
    messages.push(
      "Frequent hard braking detected. Try increasing following distance."
    );
  } else if (hardBrakes >= 4) {
    messages.push("Some hard braking events — smoother braking recommended.");
  } else if (hardBrakes >= 1) {
    messages.push("Good braking control overall.");
  }

  // -----------------------
  // PHONE USAGE
  // -----------------------
  if (phoneUses >= 5) {
    messages.push(
      "High phone usage detected. This significantly increases crash risk."
    );
  } else if (phoneUses >= 2) {
    messages.push("Phone usage detected — try to keep focus on the road.");
  } else if (phoneUses === 0) {
    messages.push("Excellent focus — no phone distraction detected.");
  }

  // -----------------------
  // SPEEDING
  // -----------------------
  if (speedingEvents >= 5) {
    messages.push("Frequent speeding events — consider reducing speed.");
  } else if (speedingEvents >= 1) {
    messages.push("Occasional speeding detected.");
  } else {
    messages.push("Speed control was consistent and safe.");
  }

  // -----------------------
  // SPEED INSIGHTS
  // -----------------------
  if (maxSpeed > 85) {
    messages.push("Very high peak speed detected — use caution on highways.");
  }

  if (avgSpeed < 15 && distance > 1) {
    messages.push("Low average speed — possible traffic or stop-and-go driving.");
  }

  // -----------------------
  // DISTANCE + TIME INSIGHT
  // -----------------------
  if (distance > 10) {
    messages.push("Long trip completed — good endurance driving session.");
  }

  if (duration < 2) {
    messages.push("Very short trip — limited data for full analysis.");
  }

  // -----------------------
  // FINAL OUTPUT
  // -----------------------
  return {
    summary: messages[0],
    tips: messages.slice(1),
    rawScore: score,
  };
}