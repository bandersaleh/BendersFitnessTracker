import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import UserSpecs from "../components/UserSpecs";
import UserTarget from "../components/UserTarget";
import DailyGoal from "../components/DailyGoal";

export default function TransformationScreen({
  currentUser,
  userData,
  saveUserData,
}) {
  if (!currentUser) {
    return (
      <View style={styles.center}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Please log in first.</Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserSpecs userData={userData} saveUserData={saveUserData} />
      <UserTarget userData={userData} saveUserData={saveUserData} />
      <DailyGoal userData={userData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  center: {
    padding: 16,
  },
  card: {
    borderRadius: 14,
  },
});
