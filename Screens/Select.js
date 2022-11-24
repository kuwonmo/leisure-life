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

const Select = ({ navigation }) => {
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
    const [data4, setData4] = useState([
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
                    flexDirection: "column",
                }}
            >
                <Text style={styles.toDoText}>지역 : {item.지역}</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="skyblue"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "blue" }}
                    style={styles.checkbox}
                    onPress={() => {
                        setCheckboxState({ 지역: item.지역 });
                        firebase
                            .database()
                            .ref(
                                "user/" +
                                    data +
                                    "/" +
                                    "like/" +
                                    checkboxState.지역
                            )
                            .update({
                                지역: checkboxState.지역,
                            });
                    }}
                />
            </View>
        );
    };
    const renderItem2 = ({ item }) => {
        return (
            <View
                style={{
                    padding: 15,

                    flexDirection: "column",
                }}
            >
                <Text style={styles.toDoText}>난이도 : {item.난이도}</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="skyblue"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "blue" }}
                    style={styles.checkbox}
                    onPress={() => {
                        setCheckboxState2({ 난이도: item.난이도 });
                        firebase
                            .database()
                            .ref(
                                "user/" +
                                    data +
                                    "/" +
                                    "like/" +
                                    "난이도" +
                                    checkboxState2.난이도
                            )
                            .update({
                                난이도: checkboxState2.난이도,
                            });
                    }}
                />
            </View>
        );
    };
    const renderItem3 = ({ item }) => {
        return (
            <View
                style={{
                    padding: 15,
                    flexDirection: "column",
                }}
            >
                <Text style={styles.toDoText}>평점 : {item.평점}</Text>
                <BouncyCheckbox
                    size={30}
                    fillColor="skyblue"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "blue" }}
                    style={styles.checkbox}
                    onPress={() => {
                        setCheckboxState3({ 평점: item.평점 });
                        firebase
                            .database()
                            .ref(
                                "user/" +
                                    data +
                                    "/" +
                                    "like/" +
                                    "평점" +
                                    checkboxState3.평점
                            )
                            .update({
                                평점: checkboxState3.평점,
                            });
                    }}
                />
            </View>
        );
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            email = user.email.replace(".", "");

            setData(email);
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
            <View style={styles.container3}>
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
            </View>
            <View style={styles.container2}>
                <Button
                    title="선택완료"
                    style={styles.button}
                    onPress={() => {
                        {
                            firebase
                                .database()
                                .ref(
                                    "user/" +
                                        data +
                                        "/" +
                                        "like/" +
                                        checkboxState.지역
                                )
                                .update({
                                    지역: checkboxState.지역,
                                });
                            firebase
                                .database()
                                .ref(
                                    "user/" +
                                        data +
                                        "/" +
                                        "like/" +
                                        "난이도" +
                                        checkboxState2.난이도
                                )
                                .update({
                                    난이도: checkboxState2.난이도,
                                });
                            firebase
                                .database()
                                .ref(
                                    "user/" +
                                        data +
                                        "/" +
                                        "like/" +
                                        "평점" +
                                        checkboxState3.평점
                                )
                                .update({
                                    평점: checkboxState3.평점,
                                });
                            navigation.navigate("관심 방탈출");
                        }
                    }}
                />
                <Button
                    title="초기화"
                    style={styles.button}
                    onPress={() => {
                        {
                            firebase
                                .database()
                                .ref("user/" + data + "/" + "like")
                                .set({
                                    지역: "없음",
                                    난이도: "없음",
                                    평점: "없음",
                                });
                            navigation.navigate("관심 방탈출");
                        }
                    }}
                />
            </View>
        </View>
    );
};
export default Select;
const styles = StyleSheet.create({
    container2: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    container3: {
        flex: 3,
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
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
