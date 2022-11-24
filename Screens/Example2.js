import { StatusBar } from "expo-status-bar";
import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
    useRef,
} from "react";
import {
    TextInput,
    SafeAreaView,
    FlatList,
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";

import * as firebase from "firebase";
class Example2 extends Component {}
Example2 = ({ navigation }) => {
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

    const text1 = useRef(null);
    const [text, setText] = useState("");
    const [data, setData] = useState("");

    function delMemo(key) {
        firebase
            .database()
            .ref("memo/" + "123123/" + key)
            .set(null);
    }

    function saveMemo() {
        var key = Math.random().toString().replace(".", "");
        var memo = text;

        firebase
            .database()
            .ref("memo/" + "123123" + "/" + key)
            .update({
                key: key,
                memo: memo,
                regdate: new Date().toString(),
            });

        text1.current.clear();
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
                <Text style={{ flex: 1 }}>{item.memo}</Text>
                <Button title="삭제" onPress={() => delMemo(item.key)} />
            </View>
        );
    };

    useEffect(() => {
        var changeDataRef = firebase
            .database()
            .ref("memo/" + "123123")
            .orderByChild("regdate");

        changeDataRef.on("value", (snapshot) => {
            console.log(snapshot);

            const tmp = [];

            snapshot.forEach((child) => {
                tmp.unshift({
                    key: child.key,
                    memo: child.val().memo,
                    regdate: child.val().regdate,
                });
            });

            console.log(tmp);

            setData(tmp);
        });
    }, []);

    return (
        <View style={{ backgroundColor: "#fc0", flex: 1 }}>
            <StatusBar style="auto" />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 15 }}>
                    <Text style={{ textAlign: "center", fontSize: 18 }}>
                        메모장
                    </Text>
                </View>
                <View style={{ backgroundColor: "#fff", flex: 1 }}>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                        <TextInput
                            style={{
                                backgroundColor: "#eee",
                                padding: 5,
                                flex: 1,
                            }}
                            ref={text1}
                            onChangeText={(text) => setText(text)}
                            placeholder="메모를 입력해주세요"
                        />
                        <Button title="저장" onPress={() => saveMemo()} />
                    </View>
                    <View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            style={{ padding: 15 }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};
export default Example2;
