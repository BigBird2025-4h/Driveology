import React from "react";
import { View, StyleSheet } from "react-native";

export default function NeonFrame({ children, style }) {
  return (
    <View style={styles.glowOuter}>
      <View style={[styles.inner, style]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  glowOuter: {
    borderRadius: 22,
    padding: 2,

    shadowColor: "#FF7A00",
    shadowOpacity: 0.7,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },

    elevation: 18,
  },

  inner: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF7A00",
    backgroundColor: "#151A22",
  },
});