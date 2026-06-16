import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function Login({ accounts, onLogin, onShowSignup }) {
  const [username, setUsername] = useState("bender");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = accounts.find(
      (account) =>
        account.username.toLowerCase() === username.toLowerCase() &&
        account.password_hash === password
    );

    if (user) {
      setError("");
      onLogin(user);
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Bender's Fitness Tracker" subtitle="Login to continue" />
        <Card.Content>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>

          <Button mode="text" onPress={onShowSignup}>
            Create New Account
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
    marginBottom: 12,
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
