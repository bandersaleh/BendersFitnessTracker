import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import TrackerScreen from "./screens/TrackerScreen";
import TransformationScreen from "./screens/TransformationScreen";

import defaultAccounts from "./data/account.json";
import defaultUserData from "./data/data.json";
import defaultTrackerData from "./data/tracker.json";

const Tab = createBottomTabNavigator();

// App-wide state management.
// - accounts: all available user accounts
//     - currentUser: the currently logged-in user
//     - userData: body specs and goal data for users
//     - trackerData: calendar calorie records for users
//     - isReady: controls whether stored data has finished loading before rendering
// displayed data comes
// from state, and any state update automatically re-renders the affected screens.
export default function App() {
  const [accounts, setAccounts] = useState(defaultAccounts);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(defaultUserData);
  const [trackerData, setTrackerData] = useState(defaultTrackerData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadSavedData(); // This uses the React lifecycle efficiently because the app loads persistent data once at startup, then lets state updates handle future UI changes.
  }, []);


    // 1. Check AsyncStorage for saved accounts, current user, body specs, and tracker data.
    // 2. If saved data exists, replace the starter JSON state with saved data.
    // 3. If saved data does not exist, keep the default JSON starter data.
    // 4. Set isReady to true so the app can safely render.
  const loadSavedData = async () => {
    try {
      const savedAccounts = await AsyncStorage.getItem("accounts");
      const savedCurrentUser = await AsyncStorage.getItem("currentUser");
      const savedUserData = await AsyncStorage.getItem("userData");
      const savedTrackerData = await AsyncStorage.getItem("trackerData");

      if (savedAccounts) setAccounts(JSON.parse(savedAccounts));
      if (savedCurrentUser) setCurrentUser(JSON.parse(savedCurrentUser));
      if (savedUserData) setUserData(JSON.parse(savedUserData));
      if (savedTrackerData) setTrackerData(JSON.parse(savedTrackerData));
    } catch (error) {
      console.log("Error loading saved data:", error);
    } finally {
      setIsReady(true);
    }
  };

  // Functions used by useState, useEffect, AsyncStorage

  const saveAccounts = async (newAccounts) => {
    setAccounts(newAccounts);
    await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));
  };

  const saveCurrentUser = async (user) => {
    setCurrentUser(user);

    if (user) {
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("currentUser");
    }
  };

  const saveAllUserData = async (newData) => {
    setUserData(newData);
    await AsyncStorage.setItem("userData", JSON.stringify(newData));
  };

  const saveAllTrackerData = async (newData) => {
    setTrackerData(newData);
    await AsyncStorage.setItem("trackerData", JSON.stringify(newData));
  };

  const getCurrentUserData = () => {
    if (!currentUser) return null;

    const foundData = userData.find(
      (item) => item.user_id === currentUser.user_id
    );

    if (foundData) return foundData;

    return {
      id: userData.length + 1,
      user_id: currentUser.user_id,
      user_gender: "",
      user_age: "",
      user_height_cm: "",
      initial_weight_lbs: "",
      target_weight_lbs: "",
      recorded_date: "",
    };
  };

  const getCurrentTrackerData = () => {
    if (!currentUser) return [];

    return trackerData.filter(
      (item) => item.user_id === currentUser.user_id
    );
  };

  const saveCurrentUserData = async (updatedCurrentUserData) => {
    const exists = userData.some(
      (item) => item.user_id === updatedCurrentUserData.user_id
    );

    let updatedAllUserData;

    if (exists) {
      updatedAllUserData = userData.map((item) =>
        item.user_id === updatedCurrentUserData.user_id
          ? updatedCurrentUserData
          : item
      );
    } else {
      updatedAllUserData = [...userData, updatedCurrentUserData];
    }

    await saveAllUserData(updatedAllUserData);
  };

  const saveCurrentTrackerData = async (updatedCurrentTrackerData) => {
    if (!currentUser) return;

    const otherUsersTrackerData = trackerData.filter(
      (item) => item.user_id !== currentUser.user_id
    );

    const updatedAllTrackerData = [
      ...otherUsersTrackerData,
      ...updatedCurrentTrackerData,
    ].sort((a, b) => a.tracker_date.localeCompare(b.tracker_date));

    await saveAllTrackerData(updatedAllTrackerData);
  };

  if (!isReady) {
    return null;
  }

  const currentUserData = getCurrentUserData();
  const currentTrackerData = getCurrentTrackerData();

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />

        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: "#1f7a4d" },
            headerTintColor: "#fff",
            tabBarActiveTintColor: "#1f7a4d",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, size }) => {
              let iconName = "home";

              if (route.name === "Account") iconName = "person";
              if (route.name === "Tracker") iconName = "calendar";
              if (route.name === "Specs") iconName = "barbell";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Account">
            {(props) => (
              <HomeScreen
                {...props}
                accounts={accounts}
                saveAccounts={saveAccounts}
                currentUser={currentUser}
                saveCurrentUser={saveCurrentUser}
                userData={currentUserData}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Tracker">
            {(props) => (
              <TrackerScreen
                {...props}
                currentUser={currentUser}
                userData={currentUserData}
                trackerData={currentTrackerData}
                saveTrackerData={saveCurrentTrackerData}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Specs">
            {(props) => (
              <TransformationScreen
                {...props}
                currentUser={currentUser}
                userData={currentUserData}
                saveUserData={saveCurrentUserData}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}