import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

export function EmptyState({ title, description, icon = "list-outline" }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
        <Ionicons name={icon as any} size={40} color="#9CA3AF" />
      </View>
      <Text className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </Text>
      <Text className="text-base text-gray-500 dark:text-gray-400 text-center">
        {description}
      </Text>
    </View>
  );
}