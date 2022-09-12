import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "../components/GoalItem";
import GoalInput from "../components/GoalInput";

function HomeScreen() {
	const [courseGoals, setCourseGoals] = useState([]);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	const startAddGoalHandler = () => {
		setModalIsVisible(true);
	};

	const endAddGoalHandler = () => {
		setModalIsVisible(false);
	};

	const addGoalHandler = (enteredGoalText) => {
		setCourseGoals((currentCourseGoals) => [
			...currentCourseGoals,
			{ text: enteredGoalText, id: Math.random().toString() },
		]);
	};

	const deleteGoalHandler = (id) => {
		setCourseGoals((currentCourseGoals) => {
			return currentCourseGoals.filter((goal) => goal.id !== id);
		});
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
	},
});

export default HomeScreen;
