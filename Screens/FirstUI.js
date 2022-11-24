import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
} from "react";
import { View, StyleSheet, Text } from "react-native";
import * as firebase from "firebase";
import { auth } from "../firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { GiftedChat } from "react-native-gifted-chat";
import { Input, Button } from "react-native-elements";

const FirstUI = ({ navigation }) => {
    const [chatroom, setChatroom] = useState("");
    const signOut = () => {
        auth.signOut()
            .then(() => {
                // Sign-out successful.
                navigation.replace("로그인");
            })
            .catch((error) => {
                // An error happened.
            });
    };
    var firebaseConfig = {
        apiKey: "AIzaSyCrP_GRqeK-luKjbPTY1a2YcUzIM-jHOB4",
        authDomain: "gifted-chat-340b1.firebaseapp.com",
        projectId: "gifted-chat-340b1",
        storageBucket: "gifted-chat-340b1.appspot.com",
        messagingSenderId: "842185058629",
        appId: "1:842185058629:web:215e85f595e8ce802bb62c",
    };
    if (firebase.apps.length == 0) {
        firebase.initializeApp(firebaseConfig);
    }
    var email;
    const [data, setData] = useState([
        {
            image: "",
        },
    ]);
    const [data2, setData2] = useState("");
    const [data3, setData3] = useState("");
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            email = user.email.replace(".", "");

            setData2(email);
        });
        var changeDataRef = firebase
            .database()
            .ref("user/" + data2 + "/" + "image")
            .orderByChild("regdate");

        changeDataRef.on("value", (snapshot) => {
            setData3(snapshot);
            console.log(data3);

            const tmp = [];

            snapshot.forEach((child) => {
                tmp.unshift({
                    key: child.key,
                    image: child.val().image,
                });
            });

            setData(tmp);
        });
    }, []);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 15,
                    }}
                    onPress={() => navigation.navigate("설정")}
                >
                    <Ionicons name="settings" size={34} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Button
                    title="친구방"
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("친구방", {
                            val2: "아직 리스트가 없습니다",
                        });
                    }}
                />
            </View>

            <View style={styles.container}>
                <Button
                    title="대화방"
                    style={styles.button}
                    onPress={() => navigation.navigate("대화방 목록")}
                />
            </View>
            <View style={styles.container}>
                <Button
                    title="문제방"
                    style={styles.button}
                    onPress={() => navigation.navigate("문제방")}
                />
            </View>

            <View style={styles.container}>
                <Button
                    title="스케줄방"
                    style={styles.button}
                    onPress={() => navigation.navigate("스케줄방")}
                />
            </View>

            <View style={styles.container}>
                <Button
                    title="나가기"
                    style={styles.button}
                    onPress={signOut}
                />
            </View>
        </View>
    );
};
export default FirstUI;
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
