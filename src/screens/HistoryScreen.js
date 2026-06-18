import React, { useEffect, useState } from "react";
import MapView, { Polyline } from "react-native-maps";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { getTrips } from "../utils/Storage";
import { generateCoachFeedback } from "../utils/Coach";

export default function HistoryScreen() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    const data = await getTrips();
    setTrips(data || []);
  };

  const renderTrip = ({ item }) => {
    const coach = generateCoachFeedback(item);

    const hasRoute = item.route && item.route.length > 1;

    return (
      <View style={styles.card}>
        <Text style={styles.date}>
          {new Date(item.startTime).toLocaleString()}
        </Text>

        <Text style={styles.stat}>Score: {item.score}</Text>
        <Text style={styles.stat}>
          Avg Speed: {item.avgSpeed} mph
        </Text>
        <Text style={styles.stat}>
          Max Speed: {item.maxSpeed} mph
        </Text>
        <Text style={styles.stat}>
          Distance: {(item.distance || 0).toFixed(2)} mi
        </Text>
        <Text style={styles.stat}>
          Duration: {item.duration.toFixed(1)} sec
        </Text>
        <Text style={styles.stat}>
          Hard Brakes: {item.hardBrakes}
        </Text>
        <Text style={styles.stat}>
          Phone Uses: {item.phoneUses}
        </Text>
        <Text style={styles.stat}>
          Speeding Events: {item.speedingEvents}
        </Text>

        {/* MAP */}
        {hasRoute && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: item.route[0].latitude,
              longitude: item.route[0].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Polyline
              coordinates={item.route}
              strokeWidth={4}
              strokeColor="#FF7A00"
            />
          </MapView>
        )}

        <View style={styles.coachBox}>
          <Text style={styles.coachTitle}>COACH</Text>

          <Text style={styles.summary}>{coach.summary}</Text>

          {coach.tips.map((tip, index) => (
            <Text key={index} style={styles.tip}>
              • {tip}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TRIP HISTORY</Text>

      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No trips recorded yet
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090B10",
    padding: 15,
    paddingTop: 60,
  },

  card: {
    backgroundColor: "#151A22",
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF7A00",

    shadowColor: "#FF7A00",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },

    elevation: 18,
  },

  date: {
    color: "#FFD54A",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  stat: {
    color: "#FFFFFF",
    marginTop: 5,
    fontSize: 15,
  },

  map: {
    height: 200,
    borderRadius: 12,
    marginTop: 12,
  },

  coachBox: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#2A2F3A",
  },

  coachTitle: {
    color: "#FF7A00",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },

  summary: {
    color: "#FFD54A",
    fontWeight: "600",
    marginBottom: 6,
  },

  tip: {
    color: "#FFFFFF",
    marginTop: 4,
  },

  empty: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
  },
});