import { View, Text, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/reduxHooks"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import { addTask } from "../../store/slices/tasks"
import { randomUUID } from "expo-crypto"
import { useDispatch } from "react-redux"
import TaskCard from "../../components/TaskCard"
import storage from "../../utils/storage"
import { STORAGE_KEYS } from "../../utils/constants"

const TaskManagerScreen = () => {
	const tasks = useAppSelector((state) => state.tasks)
	const [newTaskDesc, setNewTaskDesc] = useState("")
	const [newTaskTitle, setNewTaskTitle] = useState("")
	const [username, setUsername] = useState("")
	const dispatch = useDispatch()

	useEffect(() => {
		;(async () => {
			const username = await storage.getItemAsync(STORAGE_KEYS.username)
			setUsername(username ?? "")
		})()
	}, [])

	function handleAddTask() {
		const title = newTaskTitle.length === 0 ? "Unnamed Task" : newTaskTitle
		const desc = newTaskDesc.length === 0 ? "Undescriptive Task" : newTaskDesc

		dispatch(
			addTask({
				completed: false,
				description: desc,
				title: title,
				id: randomUUID(),
			})
		)
	}

	return (
		<View>
			<Text
				style={{ padding: 16, fontSize: 32, fontWeight: "500" }}
			>{`Welcome ${username},
here are your tasks`}</Text>
			<View
				style={{
					flexDirection: "row",
					marginTop: 16,
					gap: 8,
					justifyContent: "center",
					maxHeight: 100,
				}}
			>
				<View style={{ width: "80%", gap: 8 }}>
					<InputField
						placeholder="Add a task title"
						value={newTaskTitle}
						onChangeText={setNewTaskTitle}
					/>
					<InputField
						placeholder="Add a task description"
						value={newTaskDesc}
						onChangeText={setNewTaskDesc}
					/>
				</View>
				<Button
					onPress={handleAddTask}
					style={{
						height: "100%",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<Text>+</Text>
				</Button>
			</View>
			<FlatList
				style={{ margin: 16, height: "80%" }}
				data={tasks}
				renderItem={(task) => {
					return (
						<TaskCard index={task.index} key={task.item.id} task={task.item} />
					)
				}}
			/>
		</View>
	)
}

export default TaskManagerScreen
