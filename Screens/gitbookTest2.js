import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

console.log("check");

class gitbookTest2 extends Component {
    componentWillMount() {
        this.setState({
            inputText: "",
            todos: [],
        });
    }

    addTodo() {
        let todoItem = this.state.inputText;
        let todos = this.state.todos;
        todos.push(todoItem);
        this.setState({
            inputText: "",
            todos: todos,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                    onChangeText={(text) => {
                        this.setState({ inputText: text });
                    }}
                    value={this.state.inputText}
                />
                <TouchableOpacity onPress={this.addTodo.bind(this)}>
                    <Text>add Todo</Text>
                </TouchableOpacity>
                {this.state.todos.map((todoItem, index) => {
                    return <Text key={index}>{todoItem}</Text>;
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
});

AppRegistry.registerComponent("gitbookTest2", () => gitbookTest2);
