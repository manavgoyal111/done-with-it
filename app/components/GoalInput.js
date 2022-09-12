import { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native";

function GoalInput(props) {
	// UseState Variables
	const [enteredGoalText, setEnteredGoalText] = useState("");

	// Functions
	const goalInputHandler = (inputText) => {
		setEnteredGoalText(inputText);
	};

	const onAddGoal = () => {
		props.addGoalHandler(enteredGoalText);
		setEnteredGoalText("");
		props.endAddGoalHandler();
	};

	return (
		<Modal visible={props.visible} animationType="slide">
			<View style={styles.inputContainer}>
				<Image source={require("../assets/logo.png")} style={styles.image} />
				<TextInput
					style={styles.textInput}
					placeholder="Write Your Goal!"
					onChangeText={goalInputHandler}
					value={enteredGoalText}
				/>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button title="Cancel" color="#f31282" onPress={props.endAddGoalHandler} />
					</View>
					<View style={styles.button}>
						<Button title="Add Goal" color="#5e0acc" onPress={onAddGoal} />
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	inputContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#311b6b",
		borderBottomColor: "#cccccc",
	},
	textInput: {
		width: "80%",
		padding: 10,
		backgroundColor: "#e4d0ff",
		color: "#120438",
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#e4d0ff",
	},
	buttonContainer: {
		flexDirection: "row",
		marginTop: 20,
	},
	button: {
		width: 100,
		marginHorizontal: 5,
	},
});

export default GoalInput;
