import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import NeonCard from "../components/NeonCard";

import Screen from "../components/Screen";
import { neon } from "../theme/neon";

import { getProfile } from "../utils/DriverProfile";

export default function DashboardScreen({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getProfile();
    setProfile(data);
  };

  return (
    <Screen>
      <NeonCard>
        <Text style={styles.title}>DRIVEOLOGY</Text>

        <Text style={styles.subtitle}>Your Personal Driving Coach</Text>

        <Text style={styles.tagline}>Your Stats:</Text>

        {profile && (
          <>
            <Text style={styles.stat}>Level: {profile.level}</Text>
            <Text style={styles.stat}>XP: {profile.xp}</Text>
            <Text style={styles.stat}>
              Best Score: {profile.bestScore}
            </Text>
            <Text style={styles.stat}>
              Trips: {profile.totalTrips}
            </Text>
          </>
        )}
      </NeonCard>

      <NeonCard style={{ marginTop: 20 }}>
        <TouchableOpacity
  style={styles.primaryButton}
  onPress={() => navigation.navigate("Drive")}
>
  <Text style={styles.primaryButtonText}>START DRIVE</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.secondaryButton}
  onPress={() => navigation.navigate("History")}
>
  <Text style={styles.secondaryButtonText}>TRIP HISTORY</Text>
</TouchableOpacity>
      </NeonCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FF7A00",
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "#FF7A00",
    textShadowRadius: 6,
  },

  subtitle: {
    color: neon.yellow,
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },

  tagline: {
    color: neon.muted,
    marginTop: 8,
    textAlign: "center",  
  },

  stat: {
    color: "#f5f5f5",
    textAlign: "center",
    marginTop: 6,
  },

  primaryButton: {
    backgroundColor: neon.orange,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: neon.orange,
    shadowOpacity: 0.5,
    shadowRadius: 14,

    textAlign: "center",
  },

  secondaryButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: neon.orange,

  },

    primaryButtonText: {
  textAlign: "center",
  fontSize: 18,
  fontWeight: "bold",
  color: "#000000", 
},

secondaryButtonText: {
  textAlign: "center",
  fontSize: 18,
  fontWeight: "bold",
  color: neon.orange, 
  letterSpacing: 1,
},
});