import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <View className="flex-row items-center mb-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
      <TextInput
        className="flex-1 px-4 py-2 text-gray-800 dark:text-white"
        placeholder="添加新任务..."
        placeholderTextColor="#9CA3AF"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTodo}
      />
      <TouchableOpacity
        onPress={handleAddTodo}
        className="bg-blue-500 h-10 w-10 rounded-full items-center justify-center ml-2"
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}