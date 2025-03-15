import { Tabs } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
        tabBarInactiveTintColor: isDarkColorScheme ? "#888888" : "#888888",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "待办事项",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "已完成",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}