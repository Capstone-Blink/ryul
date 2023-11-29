import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AlertMainScreen from './AlertMain';
const Stack = createNativeStackNavigator();

const AlertScreen = ({ navigation }) => {

    return (
       <Stack.Navigator
        initialRouteName="알림메인"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="알림메인"
            component={AlertMainScreen}/>
       </Stack.Navigator>
       
       
    )
}

export default AlertScreen;