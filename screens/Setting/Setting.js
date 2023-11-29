import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SettingMainScreen from './SettingMain';
import UserConnectScreen from './UserConnect';
import ProtectorConnectScreen from './ProtectorConnect';
const Stack = createNativeStackNavigator();

const SettingScreen = ({ navigation }) => {

    return (
       <Stack.Navigator
        initialRouteName="설정메인"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="설정메인"
            component={SettingMainScreen}/>
        <Stack.Screen
            name="유저연결"
            component={UserConnectScreen}/>
        <Stack.Screen
            name="보호자연결"
            component={ProtectorConnectScreen}/>
        {/* <Stack.Screen
            name="설정메인"
            component={SettingMainScreen}/>
        <Stack.Screen
            name="설정메인"
            component={SettingMainScreen}/> */}
       </Stack.Navigator>
    )
}

export default SettingScreen;