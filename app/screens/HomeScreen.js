import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";

function HomeScreen() {
	// UseState Variables
	const [courseGoals, setCourseGoals] = useState([]);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	// UseEffect Functions
	useEffect(() => {
		getData();
		// AsyncStorage.clear();
	}, []);

	// Functions
	const startAddGoalHandler = () => {
		setModalIsVisible(true);
	};

	const endAddGoalHandler = () => {
		setModalIsVisible(false);
	};

	const addGoalHandler = (enteredGoalText) => {
		const randomId = Math.random().toString();

		setCourseGoals((currentCourseGoals) => [
			...currentCourseGoals,
			{ text: enteredGoalText, id: randomId },
		]);
		storeData([...courseGoals, { text: enteredGoalText, id: randomId }]);
	};

	const deleteGoalHandler = (id) => {
		setCourseGoals((currentCourseGoals) => {
			return currentCourseGoals.filter((goal) => goal.id !== id);
		});
		const newData = courseGoals.filter((goal) => goal.id !== id);
		storeData(newData);
	};

	const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem("courseGoals", jsonValue);
		} catch (e) {
			console.log(e);
		}
	};

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("courseGoals");
			if (jsonValue !== null) {
				setCourseGoals(JSON.parse(jsonValue));
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<StatusBar style="light" />
			<View style={styles.appContainer}>
				<Button title="Add New Goal" color="#a065ec" onPress={startAddGoalHandler} />
				{modalIsVisible && (
					<GoalInput
						visible={modalIsVisible}
						addGoalHandler={addGoalHandler}
						endAddGoalHandler={endAddGoalHandler}
					/>
				)}
				<View style={styles.goalsContainer}>
					<FlatList
						data={courseGoals}
						renderItem={(itemData) => (
							<GoalItem
								text={itemData.item.text}
								deleteGoalHandler={deleteGoalHandler}
								id={itemData.item.id}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 16,
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
	},
	textInput: {
		borderColor: "#cccccc",
		width: "70%",
		marginRight: 5,
		padding: 5,
		borderWidth: 1,
	},
	goalsContainer: {
		flex: 4,
		paddingTop: 20,
	},
});

export default HomeScreen;
