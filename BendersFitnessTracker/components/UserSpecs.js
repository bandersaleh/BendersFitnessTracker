import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Text,
  TextInput,
  SegmentedButtons,
  RadioButton,
} from "react-native-paper";
import { calculateBmi, getBmiCategory } from "../services/BmiCalculator";

function cmToFeetInches(cm) {
  if (!cm) return "";

  const totalInches = Math.round(Number(cm) / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;

  return `${feet}'${inches}"`;
}

function feetInchesToCm(value) {
  if (!value) return "";

  const cleaned = value.toLowerCase().replace(/\s/g, "");

  let feet = 0;
  let inches = 0;

  if (cleaned.includes("'")) {
    const parts = cleaned.split("'");
    feet = Number(parts[0]) || 0;
    inches = Number(parts[1]?.replace('"', "")) || 0;
  } else {
    feet = Number(cleaned) || 0;
  }

  return Math.round((feet * 12 + inches) * 2.54);
}

function cmToMeters(cm) {
  if (!cm) return "";
  return (Number(cm) / 100).toFixed(2);
}

function metersToCm(value) {
  if (!value) return "";
  return Math.round(Number(value) * 100);
}

function lbsToKg(lbs) {
  if (!lbs) return "";
  return (Number(lbs) * 0.45359237).toFixed(1);
}

function kgToLbs(kg) {
  if (!kg) return "";
  return Math.round(Number(kg) * 2.20462262 * 10) / 10;
}

function getTodayLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function UserSpecs({ userData, saveUserData }) {
  const [gender, setGender] = useState(userData?.user_gender || "");

  const [age, setAge] = useState(
    userData?.user_age !== undefined &&
      userData?.user_age !== null &&
      userData?.user_age !== ""
      ? String(userData.user_age)
      : ""
  );

  const [heightUnit, setHeightUnit] = useState("feet");
  const [weightUnit, setWeightUnit] = useState("lbs");

  const [height, setHeight] = useState(
    userData?.user_height_cm ? cmToFeetInches(userData.user_height_cm) : ""
  );

  const [weight, setWeight] = useState(
    userData?.initial_weight_lbs !== undefined &&
      userData?.initial_weight_lbs !== null &&
      userData?.initial_weight_lbs !== ""
      ? String(userData.initial_weight_lbs)
      : ""
  );

  const [recordedDate, setRecordedDate] = useState(
    userData?.recorded_date || ""
  );

  const heightCm =
    heightUnit === "feet" ? feetInchesToCm(height) : metersToCm(height);

  const weightLbs = weightUnit === "lbs" ? Number(weight) : kgToLbs(weight);

  const bmi = calculateBmi(weightLbs, heightCm);
  const category = getBmiCategory(bmi);

  const handleHeightUnitChange = (newUnit) => {
    if (newUnit === heightUnit) return;

    if (newUnit === "meters") {
      const currentCm = feetInchesToCm(height);
      setHeight(cmToMeters(currentCm));
    } else {
      const currentCm = metersToCm(height);
      setHeight(cmToFeetInches(currentCm));
    }

    setHeightUnit(newUnit);
  };

  const handleWeightUnitChange = (newUnit) => {
    if (newUnit === weightUnit) return;

    if (newUnit === "kgs") {
      setWeight(lbsToKg(weight));
    } else {
      setWeight(String(kgToLbs(weight)));
    }

    setWeightUnit(newUnit);
  };

  const handleTodayPress = () => {
    setRecordedDate(getTodayLocalDate());
  };

  const handleSave = () => {
    const savedHeightCm =
      heightUnit === "feet" ? feetInchesToCm(height) : metersToCm(height);

    const savedWeightLbs =
      weightUnit === "lbs" ? Number(weight) : kgToLbs(weight);

    saveUserData({
      ...userData,
      user_gender: gender,
      user_age: age === "" ? "" : Number(age),
      user_height_cm: height === "" ? "" : savedHeightCm,
      initial_weight_lbs: weight === "" ? "" : savedWeightLbs,
      recorded_date: recordedDate,
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Current Body Specs"
        subtitle="Update your current stats"
      />

      <Card.Content>
        <Text style={styles.sectionLabel}>Gender</Text>

        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.genderRow}>
            <RadioButton.Item
              label="Male"
              value="male"
              position="leading"
              style={styles.genderOption}
            />

            <RadioButton.Item
              label="Female"
              value="female"
              position="leading"
              style={styles.genderOption}
            />
          </View>
        </RadioButton.Group>

        <TextInput
          label="Age"
          value={age}
          onChangeText={setAge}
          mode="outlined"
          keyboardType="numeric"
          placeholder="Age"
          style={styles.input}
        />

        <View style={styles.dateRowInline}>
          <View style={styles.dateInputFlex}>
            <TextInput
              label="Date"
              value={recordedDate}
              onChangeText={setRecordedDate}
              mode="outlined"
              placeholder="YYYY-MM-DD"
              style={styles.inputNoBottom}
            />
          </View>

          <Button
            mode="contained-tonal"
            onPress={handleTodayPress}
            style={styles.todayButton}
          >
            Today
          </Button>
        </View>

        <View style={styles.unitRowInline}>
          <View style={styles.inputFlex}>
            <TextInput
              label="Height"
              value={height}
              onChangeText={setHeight}
              mode="outlined"
              placeholder={heightUnit === "feet" ? `5'9"` : "1.75"}
              style={styles.inputNoBottom}
            />
          </View>

          <View style={styles.buttonFlex}>
            <SegmentedButtons
              value={heightUnit}
              onValueChange={handleHeightUnitChange}
              buttons={[
                { value: "feet", label: "Feet" },
                { value: "meters", label: "Meters" },
              ]}
            />
          </View>
        </View>

        <View style={styles.unitRowInline}>
          <View style={styles.inputFlex}>
            <TextInput
              label="Current Weight"
              value={weight}
              onChangeText={setWeight}
              mode="outlined"
              keyboardType="numeric"
              placeholder={weightUnit === "lbs" ? "178" : "80.7"}
              style={styles.inputNoBottom}
            />
          </View>

          <View style={styles.buttonFlex}>
            <SegmentedButtons
              value={weightUnit}
              onValueChange={handleWeightUnitChange}
              buttons={[
                { value: "lbs", label: "lbs" },
                { value: "kgs", label: "kgs" },
              ]}
            />
          </View>
        </View>

        <Text style={styles.result}>BMI: {bmi}</Text>
        <Text style={styles.result}>BMI Category: {category}</Text>

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save Body Specs
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
  },
  sectionLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  genderOption: {
    flex: 1,
    paddingLeft: 0,
  },
  input: {
    marginBottom: 10,
  },
  inputNoBottom: {
    marginBottom: 0,
  },
  dateRowInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  dateInputFlex: {
    flex: 1,
  },
  todayButton: {
    width: 120,
    justifyContent: "center",
  },
  unitRowInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  inputFlex: {
    flex: 1,
  },
  buttonFlex: {
    width: 220,
  },
  result: {
    fontWeight: "bold",
    marginTop: 4,
  },
  button: {
    marginTop: 14,
  },
});