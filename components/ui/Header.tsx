import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
	title: string;
	rightAction?: () => void;
	rightIcon?: string;
}

export function Header({ title, rightAction, rightIcon }: HeaderProps) {
	const { isDarkColorScheme } = useColorScheme();

	return (
		<View className="w-full px-4 pt-10 pb-4 bg-white dark:bg-gray-800">
			<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
			<View className="flex-row items-center justify-between">
				<Text className="text-2xl font-bold text-gray-800 dark:text-white">
					{title}
				</Text>

				{rightAction && rightIcon && (
					<TouchableOpacity
						onPress={rightAction}
						className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
					>
						<Ionicons
							name={rightIcon as any}
							size={24}
							color={isDarkColorScheme ? "#ffffff" : "#000000"}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
