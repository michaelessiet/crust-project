import React from "react"
import { View, Text, StyleSheet } from "react-native"

const ErrorChip = ({ message }: { message: string }) => {
	return (
		<View style={styles.errorContainer}>
			<Text style={styles.errorText}>{message}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	errorContainer: {
		backgroundColor: "rgba(255, 0, 0, .2)",
		padding: 8,
		borderRadius: 8,
		marginBottom: 10,
		borderColor: "red",
		borderWidth: 2,
	},
	errorText: {
		color: "black",
		fontSize: 16,
	},
})

export default ErrorChip
