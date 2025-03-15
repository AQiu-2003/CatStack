import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <View className="flex-row items-center justify-between p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <TouchableOpacity
        onPress={() => onToggle(id)}
        className="flex-row items-center flex-1"
      >
        <View className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${completed ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
          {completed && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text className={`text-base ${completed ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>
          {text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(id)} className="p-2">
        <Ionicons name="trash-outline" size={22} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );
}