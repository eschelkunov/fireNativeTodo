import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  todoText: {
    marginHorizontal: 8,
  },
});

const TodoItem = ({ id, title, done }: Todo) => {
  const ref = doc(FIRESTORE_DB, `todos/${id}`);

  const toggleDone = async () => {
    updateDoc(ref, { done: !done });
  };

  const deleteTodo = async () => {
    deleteDoc(ref);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDone} style={styles.todo}>
        {done && <Ionicons name="md-checkmark-circle" size={24} color="green"/>}
        {!done && <Entypo name="circle" size={24} color="black" />}
        <Text style={styles.todoText}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteTodo}>
        <Ionicons name="trash-bin-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
