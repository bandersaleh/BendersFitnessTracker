import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import {
  calculateBmi,
  getBmiCategory,
  calculateGoalText,
} from "../services/BmiCalculator";

export default function UserTarget({ userData, saveUserData }) {
  const [targetWeight, setTargetWeight] = useState(
    userData?.target_weight_lbs !== undefined &&
      userData?.target_weight_lbs !== null &&
      userData?.target_weight_lbs !== ""
      ? String(userData.target_weight_lbs)
      : ""
  );

  const currentWeight = Number(userData?.initial_weight_lbs || 0);
  const targetWeightNumber = Number(targetWeight || 0);
  const heightCm = Number(userData?.user_height_cm || 0);

  const goalText =
    targetWeight === ""
      ? "Enter a target weight"
      : calculateGoalText(currentWeight, targetWeightNumber);

  const goalBmi = targetWeightNumber && heightCm
    ? calculateBmi(targetWeightNumber, heightCm)
    : 0;

  const goalBmiCategory = goalBmi ? getBmiCategory(goalBmi) : "Unknown";

  const handleSave = () => {
    saveUserData({
      ...userData,
      target_weight_lbs: targetWeight === "" ? "" : Number(targetWeight),
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Target Goal" subtitle="Set your transformation target" />

      <Card.Content>
        <TextInput
          label="Target Weight lbs"
          value={targetWeight}
          onChangeText={setTargetWeight}
          mode="outlined"
          keyboardType="numeric"
          placeholder="Target Weight lbs"
          style={styles.input}
        />

        <Text style={styles.result}>
          Current Weight: {currentWeight ? `${currentWeight} lbs` : ""}
        </Text>

        <Text style={styles.result}>Goal: {goalText}</Text>

        <Text style={styles.result}>
          Goal BMI: {goalBmi ? `${goalBmi} - ${goalBmiCategory}` : "Unknown"}
        </Text>

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save Target Goal
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 14,
    borderRadius: 14,
  },
  input: {
    marginBottom: 10,
  },
  result: {
    fontWeight: "bold",
    marginTop: 4,
  },
  button: {
    marginTop: 14,
  },
});