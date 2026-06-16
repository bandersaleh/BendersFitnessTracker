import React, { useMemo, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar({ trackerData, selectedDate, setSelectedDate }) {
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();

  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  const monthTitle = `${monthNames[currentMonth]} ${currentYear}`;

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const formatDate = (day) => {
    const monthNumber = String(currentMonth + 1).padStart(2, "0");
    const dayNumber = String(day).padStart(2, "0");

    return `${currentYear}-${monthNumber}-${dayNumber}`;
  };

  const getEntryForDay = (day) => {
    const date = formatDate(day);
    return trackerData.find((entry) => entry.tracker_date === date);
  };

  const goToPreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    const newSelectedDate = `${newYear}-${String(newMonth + 1).padStart(
      2,
      "0"
    )}-01`;

    setSelectedDate(newSelectedDate);
  };

  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    const newSelectedDate = `${newYear}-${String(newMonth + 1).padStart(
      2,
      "0"
    )}-01`;

    setSelectedDate(newSelectedDate);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <View style={styles.monthRow}>
            <IconButton
              icon="chevron-left"
              size={28}
              onPress={goToPreviousMonth}
              style={styles.arrowButton}
            />

            <Text style={styles.title}>{monthTitle} Calendar</Text>

            <IconButton
              icon="chevron-right"
              size={28}
              onPress={goToNextMonth}
              style={styles.arrowButton}
            />
          </View>

          <Text style={styles.subtitle}>Tap a day to update calories</Text>
        </View>

        <View style={styles.grid}>
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const date = formatDate(day);

            const entry = getEntryForDay(day);

            const netCalories = entry
              ? Number(entry.calories_ate) - Number(entry.calories_burned)
              : null;

            const isSelected = selectedDate === date;

            return (
              <Pressable
                key={date}
                onPress={() => setSelectedDate(date)}
                style={[styles.dayBox, isSelected && styles.selectedDayBox]}
              >
                <Text style={styles.dayNumber}>{day}</Text>

                {netCalories !== null ? (
                  <Text style={styles.netCalories}>{netCalories}</Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
  },
  headerContainer: {
    marginBottom: 12,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 0,
    marginLeft: 44,
    fontSize: 14,
  },
  arrowButton: {
    margin: 0,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayBox: {
    width: "13%",
    minHeight: 54,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  selectedDayBox: {
    backgroundColor: "#b8e6c9",
  },
  dayNumber: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  netCalories: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
  },
});