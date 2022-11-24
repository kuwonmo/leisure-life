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

const LevelUp = ({ navigation }) => {
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
    var email;
    const [data, setData] = useState("");
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            email = user.email.replace(".", "");

            setData(email);
        });
        return unsubscribe;
    }, []);
    console.log(data);
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image
                    source={require("./레벨업.png")}
                    style={{ height: 300, width: 360 }}
                />
            </View>

            <View style={styles.container}>
                <Button
                    title="처음으로 돌아가기"
                    style={styles.button}
                    onPress={() => navigation.navigate("처음화면")}
                />
            </View>
        </View>
    );
};
export default LevelUp;
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
