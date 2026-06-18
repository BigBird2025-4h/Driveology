import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "./src/screens/DashboardScreen";
import DriveScreen from "./src/screens/DriveScreen";
import HistoryScreen from "./src/screens/HistoryScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          headerStyle: {
            backgroundColor: "#090B10",
          },

          headerTintColor: "#FFFFFF",

          tabBarStyle: {
            backgroundColor: "#151A22",

            borderTopColor: "#FF7A00",

            borderTopWidth: 1,

            height: 70,

            paddingBottom: 8,

            paddingTop: 8,
          },

          tabBarActiveTintColor: "#FF7A00",

          tabBarInactiveTintColor: "#7A7A7A",

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Drive") {
              iconName = "car-sport";
            } else if (route.name === "History") {
              iconName = "time";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={DashboardScreen}
        />

        <Tab.Screen
          name="Drive"
          component={DriveScreen}
        />

        <Tab.Screen
          name="History"
          component={HistoryScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}