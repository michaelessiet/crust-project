import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { store } from "../store"

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
