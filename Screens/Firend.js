import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
    useRef,
} from "react";
import {
    Entypo,
    MaterialIcons,
    AntDesign,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
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

class Friend extends Component {}
Friend = ({ navigation }) => {
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
                <Avatar
                    rounded
                    source={{
                        uri: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzAxMTRfMjYy%2FMDAxNDg0MzcxOTkxNzA4._N73NTpWleCLp8M6gXR8vpdDAZoAQ2mTJLimKBYFtRwg.5LEqnsukFugxlrTdlYk5hkxEKoVdUbTVsjL6gqJ03vIg.PNG.koomarin%2F%253F%253F%253F%253F%257B%253F_%253F%253F%253F%253F%253F%253F%253F.png&type=a340",
                    }}
                />
                <Text style={{ flex: 1 }}>
                    {"?????? : " +
                        item.name +
                        " / ?????? : " +
                        item.age +
                        " / mbti : " +
                        item.mbti}
                </Text>
            </View>
        );
    };
    const renderItem1 = ({ item }) => {
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
                    {"?????? : " +
                        item.memo +
                        " / ?????? : " +
                        item.age +
                        " / mbti : " +
                        item.mbti}
                </Text>
                <Button title="??????" onPress={() => delMemo(item.key)} />
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
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    style={{ padding: 15 }}
                />
            </View>
        </View>
    );
};
export default Friend;
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
