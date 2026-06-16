import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { calculateDailyGoals } from "../services/BmiCalculator";

export default function SummarizeProgress({ trackerData, userData }) {
  const goals = calculateDailyGoals(userData.initial_weight_lbs);
  const maintenanceCalories = goals.maintain_calories;

  const totalAte = trackerData.reduce((sum, entry) => sum + Number(entry.calories_ate), 0);
  const totalBurned = trackerData.reduce((sum, entry) => sum + Number(entry.calories_burned), 0);
  const totalNet = totalAte - totalBurned;
  const daysTracked = trackerData.length;
  const averageNet = daysTracked ? Math.round(totalNet / daysTracked) : 0;

  const dailyDeficit = maintenanceCalories - averageNet;
  const estimatedWeeklyWeightChange = (dailyDeficit * 7) / 3500;

  const formattedWeightChange =
  estimatedWeeklyWeightChange > 0
    ? `-${estimatedWeeklyWeightChange.toFixed(2)} lbs`
    : `+${Math.abs(estimatedWeeklyWeightChange).toFixed(2)} lbs`;

  const onTrack = averageNet <= goals.initial_calories;

  return (
    <Card style={styles.card}>
      <Card.Title title="Progress Summary" subtitle="Based on saved tracker data" />
      <Card.Content>
        <View style={styles.row}>
          <Text>Days Tracked</Text>
          <Text style={styles.bold}>{daysTracked}</Text>
        </View>

        <View style={styles.row}>
          <Text>Total Calories Ate</Text>
          <Text style={styles.bold}>{totalAte}</Text>
        </View>

        <View style={styles.row}>
          <Text>Total Calories Burned</Text>
          <Text style={styles.bold}>{totalBurned}</Text>
        </View>

        <View style={styles.row}>
          <Text>Average Net Calories</Text>
          <Text style={styles.bold}>{averageNet}</Text>
        </View>

        <View style={styles.row}>
          <Text>Estimated Weekly Change</Text>
          <Text style={styles.bold}>{formattedWeightChange}</Text>
        </View>

        <Text style={[styles.status, onTrack ? styles.good : styles.warning]}>
          {onTrack ? "You are on track with your calorie goal." : "You are above your calorie goal."}
        </Text>
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
  status: {
    marginTop: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  good: {
    color: "#1f7a4d",
  },
  warning: {
    color: "#c77700",
  },
});
