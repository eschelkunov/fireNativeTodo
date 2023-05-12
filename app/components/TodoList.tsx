import React from "react";
import { View, FlatList } from "react-native";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TodoList;
