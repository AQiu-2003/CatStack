import { Tabs } from "~/components/ui/BottomTabs";
import { useColorScheme } from "~/lib/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

export default function TabsLayout() {
	const { isDarkColorScheme } = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: isDarkColorScheme ? "#ffffff" : "#000000",
				// tabBarInactiveTintColor: isDarkColorScheme ? "#888888" : "#888888",
				// headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "待办事项",
					tabBarIcon: () => ({ sfSymbol: "house" }),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "已完成",
					tabBarIcon: () => ({ sfSymbol: "person" }),
				}}
			/>
		</Tabs>
	);
}
