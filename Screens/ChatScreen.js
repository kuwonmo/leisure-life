import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
} from "react";
import { View, StyleSheet, Text } from "react-native";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { GiftedChat } from "react-native-gifted-chat";
const ChatScreen = ({ route, navigation }) => {
    const { Roomname } = route.params;
    const [messages, setMessages] = useState([]);
    const name3 = JSON.stringify(Roomname);
    useLayoutEffect(() => {
        const unsubscribe = db
            .collection(name3)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                        _id: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user,
                    }))
                )
            );
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        db.collection(name3).add({
            _id,
            createdAt,
            text,
            user,
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
                        marginRight: 10,
                    }}
                    onPress={() => navigation.navigate("대화방 목록")}
                >
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
                address: auth?.currentUser?.providerId,
            }}
        />
    );
};
export default ChatScreen;
