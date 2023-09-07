import { View, Text, SafeAreaView, Dimensions } from "react-native"
import React, { useState } from "react"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import { useNavigation } from "@react-navigation/native"
import storage from "../../utils/storage"
import { ErrorMessages } from "../../utils/types"
import { validateInput } from "../../utils/formValidator"
import ErrorChip from "../../components/ErrorChip"

const defaultErrorState = {
	username: null,
	password: null,
	general: null,
}

const RegisterScreen = () => {
	const nav = useNavigation()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
		username: null,
		password: null,
		general: null,
	})

	async function registerUser() {
		await storage.setItemAsync("username", username)
		await storage.setItemAsync("password", password)
		nav.navigate("task manager")
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
				secureTextEntry
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
				<Text style={{ color: "orange" }} onPress={() => nav.navigate("login")}>
					Log In
				</Text>
			</Text>
		</SafeAreaView>
	)
}

export default RegisterScreen
