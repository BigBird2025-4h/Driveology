import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "driver_profile";

const defaultProfile = {
  xp: 0,
  level: 1,
  totalTrips: 0,
  bestScore: 0,
};

export async function getProfile() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : defaultProfile;
}

export async function updateProfile(trip) {
  const profile = await getProfile();

  // XP formula (simple but effective)
  const gainedXP =
    Math.max(10, Math.floor(trip.score / 10)) +
    Math.floor(trip.distance);

  profile.xp += gainedXP;
  profile.totalTrips += 1;
  profile.bestScore = Math.max(profile.bestScore, trip.score);

  // level system
  profile.level = Math.floor(profile.xp / 100) + 1;

  await AsyncStorage.setItem(KEY, JSON.stringify(profile));

  return profile;
}

export async function resetProfile() {
  await AsyncStorage.setItem(KEY, JSON.stringify(defaultProfile));
}