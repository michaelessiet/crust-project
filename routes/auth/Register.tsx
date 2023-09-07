import { View, Text, SafeAreaView, Dimensions, KeyboardAvoidingView } from "react-native"
import React, { useEffect, useState } from "react"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import { StackActions, useNavigation } from "@react-navigation/native"
import storage from "../../utils/storage"
import { ErrorMessages } from "../../utils/types"
import { validateInput } from "../../utils/formValidator"
import ErrorChip from "../../components/ErrorChip"
import FilesystemStorage from "redux-persist-filesystem-storage"
import { STORAGE_KEYS } from "../../utils/constants"
import WarningChip from "../../components/WarningChip"
import { useAppDispatch } from "../../hooks/reduxHooks"
import { clearAll } from "../../store/slices/tasks"

const defaultErrorState = {
	username: null,
	password: null,
	general: null,
}

const RegisterScreen = () => {
	const nav = useNavigation()
	const dispatch = useAppDispatch()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [hasAccount, setHasAccount] = useState(false)
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
		username: null,
		password: null,
		general: null,
	})

	useEffect(() => {
		;(async () => {
			const storedUsername = await storage.getItemAsync(STORAGE_KEYS.username)
			setHasAccount(typeof storedUsername === "string")
		})()
	}, [])

	async function registerUser() {
		await storage.setItemAsync("username", username)
		await storage.setItemAsync("password", password)
		await FilesystemStorage.clear((error) => {
			if (error) throw error
			dispatch(clearAll())
			nav.dispatch(StackActions.replace("task manager"))
		})
	}

	async function validate() {
		try {
			let usernamePass = false
			let passwordPass = false
			setErrorMessages(defaultErrorState)

			validateInput(
				username,
				/^[a-zA-Z0-9_]{4,}$/,
				() => (usernamePass = true),
				() => {
					setErrorMessages((prev) => ({
						...prev,
						username: "Please provide a username greater than 4 characters",
					}))
				}
			)

			validateInput(
				password,
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|;:,.<>?/]).{8,}$/,
				() => (passwordPass = true),
				() => {
					setErrorMessages((prev) => ({
						...prev,
						password: `	1. At least 8 characters in length.
	2. Contains at least one lowercase letter.
	3. Contains at least one uppercase letter.
	4. Contains at least one digit.
	5. Contains at least one special character.`,
					}))
				}
			)

			if (usernamePass && passwordPass) await registerUser()
		} catch (error) {
			setErrorMessages((prev) => ({
				...prev,
				general: "Something went wrong while creating your account.",
			}))
		}
	}

	return (
		<KeyboardAvoidingView
			style={{
				justifyContent: "center",
				height: Dimensions.get("screen").height,
				margin: 34,
				gap: 12,
			}}
		>
			<Text
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontSize: 24,
					color: "orange",
				}}
			>
				Task Manager
			</Text>
			{errorMessages.general ? (
				<ErrorChip message={errorMessages.general} />
			) : null}

			{hasAccount ? (
				<WarningChip message="You seem to already have an account on this device. Please note that if you register a new account on this device all your currently saved tasks will be erased." />
			) : null}

			<InputField
				placeholder="Username"
				value={username}
				onChangeText={(text) => setUsername(text)}
			/>
			{errorMessages.username ? (
				<Text style={{ textAlign: "center", color: "red" }}>
					{errorMessages.username}
				</Text>
			) : null}

			<InputField
				placeholder="password"
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			{errorMessages.password ? (
				<Text style={{ textAlign: "center", color: "red" }}>
					{errorMessages.password}
				</Text>
			) : null}

			<Button onPress={validate} style={{ alignSelf: "center" }}>
				<Text>Register</Text>
			</Button>

			<Text style={{ textAlign: "center" }}>
				Already have an account?{" "}
				<Text style={{ color: "orange" }} onPress={() => nav.dispatch(StackActions.replace('login'))}>
					Log In
				</Text>
			</Text>
		</KeyboardAvoidingView>
	)
}

export default RegisterScreen
