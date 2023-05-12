import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { View, StyleSheet } from "react-native";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { RootStackParamList } from "../../App";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});

const Home = ({ navigation }: HomeProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id } as Todo);
        });
        setTodos(todos);
      },
    });

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <AddTodo />
      <TodoList todos={todos} />
    </View>
  );
};

export default Home;
