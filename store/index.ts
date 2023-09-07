import { configureStore } from "@reduxjs/toolkit"
import { taskReducer } from "./slices/tasks"
import { persistReducer, persistStore } from "redux-persist"
import FileSystemStorage from "redux-persist-filesystem-storage"

const persistConfig = {
	key: "root",
	storage: FileSystemStorage,
}

const persistedReducer = persistReducer(persistConfig, taskReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["persist/PERSIST"],
			},
		}),
})

export const persistedStore = persistStore(store)
