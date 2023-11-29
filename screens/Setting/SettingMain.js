import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth';
import { blinkLogo, userImage, rightDirection } from '../../imageUrls.js';

const SettingMainScreen = ({ navigation }) => {
    const { getUserInfo } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const { signOut } = useContext(AuthContext);
    const [isFont, setIsFont] = useState(false);

    useEffect(() => {
        async function getUser(){
            if (state.isLoggedIn && state.userName == null){
                token = state.userToken
                await getUserInfo({ token })
        }}
        getUser();
    },[state, navigation ]);
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
    const logOut = async() => {
        await signOut()
        navigation.navigate("홈메인")
    }
    return(
        <View
        style={styles.setting}>
            <View
            style={styles.settingTop}>
                <Image
                source={blinkLogo}
                style={styles.blinkLogo}
                resizeMode='contain'/>
                {isFont && (<Text
                style={styles.blinkText}>blink</Text>)}
            </View>
            <View
            style={styles.settingUser}>
                <View
                style={styles.settingUserTextView}>
                    {isFont && (<Text
                    style={styles.settingUserText}>설정</Text>)}
                </View>
                <View
                style={styles.settingUserLine}>
                </View>
                <View
                style={styles.settingUserInfo}>
                    <Image
                    source={userImage}
                    style={styles.userImage}
                    resizeMode='contain'/>
                    {state.isLoggedIn ?
                    <TouchableOpacity
                    style={styles.userInfo}>
                        <View style={{flexDirection:'column', width:'80%'}}>
                            <Text
                            style={styles.userInfoText}>{state.userName}({state.userInfo})</Text>
                            <Text
                            style={styles.userInfoFix}>내 정보 수정하기</Text>
                        </View>
                        <Image
                        source={rightDirection}
                        style={styles.rightDirection}
                        resizeMode='contain'/>
                    </TouchableOpacity>:
                    <TouchableOpacity
                    style={styles.userInfo}
                    onPress={() => navigation.navigate('로그인')}>
                        <View style={{flexDirection:'column', width:'80%'}}>
                            <Text
                            style={styles.userInfoText}>비회원</Text>
                            <Text
                            style={styles.userInfoFix}>로그인 페이지로 이동하기</Text>
                        </View>
                        <Image
                        source={rightDirection}
                        style={styles.rightDirection}
                        resizeMode='contain'/>
                    </TouchableOpacity>}
                </View>
            </View>
            <View
            style={styles.settingTab}>
                {state.isLoggedIn ?
                <TouchableOpacity
                style={styles.settingButton}
                onPress={() => {state.userInfo == "보호자" ? navigation.navigate("보호자연결"):navigation.navigate("유저연결")}}>
                    <Text
                    style={styles.settingButtonText}>{state.userInfo == "보호자"?"사용자 등록":"보호자 등록"}</Text>
                </TouchableOpacity>:
                <TouchableOpacity
                style={styles.settingButton}>
                    <Text
                    style={styles.settingButtonText}>보호자 등록(로그인이 필요한 기능입니다)</Text>
                </TouchableOpacity>}
                <TouchableOpacity
                style={styles.settingButton}>
                    <Text
                    style={styles.settingButtonText}>음성 안내 설정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.settingButton}>
                    <Text
                    style={styles.settingButtonText}>진동 설정</Text>
                </TouchableOpacity>
                {state.isLoggedIn ?
                <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => logOut()}>
                    <Text
                    style={styles.logoutButtonText}>로그아웃
                    </Text>
                </TouchableOpacity>:null}
            </View>
        </View>
    )
}

export default SettingMainScreen;

const styles = StyleSheet.create({
    setting:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor:'#d0d0d0'
    },
    settingTop:{
        flexDirection:'row',
        flex:1,
        marginTop:'12%',
        alignItems:'center'
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
        marginLeft:'25%'
    },
    settingUser:{
        flexDirection:'column',
        flex:2,
        backgroundColor:'white',
        alignItems:'center'
    },
    settingUserTextView:{
        flex:1,
        width:'100%',
        justifyContent:'center'
    },
    settingUserText:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:40,
        marginLeft:'5%'
    },
    settingUserLine:{
        flex:0.02,
        width:'90%',
        backgroundColor:'#d0d0d0'
    },
    settingUserInfo:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    userImage:{
        height:'50%',
        width:'10%'
    },
    userInfo:{
        width:'80%',
        height:'60%',
        marginLeft:'2%',
        alignItems:'center',
        flexDirection:'row'
    },
    userInfoText:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.9,
        fontSize:30,
    },
    userInfoFix:{
        fontFamily:"BM_hanna",
        color:'gray',
        fontSize:15,
        marginTop:'2%'
    },
    rightDirection:{
        opacity:0.6,
        height:'60%'
    },
    settingTab:{
        flexDirection:'column',
        flex:5,
        alignItems:'center'
    },
    settingButton:{
        width:'100%',
        height:'15%',
        marginTop:'2.5%',
        backgroundColor:'white',
        justifyContent:'center'
    },
    settingButtonText:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:18,
        marginLeft:'6%'
    },
    logoutButton:{
        alignItems:'center',
        marginTop:'8%',
        borderRadius:7,
        backgroundColor:'#467d3a',
        width:'60%',
        height:'15%',
        justifyContent:'center'
    },
    logoutButtonText:{
        fontFamily:'BM_hanna',
        color:'white',
        fontSize:25
    }
})