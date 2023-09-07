import { View, Text, TextInput, TextInputProps } from "react-native"
import React from "react"

const InputField = (props: TextInputProps) => {
	return (
		<TextInput
			{...props}
			style={[
				props.style,
				{
					borderColor: "black",
					borderWidth: 1,
					borderRadius: 6,
					minHeight: 32,
					padding: 4
				},
			]}
		/>
	)
}

export default InputField
