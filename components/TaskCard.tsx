import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Modal,
	TextInput,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
} from "react-native"
import React, { useState } from "react"
import { Task, modifyTask, removeTask } from "../store/slices/tasks"
import { useAppDispatch } from "../hooks/reduxHooks"
import { truncateText } from "../utils/utils"
import Checkbox from "expo-checkbox"

interface Props {
	task: Task
	index: number
}

const TaskCard = (props: Props) => {
	const dispatch = useAppDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [title, setTitle] = useState(props.task.title)
	const [description, setDescription] = useState(props.task.description)

	function handleRemove() {
		dispatch(removeTask(props.task.id))
	}

	function handleModify() {
		setIsModalVisible(false)
		dispatch(
			modifyTask({
				key: props.index,
				modifiedTask: {
					...props.task,
					title: title,
					description: description,
				},
			})
		)
	}

	function handleCompletionToggle(value: boolean) {
		dispatch(
			modifyTask({
				key: props.index,
				modifiedTask: { ...props.task, completed: value },
			})
		)
	}

	return (
		<>
			<Modal
				animationType="slide"
				visible={isModalVisible}
				presentationStyle="overFullScreen"
				transparent
			>
				<KeyboardAvoidingView behavior="padding">
					<TouchableOpacity
						onPress={() => setIsModalVisible(false)}
						activeOpacity={1}
						style={{
							backgroundColor: "rgba(0,0,0,0.5)",
							flexDirection: "column",
							height: "100%",
							justifyContent: "flex-end",
						}}
					>
						<TouchableWithoutFeedback>
							<View
								style={{
									alignSelf: "baseline",
									backgroundColor: "white",
									borderTopRightRadius: 32,
									borderTopLeftRadius: 32,
									padding: 32,
									width: "100%",
									gap: 9,
								}}
							>
								<View style={{ alignSelf: "flex-end" }}>
									<Button
										title="Close"
										onPress={() => {
											setIsModalVisible(false)
										}}
									/>
								</View>

								<TextInput
									value={title}
									onChangeText={setTitle}
									style={{ fontSize: 28, fontWeight: "bold" }}
								/>
								<TextInput
									value={description}
									onChangeText={setDescription}
									multiline
								/>

								<Button title="Save" onPress={handleModify} />
							</View>
						</TouchableWithoutFeedback>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</Modal>
			<TouchableOpacity
				key={props.task.id}
				onPress={() => setIsModalVisible(true)}
				style={{
					padding: 8,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					opacity: props.task.completed ? 0.5 : 1,
				}}
			>
				<View
					style={{
						maxWidth: "70%",
						gap: 6,
						flexDirection: "row",
						alignItems: "center",
						columnGap: 12,
					}}
				>
					<Checkbox
						value={props.task.completed}
						onValueChange={handleCompletionToggle}
					/>
					<View>
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>
							{truncateText(props.task.title, 30)}
						</Text>
						<Text style={{ opacity: 0.7 }}>{props.task.description}</Text>
					</View>
				</View>

				<Text onPress={handleRemove} style={{ color: "red" }}>
					Remove
				</Text>
			</TouchableOpacity>
		</>
	)
}

export default TaskCard
