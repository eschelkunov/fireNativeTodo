import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  buttonText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});

const LogoutButton = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  const logout = async () => {
    signOut(auth)
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableOpacity onPress={logout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
