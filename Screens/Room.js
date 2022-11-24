import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
} from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { GiftedChat } from "react-native-gifted-chat";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

const Room = ({ navigation }) => {
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
            key: "",
            room: "",
            name: "",
            regdate: "",
        },
    ]);
    const [data2, setData2] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            email = user.email.replace(".", "");

            setData2(email);
            console.log(data2);
        });
        var changeDataRef = firebase
            .database()
            .ref("user/" + data2 + "/" + "room")
            .orderByChild("regdate");

        changeDataRef.on("value", (snapshot) => {
            console.log(snapshot);

            const tmp = [];

            snapshot.forEach((child) => {
                tmp.unshift({
                    key: child.key,
                    room: child.val().Room,
                    name: child.val().name,
                    regdate: child.val().regdate,
                });
            });

            console.log(tmp);

            setData(tmp);
        });
    }, []);
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
    function delMemo(key) {
        firebase
            .database()
            .ref("user/" + data2 + "/" + "room/" + key)
            .set(null);
    }
    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    padding: 15,
                    borderBottomColor: "#aaa",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                }}
            >
                <Text style={{ flex: 1 }}>
                    {item.name +
                        "님의 대화방\n" +
                        "(대화방 만들어진 시간 : \n" +
                        item.regdate.replace("GMT+0900 (KST)", ")")}
                </Text>
                <Button title="삭제" onPress={() => delMemo(item.key)} />
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Button
                    title="대화방 목록 열기"
                    style={styles.button}
                    onPress={() => {
                        const unsubscribe = auth.onAuthStateChanged(function (
                            user
                        ) {
                            email = user.email.replace(".", "");

                            setData2(email);
                            console.log(data2);
                        });
                        var changeDataRef = firebase
                            .database()
                            .ref("user/" + data2 + "/" + "room")
                            .orderByChild("regdate");

                        changeDataRef.on("value", (snapshot) => {
                            console.log(snapshot);

                            const tmp = [];

                            snapshot.forEach((child) => {
                                tmp.unshift({
                                    key: child.key,
                                    room: child.val().Room,
                                    name: child.val().name,
                                    regdate: child.val().regdate,
                                });
                            });

                            console.log(tmp);

                            setData(tmp);
                        });
                    }}
                />
                <Button
                    title="대화 상대 매칭"
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("매칭", {
                            val2: "아직 리스트가 없습니다",
                        });
                    }}
                />
            </View>

            <View style={styles.container3}>
                <ScrollView>
                    {data.map((value) => (
                        <Button
                            title={
                                value.name +
                                "님의 대화방\n" +
                                "(대화방 만들어진 시간 : \n" +
                                value.regdate.replace("GMT+0900 (KST)", ")")
                            }
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate("대화방", {
                                    Roomname: value.key,
                                })
                            }
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.container3}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    style={{ padding: 15 }}
                />
            </View>
        </View>
    );
};
export default Room;
const styles = StyleSheet.create({
    container: {
        flex: 12,
        alignItems: "center",
        padding: 10,
    },
    container2: {
        flex: 2,
        alignItems: "center",
        padding: 10,
    },
    container3: {
        flex: 9,
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});
