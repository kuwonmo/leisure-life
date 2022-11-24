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
import { Input, Button, Image } from "react-native-elements";
import * as firebase from "firebase";
import { auth } from "../firebase";
import {
    Entypo,
    MaterialIcons,
    AntDesign,
    FontAwesome5,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
const Setting = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [mbti, setMbti] = useState("");
    const [data5, setdata5] = useState("");
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
                image: image,
                regdate: new Date().toString(),
                laitude: 37.449079,
                longtitude: 126.65712,
            });
        // Signed in
        // ...
    };
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(image);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Input
                placeholder="이름을 입력하세요"
                label="이름"
                leftIcon={
                    <MaterialIcons name="badge" size={28} color="black" />
                }
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Button title="프로필을 선택해주세요" onPress={pickImage} />
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                />
            )}
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
export default Setting;
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
