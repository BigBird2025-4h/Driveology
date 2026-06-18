import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import * as Location from "expo-location";
import { Accelerometer, Gyroscope } from "expo-sensors";

import { createTrip } from "../utils/TripModel";
import { saveTrip } from "../utils/Storage";

import { getSpeedLimit } from "../utils/SpeedLimitService";

export default function DriveScreen() {
  const [speed, setSpeed] = useState(0);
  const [score, setScore] = useState(100);

  const [hardBrakes, setHardBrakes] = useState(0);
  const [phoneUses, setPhoneUses] = useState(0);
  const [speedingEvents, setSpeedingEvents] = useState(0);

  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const [speedData, setSpeedData] = useState([]);
  const [route, setRoute] = useState([]);

  const [currentSpeedLimit, setCurrentSpeedLimit] = useState(null);
  const [isDriving, setIsDriving] = useState(false);
  const driveStartTime = useRef(0);

  const locationSub = useRef(null);
  const accelSub = useRef(null);
  const gyroSub = useRef(null);

  const previousLocation = useRef(null);
  const lastAcceleration = useRef(0);

  const speedingActive = useRef(false);
  const speedLimitCache = useRef({});
  const lastSpeedLimitCheck = useRef(0);

  const speedLimitRef = useRef(null);

  useEffect(() => {
    return () => stopTracking();
  }, []);

  const getTileKey = (lat, lon) => {
    return `${lat.toFixed(3)}:${lon.toFixed(3)}`;
  };

  const startTracking = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission required");
      return;
    }

    setStartTime(Date.now());
    setIsDriving(true);

    driveStartTime.current = Date.now();

    setSpeed(0);
    setScore(100);
    setHardBrakes(0);
    setPhoneUses(0);
    setSpeedingEvents(0);
    setDistance(0);
    setSpeedData([]);
    setRoute([]);
    setCurrentSpeedLimit(null);

    setStartTime(Date.now());
    setIsDriving(true);

    previousLocation.current = null;
    lastAcceleration.current = 0;

    speedingActive.current = false;
    lastSpeedLimitCheck.current = 0;

    speedLimitRef.current = null;

    locationSub.current =
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 100,
          distanceInterval: 1,
        },
        async (location) => {
          const lat = location.coords.latitude;
          const lon = location.coords.longitude;

          const mph =
  location.coords.speed != null
    ? Math.max(0, location.coords.speed * 2.237)
    : 0;

          setSpeed(Math.round(mph));
          setSpeedData((prev) => [...prev, mph]);

          setRoute((prev) => [
            ...prev,
            { latitude: lat, longitude: lon },
          ]);

          if (previousLocation.current) {
            const segment = calculateDistance(
              previousLocation.current.latitude,
              previousLocation.current.longitude,
              lat,
              lon
            );

            setDistance((prev) => prev + segment);
          }

          previousLocation.current = {
            latitude: lat,
            longitude: lon,
          };

          const now = Date.now();

          if (
            now - lastSpeedLimitCheck.current >
            10000
          ) {
            lastSpeedLimitCheck.current = now;

            const tile = getTileKey(lat, lon);

            if (speedLimitCache.current[tile]) {
              setCurrentSpeedLimit(
                speedLimitCache.current[tile]
              );
              speedLimitRef.current =
                speedLimitCache.current[tile];
            } else {
              const limit =
                await getSpeedLimit(lat, lon);

              const fallback = 45;
              const finalLimit = limit || fallback;

              speedLimitCache.current[tile] =
                finalLimit;

              setCurrentSpeedLimit(finalLimit);
              speedLimitRef.current = finalLimit;
            }
          }

          const limit = speedLimitRef.current;

          if (limit && mph > limit + 5) {
            if (!speedingActive.current) {
              speedingActive.current = true;

              setSpeedingEvents((prev) => prev + 1);
              setScore((prev) =>
                Math.max(0, prev - 2)
              );
            }
          } else {
            speedingActive.current = false;
          }
        }
      );

    Accelerometer.setUpdateInterval(250);

    accelSub.current =
      Accelerometer.addListener((data) => {
        const magnitude = Math.sqrt(
          data.x * data.x +
            data.y * data.y +
            data.z * data.z
        );

        if (lastAcceleration.current === 0) {
          lastAcceleration.current = magnitude;
          return;
        }

        const delta = Math.abs(
          magnitude - lastAcceleration.current
        );

        const elapsed =
          Date.now() - driveStartTime.current;

        if (
          elapsed > 10000 &&
          speed > 10 &&
          delta > 0.8
        ) {
          setHardBrakes((prev) => prev + 1);
          setScore((prev) =>
            Math.max(0, prev - 5)
          );
        }

        lastAcceleration.current = magnitude;
      });

    Gyroscope.setUpdateInterval(500);

    gyroSub.current = Gyroscope.addListener(
      (data) => {
        const movement =
          Math.abs(data.x) +
          Math.abs(data.y) +
          Math.abs(data.z);

        if (movement > 4) {
          setPhoneUses((prev) => prev + 1);
          setScore((prev) =>
            Math.max(0, prev - 2)
          );
        }
      }
    );
  };

  const stopTracking = async () => {
    locationSub.current?.remove();
    accelSub.current?.remove();
    gyroSub.current?.remove();

    locationSub.current = null;
    accelSub.current = null;
    gyroSub.current = null;

    setIsDriving(false);
    setSpeed(0);

    if (!startTime) return;

    const endTime = Date.now();

    const trip = createTrip({
      startTime,
      endTime,
      speedData,
      route,
      score,
      hardBrakes,
      phoneUses,
      speedingEvents,
      distance,
      speedLimit: currentSpeedLimit,
    });

    await saveTrip(trip);
  };

  const durationMinutes = startTime
    ? (
        (Date.now() - startTime) /
        1000 /
        60
      ).toFixed(1)
    : "0.0";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Drive Mode
      </Text>

      <Text style={styles.speed}>
        {speed} MPH
      </Text>

      <Text style={styles.label}>
        Speed Limit:{" "}
        {currentSpeedLimit
          ? `${currentSpeedLimit} MPH`
          : "--"}
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.score}>
          Score: {score}
        </Text>

        <Text style={styles.events}>
          Hard Brakes: {hardBrakes}
        </Text>

        <Text style={styles.events}>
          Phone Usage: {phoneUses}
        </Text>

        <Text style={styles.events}>
          Speeding Events: {speedingEvents}
        </Text>

        <Text style={styles.events}>
          Distance: {distance.toFixed(2)} mi
        </Text>

        <Text style={styles.events}>
          Duration: {durationMinutes} min
        </Text>
      </View>

      {!isDriving ? (
        <TouchableOpacity
          style={styles.startButton}
          onPress={startTracking}
        >
          <Text style={styles.buttonText}>
            Start Drive
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.stopButton}
          onPress={stopTracking}
        >
          <Text style={styles.buttonText}>
            End Drive
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const R = 6371e3;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;

  const Δφ =
    ((lat2 - lat1) * Math.PI) / 180;
  const Δλ =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) *
      Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return (R * c) / 1609.34;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B10",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  speed: {
    color: "#FF7A00",
    fontSize: 90,
    fontWeight: "bold",
  },

  label: {
    color: "#FFD54A",
    fontSize: 18,
    marginTop: 10,
  },

  statsCard: {
    width: "100%",
    backgroundColor: "#151A22",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FF7A00",

    shadowColor: "#FF7A00",
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },

    elevation: 18,
  },

  score: {
    color: "#FFD54A",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  events: {
    color: "#ffffff",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },

  startButton: {
    marginTop: 35,
    backgroundColor: "#FF7A00",
    paddingVertical: 16,
    borderRadius: 16,
    width: 240,

    shadowColor: "#FF7A00",
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },

  stopButton: {
    marginTop: 35,
    backgroundColor: "#FFD54A",
    paddingVertical: 16,
    borderRadius: 16,
    width: 240,

    shadowColor: "#FFD54A",
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },

  buttonText: {
    color: "#000000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});