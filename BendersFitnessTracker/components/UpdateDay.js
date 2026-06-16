import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";

export default function UpdateDay({
  selectedDate,
  trackerData,
  saveTrackerData,
  currentUser,
  onSaveComplete,
  onClose,
}) {
  const existingEntry = trackerData.find(
    (entry) => entry.tracker_date === selectedDate
  );

  const [caloriesAte, setCaloriesAte] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");

  useEffect(() => {
    if (existingEntry) {
      setCaloriesAte(String(existingEntry.calories_ate));
      setCaloriesBurned(String(existingEntry.calories_burned));
    } else {
      setCaloriesAte("");
      setCaloriesBurned("");
    }
  }, [selectedDate, existingEntry]);

  const handleSave = () => {
    const filteredData = trackerData.filter(
      (entry) => entry.tracker_date !== selectedDate
    );

    const newEntry = {
      id: existingEntry ? existingEntry.id : Date.now(),
      user_id: currentUser.user_id,
      tracker_date: selectedDate,
      calories_ate: Number(caloriesAte || 0),
      calories_burned: Number(caloriesBurned || 0),
    };

    const updatedData = [...filteredData, newEntry].sort((a, b) =>
      a.tracker_date.localeCompare(b.tracker_date)
    );

    saveTrackerData(updatedData);

    if (onSaveComplete) {
      onSaveComplete();
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Update Day" subtitle={selectedDate} />

      <Card.Content>
        <TextInput
          label="Calories Ate"
          value={caloriesAte}
          onChangeText={setCaloriesAte}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Calories Burned"
          value={caloriesBurned}
          onChangeText={setCaloriesBurned}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save Day
        </Button>

        <Button mode="outlined" onPress={onClose} style={styles.closeButton}>
          Close
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  closeButton: {
    marginTop: 10,
  },
});