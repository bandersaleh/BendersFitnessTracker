import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Login from "../components/Login";
import Signup from "../components/Signup";
import MyAccount from "../components/MyAccount";

export default function HomeScreen({
  accounts,
  saveAccounts,
  currentUser,
  saveCurrentUser,
  userData,
}) {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignup = async (newUser) => {
    const updatedAccounts = [...accounts, newUser];
    await saveAccounts(updatedAccounts);
    await saveCurrentUser(newUser);
    setShowSignup(false);
  };

  const handleLogout = async () => {
    await saveCurrentUser(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!currentUser && !showSignup ? (
        <Login
          accounts={accounts}
          onLogin={saveCurrentUser}
          onShowSignup={() => setShowSignup(true)}
        />
      ) : null}

      {!currentUser && showSignup ? (
        <Signup
          accounts={accounts}
          onSignup={handleSignup}
          onShowLogin={() => setShowSignup(false)}
        />
      ) : null}

      {currentUser ? (
        <MyAccount
          currentUser={currentUser}
          userData={userData}
          onLogout={handleLogout}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
});