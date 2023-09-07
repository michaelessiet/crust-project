import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as Crypto from "expo-crypto"
import { deleteItemById } from "../../utils/utils"

interface Task {
	completed: boolean
	description: string
	title: string
	id: string
}

interface ModifyTaskPayload {
	key: number
	modifiedTask: Task
}

const initialValue: Task[] = []

const taskSlice = createSlice({
	name: "tasks",
	initialState: initialValue,
	reducers: {
		addTask: (state, payload: PayloadAction<Task>) => {
			const task = { ...payload.payload, id: Crypto.randomUUID() }
			const temp = [...state, task]
			state = temp
		},
		removeTask: (state, payload: PayloadAction<string>) => {
			const temp = deleteItemById(state, "id", payload.payload)
			state = temp
		},
		modifyTask: (state, payload: PayloadAction<ModifyTaskPayload>) => {
			state[payload.payload.key] = { ...payload.payload.modifiedTask }
		},
	},
})

export const { addTask, modifyTask, removeTask } = taskSlice.actions
export const taskReducer = taskSlice.reducer
