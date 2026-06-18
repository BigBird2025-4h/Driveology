import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "drivology_trips";

export async function getTrips() {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveTrip(trip) {
  try {
    const existing = await getTrips();
    const updated = [trip, ...existing];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  } catch (e) {
    console.log("saveTrip error", e);
  }
}