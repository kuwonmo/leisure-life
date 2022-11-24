import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
} from "react";
import { View, StyleSheet, Text } from "react-native";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { GiftedChat } from "react-native-gifted-chat";
import { Input, Button } from "react-native-elements";

const ClearRoom = ({ route, navigation }) => {
    const { itemId } = route.params;
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
    const [Room, newRoom] = useState([
        {
            Roomname: JSON.stringify(itemId),
        },
    ]);
    console.log(Room);
    return Room.map((value) => (
        <View style={styles.container}>
            <Button
                title={value.Roomname}
                style={styles.button}
                onPress={() =>
                    navigation.navigate("대화방", {
                        Roomname: value.Roomname,
                    })
                }
            />
        </View>
    ));
};
export default ClearRoom;
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
