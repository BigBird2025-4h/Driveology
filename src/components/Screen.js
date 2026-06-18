import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function Screen({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#090B10",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 180,
  },
});