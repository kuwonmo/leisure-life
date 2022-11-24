import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import "@firebase/firestore";
import ChatScreen from "./Screens/ChatScreen";
import FirstUI from "./Screens/FirstUI";
import ChatScreen2 from "./Screens/ChatScreen2";
import Mapview from "./Screens/Mapview";
import Select from "./Screens/Select";
import Room from "./Screens/Room";
import ClearRoom from "./Screens/ClearRoom";
import Example2 from "./Screens/Example2";
import Match from "./Screens/Match";
import Like from "./Screens/Like";
import Question from "./Screens/Question";
import Schedule from "./Screens/Schedule";
import LevelUp from "./Screens/LevelUp";
import Friend from "./Screens/Firend";
import Setting from "./Screens/Setting";
import Now from "./Screens/Now";
import Exam from "./Screens/Exam";

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="로그인" component={LoginScreen} />
                <Stack.Screen name="회원가입" component={RegisterScreen} />
                <Stack.Screen name="대화방" component={ChatScreen} />
                <Stack.Screen name="처음화면" component={FirstUI} />
                <Stack.Screen name="채팅2번방" component={ChatScreen2} />
                <Stack.Screen name="매칭선택" component={Mapview} />
                <Stack.Screen name="관심분야 선택" component={Select} />
                <Stack.Screen name="대화방 목록" component={Room} />
                <Stack.Screen name="새로운 대화방목록" component={ClearRoom} />
                <Stack.Screen name="예제" component={Example2} />
                <Stack.Screen name="매칭" component={Match} />
                <Stack.Screen name="관심 방탈출" component={Like} />
                <Stack.Screen name="문제방" component={Question} />
                <Stack.Screen name="스케줄방" component={Schedule} />
                <Stack.Screen name="레벨업" component={LevelUp} />
                <Stack.Screen name="친구방" component={Friend} />
                <Stack.Screen name="설정" component={Setting} />
                <Stack.Screen name="현재설정" component={Now} />
                <Stack.Screen name="예시" component={Exam} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
