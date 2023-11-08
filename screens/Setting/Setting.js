import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SettingMainScreen from './SettingMain';
import SetConnectScreen from './SetConnect';
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
            component={SetConnectScreen}/>
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