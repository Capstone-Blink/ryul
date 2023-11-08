import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HomeMainScreen from './HomeMain';
import LoginScreen from './Login';
import SignupScreen from './Signup';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === '로그인' || routeName === '회원가입') {
          navigation.setOptions({tabBarStyle: {display: 'none'}});
        } else {
            navigation.setOptions({tabBarStyle: {display: undefined}});
        }
    }, [navigation, route]);
    
    return (
        <Stack.Navigator 
            initialRouteName="홈메인" 
            screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="홈메인" 
                component={HomeMainScreen}  
                />
            <Stack.Screen 
                name="로그인" 
                component={LoginScreen}
                />
            <Stack.Screen 
                name="회원가입" 
                component={SignupScreen}
                />
        </Stack.Navigator>
    )
}

export default HomeScreen

