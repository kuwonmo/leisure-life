import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
    useRef,
} from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as firebase from "firebase";
import { auth, db } from "../firebase";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ScrollView,
    Alert,
    FlatList,
} from "react-native";
import { Input, Button, ThemeConsumer } from "react-native-elements";
import { Value } from "react-native-reanimated";
class Question extends Component {}
Question = ({ navigation }) => {
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
    const [longtitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [ok, setOk] = useState(true);
    const [answer, setAnswer] = useState("");

    var email;
    var displayname;

    const [data, setData] = useState([
        {
            key: "",
            name: "",
            latitude: "",
            longitude: "",
            regdate: "",
            age: "",
            mbti: "",
        },
    ]);
    const [data2, setData2] = useState("");
    const [list, setList] = useState("");
    const [data5, setData5] = useState([""]);
    var [list2, setList2] = useState([
        {
            key: "",
            name: "",
        },
    ]);

    const ask = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 6 });
        const location = { latitude, longitude };
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        console.log(latitude);
        if (latitude != null) {
            const unsubscribe = auth.onAuthStateChanged(function (user) {
                email = user.email.replace(".", "");
                displayname = user.displayName;

                setData2(email);
                setList(displayname);
                console.log(data2);
                firebase
                    .database()
                    .ref("user/" + data2)
                    .update({
                        latitude: latitude,
                        longtitude: longtitude,
                    });
            });
            return unsubscribe;
        }
    };
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
                    {"이름 : " +
                        item.memo +
                        " / 나이 : " +
                        item.age +
                        " / mbti : " +
                        item.mbti}
                </Text>
                <Button title="삭제" onPress={() => delMemo(item.key)} />
            </View>
        );
    };
    useEffect(() => {
        ask();
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
                    age: child.val().age,
                    mbti: child.val().mbti,
                });
            });

            setData(tmp);
        });
        var changeDataRef2 = firebase
            .database()
            .ref("memo/" + "123123")
            .orderByChild("regdate");

        changeDataRef2.on("value", (snapshot) => {
            const tmp2 = [];

            snapshot.forEach((child) => {
                tmp2.unshift({
                    key: child.key,
                    memo: child.val().memo,
                    regdate: child.val().regdate,
                    age: child.val().age,
                    mbti: child.val().mbti,
                });
            });

            setData5(tmp2);
        });
    }, []);

    function delMemo(key) {
        firebase
            .database()
            .ref("memo/" + "123123/" + key)
            .set(null);
    }
    return (
        <View style={styles.container}>
            <View style={styles.container3}>
                <Image source={require("./melon.png")} />
            </View>
            <Input
                placeholder="정답을 입력하세요"
                label="정답"
                value={answer}
                onChangeText={(text) => setAnswer(text)}
            />
            <Button
                title="입력완료"
                style={styles.button}
                onPress={() => navigation.navigate("레벨업")}
            />
        </View>
    );
};
export default Question;
const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    container3: {
        flex: 0.5,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    container2: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    toDo: {
        backgroundColor: "blue",
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    toDoText: {
        color: "black",
        fontSize: 20,
    },
    toDoText2: {
        color: "red",
        fontSize: 25,
    },
});
