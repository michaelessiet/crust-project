import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LogInScreen from "./routes/auth/LogIn"
import RegisterScreen from "./routes/auth/Register"
import TaskManagerScreen from "./routes/task manager"
import { StatusBar } from "expo-status-bar"

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<>
			<StatusBar />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="login" component={LogInScreen} />
					<Stack.Screen name="register" component={RegisterScreen} />
					<Stack.Screen name="task manager" component={TaskManagerScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	)
}
