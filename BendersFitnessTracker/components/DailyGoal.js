import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { calculateDailyGoals } from "../services/BmiCalculator";

export default function DailyGoal({ userData }) {
  const goals = calculateDailyGoals(userData?.initial_weight_lbs || 0);

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Daily Nutrition Goals"
        subtitle="Auto-calculated from current weight"
      />

      <Card.Content>
        <View style={styles.row}>
          <Text>Maintenance Calories</Text>
          <Text style={styles.bold}>{goals.maintain_calories} cal/day</Text>
        </View>

        <View style={styles.row}>
          <Text>Weight Loss Calories</Text>
          <Text style={styles.bold}>{goals.initial_calories} cal/day</Text>
        </View>

        <View style={styles.row}>
          <Text>Protein</Text>
          <Text style={styles.bold}>{goals.initial_protein} g/day</Text>
        </View>

        <View style={styles.row}>
          <Text>Fat</Text>
          <Text style={styles.bold}>{goals.initial_fat} g/day</Text>
        </View>

        <View style={styles.row}>
          <Text>Fiber</Text>
          <Text style={styles.bold}>{goals.initial_fiber} g/day</Text>
        </View>

        <View style={styles.row}>
          <Text>Carbs</Text>
          <Text style={styles.bold}>{goals.initial_carbs} g/day</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    borderRadius: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  bold: {
    fontWeight: "bold",
  },
});