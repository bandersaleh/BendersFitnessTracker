import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Calendar from "../components/Calendar";
import UpdateDay from "../components/UpdateDay";
import DailyGoal from "../components/DailyGoal";
import SummarizeProgress from "../components/SummarizeProgress";

const getTodayLocalDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function TrackerScreen({
  currentUser,
  userData,
  trackerData,
  saveTrackerData,
}) {
  const [selectedDate, setSelectedDate] = useState(getTodayLocalDate());
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

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
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Calendar
          trackerData={trackerData}
          selectedDate={selectedDate}
          setSelectedDate={handleSelectDate}
        />

        <DailyGoal userData={userData} />

        <SummarizeProgress trackerData={trackerData} userData={userData} />
      </ScrollView>

      <Modal
        visible={showUpdateModal}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <UpdateDay
              selectedDate={selectedDate}
              trackerData={trackerData}
              saveTrackerData={saveTrackerData}
              currentUser={currentUser}
              onSaveComplete={handleCloseModal}
              onClose={handleCloseModal}
            />
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    width: "100%",
    maxWidth: 650,
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#ffffff",
  },
});