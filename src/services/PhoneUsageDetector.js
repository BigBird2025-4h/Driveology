import { Gyroscope } from "expo-sensors";

let gyroSub;

export function startPhoneDetection(callback) {
  Gyroscope.setUpdateInterval(500);

  gyroSub = Gyroscope.addListener((data) => {
    const movement =
      Math.abs(data.x) +
      Math.abs(data.y) +
      Math.abs(data.z);

    if (movement > 4) {
      callback();
    }
  });
}

export function stopPhoneDetection() {
  gyroSub?.remove();
}