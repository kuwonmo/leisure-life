import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
} from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as firebase from "firebase";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { GiftedChat } from "react-native-gifted-chat";
import { Input, Button } from "react-native-elements";

const Like = ({ navigation }) => {
    const [checkboxState, setCheckboxState] = useState({
        지역: "없음",
        난이도: "없음",
        평점: "없음",
    });
    const [checkboxState2, setCheckboxState2] = useState({
        지역: "없음",
        난이도: "없음",
        평점: "없음",
    });
    const [checkboxState3, setCheckboxState3] = useState({
        지역: "없음",
        난이도: "없음",
        평점: "없음",
    });
    var [chatroom, setChatroom] = useState("");
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
    const [list, setList] = useState([""]);
    const search = () => {};
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
    var displayname;
    const [data, setData] = useState("");
    const [data2, setData2] = useState([
        {
            key: "",
            name: "",
            latitude: "",
            longitude: "",
            regdate: "",
        },
    ]);
    var [data4, setData4] = useState([
        {
            key: "",
            name: "",
            latitude: "",
            longitude: "",
            regdate: "",
        },
    ]);
    const [data3, setData3] = useState([
        {
            지역: "인천",
            난이도: "1",
            평점: "1",
        },
        {
            지역: "부평",
            난이도: "2",
            평점: "2",
        },
        {
            지역: "부천",
            난이도: "3",
            평점: "3",
        },
        {
            지역: "홍대",
            난이도: "4",
            평점: "4",
        },
        {
            지역: "강남",
            난이도: "5",
            평점: "5",
        },
    ]);
    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    padding: 15,

                    flexDirection: "row",
                }}
            >
                <Text style={styles.toDoText}>지역 : {item.지역}</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="skyblue"
                    unfillColor="#FFFFFF"
                    text="선택완료"
                    iconStyle={{ borderColor: "blue" }}
                    style={styles.checkbox}
                    onPress={() => setCheckboxState({ 지역: item.지역 })}
                />

                <TouchableOpacity
                    onPress={() => setCheckboxState({ 지역: "없음" })}
                >
                    <Text> 선택해제</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const renderItem2 = ({ item }) => {
        return (
            <View
                style={{
                    padding: 15,

                    flexDirection: "row",
                }}
            >
                <Text style={styles.toDoText}>난이도 : {item.난이도}</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="skyblue"
                    unfillColor="#FFFFFF"
                    text="선택완료"
                    iconStyle={{ borderColor: "blue" }}
                    style={styles.checkbox}
                    onPress={() => setCheckboxState2({ 난이도: item.난이도 })}
                />
                <TouchableOpacity
                    onPress={() => setCheckboxState2({ 난이도: "없음" })}
                >
                    <Text> 선택해제</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const renderItem3 = ({ item }) => {
        return (
            <View
                style={{
                    padding: 15,

                    flexDirection: "row",
                }}
            >
                <Text style={styles.toDoText}>평점 : {item.평점}</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="skyblue"
                    unfillColor="#FFFFFF"
                    text="선택완료"
                    iconStyle={{ borderColor: "blue" }}
                    style={styles.checkbox}
                    onPress={() => setCheckboxState3({ 평점: item.평점 })}
                />
                <TouchableOpacity
                    onPress={() => setCheckboxState3({ 평점: "없음" })}
                >
                    <Text> 선택해제</Text>
                </TouchableOpacity>
            </View>
        );
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            email = user.email.replace(".", "");
            displayname = user.displayName;

            setData(email);
            setList(displayname);
        });

        var changeDataRef = firebase
            .database()
            .ref("user/")
            .orderByChild("regdate");

        changeDataRef.on("value", (snapshot) => {
            const tmp = [];

            snapshot.forEach((child) => {
                tmp.unshift({
                    key: child.key,
                    name: child.val().name,
                    latitude: child.val().latitude,
                    longitude: child.val().longtitude,
                    regdate: child.val().regdate,
                });
            });

            setData2(tmp);
        });
        return unsubscribe;
    }, []);

    console.log(checkboxState);
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Button
                    title="관심분야 먼저 정하기"
                    style={styles.button}
                    onPress={() => navigation.navigate("관심분야 선택")}
                />
            </View>
            <View style={styles.container}>
                {
                    <FlatList
                        data={data3}
                        renderItem={renderItem}
                        style={{ padding: 15 }}
                    />
                }
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data3}
                    renderItem={renderItem2}
                    style={{ padding: 15 }}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data3}
                    renderItem={renderItem3}
                    style={{ padding: 15 }}
                />
            </View>
            <View style={styles.container2}>
                <Button
                    title="대화방 만들기"
                    style={styles.button}
                    onPress={() => {
                        data4 = [];
                        data2.map((value) => {
                            console.log(value.key);
                            var changeDataRef = firebase
                                .database()
                                .ref("user/" + value.key + "/" + "like/")
                                .orderByKey();

                            changeDataRef
                                .startAt(checkboxState.지역)
                                .endAt(checkboxState.지역 + "\uf8ff")
                                .on("child_added", (snapshot) => {
                                    const tmp4 = [];
                                    if (snapshot.key == checkboxState.지역) {
                                        data4.push({
                                            key: value.key,
                                            name: value.name,
                                        });
                                    }
                                });
                            changeDataRef
                                .startAt("난이도" + checkboxState2.난이도)
                                .endAt(
                                    "난이도" + checkboxState2.난이도 + "\uf8ff"
                                )
                                .on("child_added", (snapshot) => {
                                    const tmp4 = [];
                                    if (
                                        snapshot.key ==
                                        "난이도" + checkboxState2.난이도
                                    ) {
                                        data4.push({
                                            key: value.key,
                                            name: value.name,
                                        });
                                    }
                                });
                            changeDataRef
                                .startAt("평점" + checkboxState3.평점)
                                .endAt("평점" + checkboxState3.평점 + "\uf8ff")
                                .on("child_added", (snapshot) => {
                                    const tmp4 = [];
                                    if (
                                        snapshot.key ==
                                        "평점" + checkboxState3.평점
                                    ) {
                                        data4.push({
                                            key: value.key,
                                            name: value.name,
                                        });
                                    }
                                });
                        });
                        {
                            var key = Math.random().toString().replace(".", "");
                            data4.map((value) => {
                                firebase
                                    .database()
                                    .ref(
                                        "user/" +
                                            value.key +
                                            "/" +
                                            "room/" +
                                            data +
                                            key
                                    )
                                    .update({
                                        name: list,
                                        Room: data,
                                        regdate: new Date().toString(),
                                    });
                            });
                        }

                        navigation.navigate("대화방 목록");
                    }}
                />
            </View>
        </View>
    );
};
export default Like;
const styles = StyleSheet.create({
    container2: {
        flex: 0.5,
        alignItems: "center",
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    checkbox: {
        margin: 8,
        alignSelf: "center",
        color: "#f0fc",
    },
    label: {
        margin: 8,
    },
});
