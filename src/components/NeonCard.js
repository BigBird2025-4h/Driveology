import React from "react";
import { View, StyleSheet } from "react-native";

export default function NeonCard({ children, style }) {
  return (
    <View style={styles.outerGlow}>
      <View style={[styles.innerCard, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerGlow: {
    borderRadius: 22,
    padding: 2,

    shadowColor: "#FF7A00",
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },

    elevation: 18,
    backgroundColor: "transparent",
  },

  innerCard: {
    backgroundColor: "#151A22",
    padding: 18,
    borderRadius: 20,

    borderWidth: 1,
    borderColor: "#FF7A00",
  },
});