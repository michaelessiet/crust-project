import {configureStore} from '@reduxjs/toolkit'
import { addTask, taskReducer } from './slices/tasks'
import storage from '../utils/storage'
import {persistReducer, persistStore, PersistConfig} from 'redux-persist'

const mappedStorage = {
	getItem: storage.getItemAsync,
	setItem: storage.setItemAsync,
	removeItem: storage.deleteItemAsync
}

const persistConfig = {
	key: 'root',
	storage: mappedStorage
}

const persistedReducer = persistReducer(persistConfig, taskReducer)

export const store = configureStore({
	reducer: persistedReducer
})

export const persistedStore = persistStore(store)