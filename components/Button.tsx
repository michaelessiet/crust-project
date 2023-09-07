import {
	View,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native"
import React from "react"

const Button = (props: TouchableOpacityProps) => {
	return (
		<TouchableOpacity
			{...props}
			style={[
				{
					backgroundColor: "lightblue",
					alignSelf: "flex-start",
					paddingHorizontal: 16,
					paddingVertical: 10,
					borderRadius: 8,
				},
				props.style,
			]}
		/>
	)
}

export default Button
