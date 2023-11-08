import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth';
import { blinkLogo, userImage, leftDirection } from '../../imageUrls.js';

const SetConnectScreen = ({ navigation }) => {
    const { getUserInfo } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const [isFont, setIsFont] = useState(false);

    useEffect(() => {
        async function fetchData(){
        await Font.loadAsync({
          "BM_hanna": require('../../assets/fonts/BMHANNAPro.ttf'),
        });
        setIsFont(true);
        // getUserInfo()
        }
        fetchData();
    });

    return(
        <View
        style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor:'#d0d0d0'
    },
    Top:{
        flex:3,
        marginTop:'12%',
        flexDirection:'column',
        alignItems:'center'
    },
}
)
export default SetConnectScreen;