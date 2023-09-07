import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as Crypto from "expo-crypto"
import { deleteItemById } from "../../utils/utils"

export interface Task {
	completed: boolean
	description: string
	title: string
	id: string
}

interface ModifyTaskPayload {
	key: number
	modifiedTask: Task
}

const initialValue: {tasks: Task[]} = {tasks: []}

const taskSlice = createSlice({
	name: "tasks",
	initialState: initialValue,
	reducers: {
		addTask: (state, payload: PayloadAction<Task>) => {
			const task = payload.payload
			const temp = [...state.tasks, task]
			state.tasks = temp
		},
		removeTask: (state, payload: PayloadAction<string>) => {
			const temp = deleteItemById(state.tasks, "id", payload.payload)
			state.tasks = temp
		},
		modifyTask: (state, payload: PayloadAction<ModifyTaskPayload>) => {
			state.tasks[payload.payload.key] = { ...payload.payload.modifiedTask }
		},
	},
})

export const { addTask, modifyTask, removeTask } = taskSlice.actions
export const taskReducer = taskSlice.reducer
