import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DailyGoal from "./DailyGoal";

export default function MyAccount({ currentUser, userData, onLogout }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>
        <Card style={styles.accountCard}>
          <View style={styles.accountHeader}>
            <Text style={styles.accountTitle}>Welcome, {currentUser.first_name}</Text>
            <Text style={styles.accountSubtitle}>Your fitness dashboard</Text>
          </View>

          <Card.Content>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{currentUser.username}</Text>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>
              {currentUser.first_name} {currentUser.last_name}
            </Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{currentUser.email}</Text>

            <Button mode="contained-tonal" onPress={onLogout} style={styles.button}>
              Logout
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.photoCard}>
          <Card.Content style={styles.photoContent}>
            <Text style={styles.photoTitle}>Profile Photo</Text>

            <View style={styles.photoSquare}>
              <MaterialCommunityIcons
                name="image-broken-variant"
                size={64}
                color="#888888"
              />
            </View>

            <Button
              mode="contained-tonal"
              onPress={() => {}}
              style={styles.uploadButton}
            >
              Upload
            </Button>
          </Card.Content>
        </Card>
      </View>

      <DailyGoal userData={userData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "stretch",
  },
  accountCard: {
    flex: 1,
    borderRadius: 14,
  },
  photoCard: {
    flex: 1,
    borderRadius: 14,
  },
  photoContent: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 260,
  },
  photoTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 14,
  },
  photoSquare: {
    width: 150,
    height: 150,
    borderRadius: 16,
    backgroundColor: "#eeeeee",
    borderWidth: 2,
    borderColor: "#c7b7ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadButton: {
    width: "80%",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 4,
  },
  button: {
    marginTop: 18,
  },
});