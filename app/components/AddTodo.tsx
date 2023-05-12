import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { FIRESTORE_DB } from "../../firebaseConfig";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginRight: 8,
    backgroundColor: "#fff",
  },
});

const AddTodo = () => {
  const [value, setValue] = useState("");
  const addTodo = async () => {
    await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: value,
      done: false,
    });
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new todo"
        value={value}
        onChangeText={(value) => setValue(value)}
      />
      <Button onPress={addTodo} title="Add todo" disabled={value === ""} />
    </View>
  );
};

export default AddTodo;
