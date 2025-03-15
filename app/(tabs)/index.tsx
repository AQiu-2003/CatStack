import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { TodoForm, TodoList, type Todo } from "~/components/Todo";
import { Header, EmptyState } from "~/components/ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "nanoid";

export default function TodoScreen() {
	const [todos, setTodos] = useState<Todo[]>([]);

	// 从本地存储加载数据
	useEffect(() => {
		const loadTodos = async () => {
			try {
				const storedTodos = await AsyncStorage.getItem("todos");
				if (storedTodos) {
					setTodos(JSON.parse(storedTodos));
				}
			} catch (error) {
				console.error("加载待办事项失败", error);
			}
		};

		loadTodos();
	}, []);

	// 保存数据到本地存储
	useEffect(() => {
		const saveTodos = async () => {
			try {
				await AsyncStorage.setItem("todos", JSON.stringify(todos));
			} catch (error) {
				console.error("保存待办事项失败", error);
			}
		};

		saveTodos();
	}, [todos]);

	// 添加新任务
	const handleAddTodo = (text: string) => {
		const newTodo: Todo = {
			id: nanoid(),
			text,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	// 切换任务状态
	const handleToggleTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	// 删除任务
	const handleDeleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	// 过滤未完成的任务
	const activeTodos = todos.filter(todo => !todo.completed);

	return (
		<SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
			<Header title="今日待办" />
			
			<View className="flex-1 px-4">
				<TodoForm onAddTodo={handleAddTodo} />
				
				{activeTodos.length === 0 ? (
					<EmptyState 
						title="没有待办任务" 
						description="点击上方按钮添加新任务" 
						icon="list-outline"
					/>
				) : (
					<TodoList
						todos={todos}
						onToggleTodo={handleToggleTodo}
						onDeleteTodo={handleDeleteTodo}
						filter="active"
					/>
				)}
			</View>
		</SafeAreaView>
	);
}