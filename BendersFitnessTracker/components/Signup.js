import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function Signup({ accounts, onSignup, onShowLogin }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!firstName || !lastName || !email || !username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    const usernameExists = accounts.some(
      (account) => account.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {
      setError("That username already exists.");
      return;
    }

    const newUser = {
      id: accounts.length + 1,
      user_id: Date.now(),
      email,
      username,
      password_hash: password,
      first_name: firstName,
      last_name: lastName,
      role: "user",
      is_verified: false,
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    };

    onSignup(newUser);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Create Account" subtitle="Start tracking your progress" />
        <Card.Content>
          <TextInput label="First Name" value={firstName} onChangeText={setFirstName} mode="outlined" style={styles.input} />
          <TextInput label="Last Name" value={lastName} onChangeText={setLastName} mode="outlined" style={styles.input} />
          <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} />
          <TextInput label="Username" value={username} onChangeText={setUsername} mode="outlined" style={styles.input} />
          <TextInput label="Password" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry style={styles.input} />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button mode="contained" onPress={handleSignup} style={styles.button}>
            Sign Up
          </Button>

          <Button mode="text" onPress={onShowLogin}>
            Back to Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 14,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
