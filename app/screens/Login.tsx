import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../../App";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 1,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [signInIsLoading, setSignInIsLoading] = useState(false);
  const [registerIsLoading, setRegisterIsLoading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async () => {
    setRegisterIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setRegisterIsLoading(false);
      })
      .catch((error) => {
        setRegisterIsLoading(false);
        setErrorMsg(error.message);
      });
  };

  const signIn = async () => {
    setSignInIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setSignInIsLoading(false);
      })
      .catch((error) => {
        setSignInIsLoading(false);
        setErrorMsg(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          {registerIsLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Create account</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={signIn}
        >
          {signInIsLoading ? (
            <ActivityIndicator size="small" color="#0782F9" />
          ) : (
            <Text style={styles.buttonOutlineText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
