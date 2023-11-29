import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth';
import { blinkLogo, speaker } from '../../imageUrls.js';

const HomeMainScreen = ({ navigation }) => {
    const { getUserInfo } = useContext(AuthContext);
    const { signIn2 } = useContext(AuthContext);
    const { getLocation1 } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const [isFont, setIsFont] = useState(false);
    const [ userName, setUserName ] = useState(null);
    
    useEffect(() => {
        async function getUser(){
            if(state.isLoggedIn && state.userName == null){
                token = state.userToken
                await getUserInfo({ token })
                getLocation1( token )
            }
            else {
                if( await AsyncStorage.getItem("userToken") != null && !state.isLoggedIn){
                    token = await AsyncStorage.getItem("userToken")
                    await signIn2(token)
                    await getUserInfo({token})
                    getLocation1( token )
            }}
        }
        getUser();
    },[]);

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

    return (
        <View
        style={styles.home}>
            <View 
            style={styles.homeTop}>
                <Image
                source={blinkLogo}
                style={styles.blinkLogo}
                resizeMode='contain'/>
                {isFont && (<Text
                style={styles.blinkText}>blink</Text>)}
                {state.isLoggedIn ?
                <TouchableOpacity
                    style={styles.login}
                    onPress={() => navigation.navigate('설정')}>
                    {isFont && <Text
                    style={styles.loginText}>{state.userName}</Text>}
                </TouchableOpacity>:
                <TouchableOpacity
                    style={styles.login}
                    onPress={() => navigation.navigate('로그인')}>
                    {isFont && <Text
                    style={styles.loginText}>로그인</Text>}
                </TouchableOpacity>}
            </View>
            <View
            style={styles.homeCenter}>
                <TouchableOpacity
                style={styles.touchCenter}>
                    <Image
                    source={speaker}
                    style={styles.speaker}
                    resizeMode='contain'/>
                    {isFont && <Text
                    style={styles.textCenter}>
                        횡단보도 앞에서{"\n"}
                        핸드폰을{"\n"}
                        정면으로 놓고{"\n"}
                        화면을 3초간 눌러주세요.</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeMainScreen;

const styles = StyleSheet.create({
    home:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor:'#d0d0d0'
    },
    homeTop:{
        flexDirection:'row',
        flex:1,
        marginTop:'12%',
        alignItems:'center',
    },
    blinkLogo:{
        height:'65%',
        width:'10%',
        marginLeft:'5%'
    },
    blinkText:{
        fontFamily:"BM_hanna",
        color:'#467d3a',
        fontSize:35,
        marginLeft:'1%'
    },
    login:{
        marginLeft:'50%',
        padding:8,
        backgroundColor:'white',
        justifyContent:'center',
        borderRadius:10,
    },
    loginText:{
        fontFamily:"BM_hanna",
        color:'#323232',
        opacity:0.8
    },
    homeCenter:{
        flex:13,
        backgroundColor:'#d0d0d0',
        alignItems:'center'
    },
    touchCenter:{
        backgroundColor:'white',
        width:'95%',
        height:'93%',
        marginTop:'3%',
        borderRadius:25
    },
    textCenter:{
        textAlign:'center',
        fontFamily:"BM_hanna",
        fontSize:30,
        color:'#323232',
        lineHeight:40,
        marginTop:'60%'
    },
    speaker:{
        position:'absolute',
        width:'11%',
        marginTop:'37%',
        marginLeft:'5%'
    }
})