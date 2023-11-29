import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useMemo, useEffect, useReducer, createContext } from "react";
import * as Location from 'expo-location';
import { AuthProvider } from "./contexts/Auth";
import HomeScreen from "./screens/Home/Home";
import AlertScreen from "./screens/Alert/AlertMain";
import SettingScreen from "./screens/Setting/Setting";
import AllScreen from "./screens/All";

const Tab = createBottomTabNavigator();


export default function App() {

  const ask = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
  };
  
  useEffect(() => {
    // const bootstrapAsync = async () => {
    //   let userToken;
    //   try {
    //     userToken = await SecureStore.getItemAsync("userToken");
    //   } catch (e) {
    //     // Restoring token failed
    //   }
    //   dispatch({ type: "RESTORE_TOKEN", token: userToken });
    // };
    // bootstrapAsync();
  }, []);

  

  return (
    <NavigationContainer>
      <AuthProvider>
            <Tab.Navigator
            screenOptions={({route}) => ({
              headerShown:false
            })}>
            <Tab.Screen name="홈" component={HomeScreen} />
            <Tab.Screen name="알림" component={AlertScreen} />
            <Tab.Screen name="설정" component={SettingScreen} />
            <Tab.Screen name="전체" component={AllScreen} />
          </Tab.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

 // tabBarIcon: ({focused, color, size}) => {
              //   let iconName;
              //   if (route.name === '홈') {
              //     iconName = focused
              //       ? require('./assets/images/home_ch.png')
              //       : require('./assets/images/home_un.png');
              //   } else if (route.name === '알림') {
              //     iconName = focused
              //       ? require('./assets/images/ranking_ch.png')
              //       : require('./assets/images/ranking_un.png');
              //   } else if (route.name === '설정') {
              //     iconName = focused
              //       ? require('./assets/images/calendar_ch.png')
              //       : require('./assets/images/calendar_un.png');
              //   } else if (route.name === '전체') {
              //     iconName = focused
              //       ? require('./assets/images/user_ch.png')
              //       : require('./assets/images/user_un.png');
              //   }
              //   return (
              //     <Image source={iconName} style={{width: 25, height: 25}} />
              //   );
              // },
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
