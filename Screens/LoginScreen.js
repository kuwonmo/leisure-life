import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage);
        });
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                navigation.replace("처음화면");
            } else {
                // No user is signed in.
                navigation.navigate("로그인");
            }
        });
        return unsubscribe;
    }, []);
    return (
        <View style={styles.container}>
            <Input
                placeholder="이메일을 입력하세요"
                label="이메일"
                leftIcon={{ type: "material", name: "email" }}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input
                placeholder="비밀번호를 입력하세요"
                label="비밀번호"
                leftIcon={{ type: "material", name: "lock" }}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title="로그인" style={styles.button} onPress={signIn} />
            <Button
                title="회원가입"
                style={styles.button}
                onPress={() => navigation.navigate("회원가입")}
            />
        </View>
    );
};
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
