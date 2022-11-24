import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
    Component,
    useRef,
} from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { auth } from "../firebase";
import {
    Entypo,
    MaterialIcons,
    AntDesign,
    FontAwesome5,
} from "@expo/vector-icons";
class Now extends Component {}
Now = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [mbti, setMbti] = useState("");
    const [data5, setdata5] = useState("");
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
    var email2;
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            email2 = user.email.replace(".", "");
            setdata5(email2);
        });
        return unsubscribe;
    }, []);
    useEffect(() => {
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
    }, []);

    const register = () => {
        firebase
            .database()
            .ref("user/" + data5 + "/")
            .update({
                name: name,
                email: data5,
                address: address,
                age: age,
                mbti: mbti,
                regdate: new Date().toString(),
                laitude: 37.449079,
                longtitude: 126.65712,
            });
        // Signed in
        // ...
    };
    console.log(data);
    return (
        <View style={styles.container}>
            <Input
                placeholder="이름을 입력하세요"
                label="이름"
                leftIcon={
                    <MaterialIcons name="badge" size={28} color="black" />
                }
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Input
                placeholder="프로필 URL을 입력해주세요"
                label="프로필"
                leftIcon={<MaterialIcons name="face" size={28} color="black" />}
                onChangeText={(text) => setImageUrl(text)}
            />
            <Input
                placeholder="주소를 입력하세요"
                label="주소"
                leftIcon={<Entypo name="address" size={28} color="black" />}
                value={address}
                onChangeText={(text) => setAddress(text)}
            />
            <Input
                placeholder="나이를 입력하세요"
                label="나이"
                leftIcon={
                    <FontAwesome5 name="user-clock" size={28} color="black" />
                }
                value={age}
                onChangeText={(text) => setAge(text)}
            />
            <Input
                placeholder="MBTI를 입력하세요"
                label="MBTI"
                leftIcon={
                    <AntDesign name="questioncircleo" size={28} color="black" />
                }
                value={mbti}
                onChangeText={(text) => setMbti(text)}
            />
            <Button title="변경완료" onPress={register} style={styles.button} />
        </View>
    );
};
export default Now;
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
