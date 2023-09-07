import { View, Text, SafeAreaView, Dimensions } from "react-native"
import React, { useState } from "react"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import { StackActions, useNavigation } from "@react-navigation/native"
import storage from "../../utils/storage"
import { ErrorMessages } from "../../utils/types"
import { validateInput } from "../../utils/formValidator"
import ErrorChip from "../../components/ErrorChip"
import { STORAGE_KEYS } from "../../utils/constants"

const defaultErrorState = {
	username: null,
	password: null,
	general: null,
}

const LogInScreen = () => {
	const nav = useNavigation()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
		username: null,
		password: null,
		general: null,
	})

	async function login() {
		try {
			const storedUsername = await storage.getItemAsync(STORAGE_KEYS.username)
			const storedPassword = await storage.getItemAsync(STORAGE_KEYS.password)

			const isUsernameSame = storedUsername === username
			const isPasswordSame = storedPassword === password

			if (isUsernameSame && isPasswordSame)
				nav.dispatch(StackActions.replace("task manager"))
			else
				setErrorMessages((prev) => ({
					...prev,
					general: "Invalid Credentials",
				}))
		} catch (error) {
			console.log(error)
			setErrorMessages((prev) => ({
				...prev,
				general: "Sorry couldn't retrieve your credentials from the device.",
			}))
		}
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
						username: "Sorry but the username you provided is invalid",
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
						password: `Please provide a valid password`,
					}))
				}
			)

			if (usernamePass && passwordPass) await login()
		} catch (error) {
			setErrorMessages((prev) => ({
				...prev,
				general: "Something went wrong while validating your credentials",
			}))
		}
	}

	return (
		<SafeAreaView
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

			<InputField
				placeholder="Username"
				onChangeText={(text) => setUsername(text)}
				value={username}
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
				secureTextEntry
			/>
			{errorMessages.password ? (
				<Text style={{ textAlign: "center", color: "red" }}>
					{errorMessages.password}
				</Text>
			) : null}

			<Button onPress={validate} style={{ alignSelf: "center" }}>
				<Text>Log In</Text>
			</Button>

			<Text style={{ textAlign: "center" }}>
				Don't have an account?{" "}
				<Text
					style={{ color: "orange" }}
					onPress={() => nav.navigate("register")}
				>
					Register
				</Text>
			</Text>
		</SafeAreaView>
	)
}

export default LogInScreen
