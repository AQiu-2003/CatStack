import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { TodoList, type Todo } from '~/components/Todo';
import { Header, EmptyState } from '~/components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CompletedScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 从本地存储加载数据
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error('加载待办事项失败', error);
      }
    };

    loadTodos();
  }, []);

  // 切换任务状态
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // 更新本地存储
    AsyncStorage.setItem('todos', JSON.stringify(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )).catch(error => console.error('保存待办事项失败', error));
  };

  // 删除任务
  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    // 更新本地存储
    AsyncStorage.setItem('todos', JSON.stringify(newTodos))
      .catch(error => console.error('保存待办事项失败', error));
  };

  // 过滤已完成的任务
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <Header title="已完成任务" />
      
      <View className="flex-1 px-4">
        {completedTodos.length === 0 ? (
          <EmptyState 
            title="没有已完成任务" 
            description="完成任务后将显示在这里" 
            icon="checkmark-circle-outline"
          />
        ) : (
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            filter="completed"
          />
        )}
      </View>
    </SafeAreaView>
  );
}