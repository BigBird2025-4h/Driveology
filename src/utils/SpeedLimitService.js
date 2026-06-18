const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const speedLimitCache = new Map();

function getTileKey(lat, lon) {
  return `${lat.toFixed(3)}:${lon.toFixed(3)}`;
}

function parseSpeed(maxspeed) {
  if (!maxspeed) return null;

  const lower = maxspeed.toLowerCase();

  if (lower.includes("signals") || lower.includes("variable")) {
    return null;
  }

  const match = maxspeed.match(/\d+/);
  if (!match) return null;

  const speed = parseInt(match[0], 10);

  if (speed < 5 || speed > 90) return null;

  return speed;
}

function fallbackFromRoadType(tags = {}) {
  const type = tags.highway;

  const map = {
    motorway: 90,
    trunk: 70,
    primary: 60,
    secondary: 50,
    tertiary: 45,
    residential: 35,
    living_street: 25,
    service: 25,
    unclassified: 40,
  };

  return map[type] || 45;
}

async function fetchSpeedLimit(lat, lon) {
  const query = `
    [out:json];
    (
      way(around:30,${lat},${lon})["highway"];
    );
    out tags;
  `;

  try {
    const res = await fetch(OVERPASS_URL, {
      method: "POST",
      body: query,
    });

    const data = await res.json();

    if (!data.elements || data.elements.length === 0) {
      return null;
    }

    const priority = [
      "motorway",
      "trunk",
      "primary",
      "secondary",
      "tertiary",
      "residential",
      "service",
    ];

    let bestRoad = null;
    let bestScore = -1;

    for (const el of data.elements) {
      const tags = el.tags || {};
      const type = tags.highway;

      const score = priority.indexOf(type);
      if (score === -1) continue;

      if (score < bestScore || bestScore === -1) {
        bestScore = score;
        bestRoad = tags;
      }
    }

    if (!bestRoad) return null;

    const parsed = parseSpeed(bestRoad.maxspeed);
    if (parsed) return parsed;

    return fallbackFromRoadType(bestRoad);
  } catch (err) {
    console.log("Speed limit fetch error:", err);
    return null;
  }
}

export async function getSpeedLimit(lat, lon) {
  const tile = getTileKey(lat, lon);

  if (speedLimitCache.has(tile)) {
    return speedLimitCache.get(tile);
  }

  const limit = await fetchSpeedLimit(lat, lon);

  speedLimitCache.set(tile, limit);

  return limit;
}