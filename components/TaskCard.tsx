import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Modal,
	TextInput,
	TouchableWithoutFeedback,
} from "react-native"
import React, { useState } from "react"
import { Task, modifyTask, removeTask } from "../store/slices/tasks"
import { useAppDispatch } from "../hooks/reduxHooks"
import { truncateText } from "../utils/utils"
import { SafeAreaView } from "react-native-safe-area-context"
import InputField from "./InputField"

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

	return (
		<>
			<Modal
				animationType="slide"
				visible={isModalVisible}
				presentationStyle="overFullScreen"
				transparent
			>
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
								borderRadius: 32,
								padding: 32,
								width: "100%",
								gap: 9,
							}}
						>
							<View style={{ alignSelf: "flex-end" }}>
								<Button
									title="Close"
									onPress={() => setIsModalVisible(false)}
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
			</Modal>
			<TouchableOpacity
				key={props.task.id}
				onPress={() => setIsModalVisible(true)}
				style={{
					padding: 8,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					opacity: props.task.completed ? .5 : 1
				}}
			>
				<View style={{ maxWidth: "70%", gap: 6 }}>
					<Text style={{ fontSize: 18, fontWeight: "bold" }}>
						{truncateText(props.task.title, 30)}
					</Text>
					<Text style={{ opacity: 0.7 }}>{props.task.description}</Text>
				</View>

				<Text onPress={handleRemove} style={{ color: "red" }}>
					Remove
				</Text>
				
			</TouchableOpacity>
		</>
	)
}

export default TaskCard
