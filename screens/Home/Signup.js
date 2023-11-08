import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth';
import { leftDirection, blinkLogo } from '../../imageUrls';

const SignupScreen = ({ navigation }) => {
    const { signUp } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [pw2, setPw2] = useState("")
    const [name, setName] = useState("")
    const [sex, setSex] = useState("")
    const [userInfo, setUserInfo] = useState("")
    const [isFont, setIsFont] = useState(false);
    const handleSexSelect = (sex) => {
        setSex(sex);
    };
    const handleUserInfoSelect = (userInfo) => {
        setUserInfo(userInfo);
    };
    useEffect(() => {
        if (state.isSignUp){
            navigation.navigate("로그인")
        }
    }, [state])
    useEffect(() => {
        async function fetchData(){
        await Font.loadAsync({
          "BM_hanna": require('../../assets/fonts/BMHANNAPro.ttf'),
        });
        setIsFont(true);
        }
        fetchData();
    },[]);

    return(
        <View style={styles.home}>
            <View style={styles.homeTop}>
                <View style={{width:'100%', height:'30%'}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('로그인')}
                    style={styles.backButton}>
                        <Image
                        source={leftDirection}
                        style={styles.leftDirection}
                        resizeMode='contain'/>
                        <Image
                        source={blinkLogo}
                        style={styles.blinkLogo}
                        resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                {isFont && 
                <Text
                style={styles.blinkText}>blink</Text>}
            </View>
            <View style={{flex:8, alignItems:'center'}}>
                <View style={styles.homeSignUp}>
                    <TextInput
                        style={styles.textInputID}
                        placeholder="아이디"
                        value={id}
                        autoCapitalize='none'
                        onChangeText={(text) => setId(text)}/>
                    <TextInput
                        style={styles.textInputPW}
                        placeholder="비밀번호"
                        value={pw}
                        secureTextEntry
                        onChangeText={(text) => setPw(text)}/>
                    <TextInput
                        style={styles.textInputPW2}
                        placeholder="비밀번호 확인"
                        value={pw2}
                        secureTextEntry
                        onChangeText={(text) => setPw2(text)}/>
                    <TextInput
                        style={styles.textInputName}
                        placeholder="이름"
                        value={name}
                        onChangeText={(text) => setName(text)}/>
                    <View style={styles.selectView}>
                        <TouchableOpacity
                            style={[
                                styles.buttonLeft,
                                sex === '남자' && styles.selectedButton]}
                            onPress={() => handleSexSelect('남자')}>
                            {sex === '남자'?
                            <Text
                            style={styles.selectedText}>남자</Text>:
                            <Text
                            style={styles.selectText}>남자</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.buttonRight,
                                sex === '여자' && styles.selectedButton]}
                            onPress={() => handleSexSelect('여자')}>
                            {sex === '여자'?
                            <Text
                            style={styles.selectedText}>여자</Text>:
                            <Text
                            style={styles.selectText}>여자</Text>}
                        </TouchableOpacity>
                        <Text>   </Text>
                        <TouchableOpacity
                            style={[
                                styles.buttonLeft,
                                userInfo === '사용자' && styles.selectedButton]}
                            onPress={() => handleUserInfoSelect('사용자')}>
                            {userInfo === '사용자'?
                            <Text
                            style={styles.selectedText}>사용자</Text>:
                            <Text
                            style={styles.selectText}>사용자</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.buttonRight,
                                userInfo === '보호자' && styles.selectedButton]}
                            onPress={() => handleUserInfoSelect('보호자')}>
                           {userInfo === '보호자'?
                            <Text
                            style={styles.selectedText}>보호자</Text>:
                            <Text
                            style={styles.selectText}>보호자</Text>}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={() => signUp({ id, pw, pw2, name, sex, userInfo })}>
                            <Text
                            style={styles.signUpButtonText}>회원가입
                            </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default SignupScreen;

const styles = StyleSheet.create({
    home:{
        height:'112%',
        width:'100%',
        flexDirection:'column',
        backgroundColor:'#d0d0d0'
    },
    homeTop:{
        flex:3,
        marginTop:'12%',
        flexDirection:'column',
        alignItems:'center'
    },
    backButton:{
        width:'20%',
        height:'100%',
        marginLeft:'3%',
        flexDirection:'row'
    },
    leftDirection:{
        width:'40%',
        height:'100%'
    },
    blinkLogo:{
        width:'50%',
        height:'100%'
    },
    blinkText:{
        fontFamily:"BM_hanna",
        color:'#467d3a',
        fontSize:65,
        marginTop:'10%'
    },
    homeSignUp:{
        backgroundColor:'white',
        width:'95%',
        height:'60%',
        borderRadius:7,
        alignItems:'center',
    },
    textInputID:{
        marginTop:'4%',
        width:'80%',
        height:'14%',
        borderWidth: 1,
        borderColor:'#777777',
        borderTopEndRadius:7,
        borderTopStartRadius:7,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontFamily:'BM_hanna'
    },
    textInputPW:{
        marginTop:-0.5,
        width:'80%',
        height:'14%',
        borderWidth: 1,
        borderColor:'#777777',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontFamily:'BM_hanna'
    },
    textInputPW2:{
        width:'80%',
        height:'14%',
        borderWidth: 1,
        borderColor:'#777777',
        borderBottomEndRadius:7,
        borderBottomStartRadius:7,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop:-0.5,
        fontFamily:'BM_hanna'
    },
    textInputName:{
        marginTop:'4%',
        width:'80%',
        height:'14%',
        borderWidth: 1,
        borderColor:'#777777',
        borderTopEndRadius:7,
        borderTopStartRadius:7,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontFamily:'BM_hanna'
    },
    selectView:{
        marginTop:-1,
        flexDirection:'row',
        width:'80%',
        height:'14%',
        borderWidth: 1,
        borderColor:'#777777',
        borderBottomEndRadius:7,
        borderBottomStartRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonLeft: {
        justifyContent:'center',
        alignItems:'center',
        width:'23%',
        height:'70%',
        borderTopLeftRadius:7,
        borderBottomLeftRadius:7,
        borderWidth: 1,
        borderColor: 'gray',
    },
    buttonRight: {
        justifyContent:'center',
        alignItems:'center',
        width:'23%',
        height:'70%',
        borderTopRightRadius:7,
        borderBottomRightRadius:7,
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: -1
    },
    selectText:{
        fontFamily:'BM_hanna',
        color:'gray'
    },
    selectedText:{
        fontFamily:'BM_hanna',
        color:'white'
    },
    selectedButton: {
        backgroundColor: '#467d3a',
    },
    signUpButton:{
        marginTop:'4%',
        alignItems:'center',
        borderRadius:7,
        backgroundColor:'#467d3a',
        width:'80%',
        height:'15%',
        justifyContent:'center'
    },
    signUpButtonText:{
        fontFamily:'BM_hanna',
        color:'white',
        fontSize:25
    }
})