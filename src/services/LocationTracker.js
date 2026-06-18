import * as Location from "expo-location";

let watcher = null;

export async function startLocationTracking(callback) {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") return;

  watcher = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 1,
    },
    (location) => {
      callback(location);
    }
  );
}

setSpeedData((prev) => {
  const newSpeedData = [...prev, mph];
  if (mph > 0 && (minimumSpeed === 0 || mph < minimumSpeed)) {
    setMinimumSpeed(mph);
  }
  return newSpeedData;
});

export function stopLocationTracking() {
  if (watcher) {
    watcher.remove();
  }
}