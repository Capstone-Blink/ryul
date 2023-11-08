import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import { AuthContext } from '../../contexts/Auth';
import * as Font from "expo-font";
import { leftDirection, blinkLogo } from '../../imageUrls';


const LoginScreen = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const { getUserInfo } = useContext(AuthContext);
    const { signUpCancel } = useContext(AuthContext);
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const [isFont, setIsFont] = useState(false);

    useEffect(() => {
        if (state.isLoggedIn){
            navigation.navigate("홈메인")
        }
    },[state])
   
    const signUp = () => {
        signUpCancel()
        navigation.navigate('회원가입')
    }
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
                    onPress={() => navigation.navigate('홈메인')}
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
                <View style={styles.homeLogin}>
                    <TextInput
                        style={styles.textInputID}
                        placeholder="아이디"
                        value={id}
                        onChangeText={(text) => setId(text)}/>
                    <TextInput
                        style={styles.textInputPW}
                        placeholder="비밀번호"
                        value={pw}
                        onChangeText={(text) => setPw(text)}/>
                    <View style={{maringTop:'3%', height:'15%', flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity>
                            {isFont && 
                            <Text style={styles.etcText}>
                                아이디 찾기
                            </Text>}
                        </TouchableOpacity>
                        <Text style={{color:'gray'}}>  |  </Text>
                        <TouchableOpacity>
                            {isFont && 
                            <Text style={styles.etcText}>
                                비밀번호 찾기
                            </Text>}
                        </TouchableOpacity>
                        <Text style={{color:'gray'}}>  |  </Text>
                        <TouchableOpacity
                        onPress={() => signUp() }>
                            {isFont && 
                            <Text style={styles.etcText}>
                                회원가입
                            </Text>}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => signIn({ id, pw })}>
                        {isFont &&
                        <Text
                        style={styles.loginButtonText}>
                            로그인
                        </Text>}
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('회원가입')}>
                        <Text
                            style={{}}>
                            회원가입
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

export default LoginScreen;

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
    homeLogin:{
        backgroundColor:'white',
        width:'95%',
        height:'40%',
        borderRadius:7,
        alignItems:'center',
    },
    textInputID:{
        marginTop:'4%',
        width:'80%',
        height:'20%',
        borderWidth: 1,
        borderColor:'#777777',
        borderTopEndRadius:7,
        borderTopStartRadius:7,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontFamily:'BM_hanna'
    },
    textInputPW:{
        width:'80%',
        height:'20%',
        borderWidth: 1,
        borderColor:'#777777',
        borderBottomEndRadius:7,
        borderBottomStartRadius:7,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop:-1,
        fontFamily:'BM_hanna'
    },
    etcText:{
        fontFamily:'BM_hanna',
        color:'gray'
    },
    loginButton:{
        marginTop:'5%',
        alignItems:'center',
        borderRadius:7,
        backgroundColor:'#467d3a',
        width:'80%',
        height:'25%',
        justifyContent:'center'
    },
    loginButtonText:{
        fontFamily:'BM_hanna',
        color:'white',
        fontSize:25
    }
})