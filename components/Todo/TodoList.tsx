import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { TodoItem } from './TodoItem';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  filter?: 'all' | 'active' | 'completed';
}

export function TodoList({ todos, onToggleTodo, onDeleteTodo, filter = 'all' }: TodoListProps) {
  const filteredTodos = React.useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-gray-500 dark:text-gray-400 text-center text-lg">
          {filter === 'all' 
            ? '没有任务，添加一个吧！' 
            : filter === 'active' 
              ? '没有待办任务！' 
              : '没有已完成任务！'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredTodos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem
          id={item.id}
          text={item.text}
          completed={item.completed}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      )}
      className="flex-1 w-full"
    />
  );
}