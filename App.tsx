import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LogInScreen from "./routes/auth/LogIn"
import RegisterScreen from "./routes/auth/Register"
import TaskManagerScreen from "./routes/task manager"
import { StatusBar } from "expo-status-bar"
import { Provider } from "react-redux"
import { persistedStore, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistedStore}></PersistGate>
			<StatusBar />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="login" component={LogInScreen} />
					<Stack.Screen name="register" component={RegisterScreen} />
					<Stack.Screen
						name="task manager"
						component={TaskManagerScreen}
						options={{ headerShown: true, headerTitle: "Task Manager" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
