import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, FlatList  } from 'react-native';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth';
import { blinkLogo, userImage, leftDirection, idIcon } from '../../imageUrls.js';

const ProtectorConnectScreen = ({ navigation }) => {
    const { getUserInfo } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const { setUserConnect } = useContext(AuthContext);
    const { getUserConnect } = useContext(AuthContext);
    const [isFont, setIsFont] = useState(false);
    const [userConnectId, setUserConnectId] = useState(null);
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
    const userConnect = async () => {
        token = state.userToken
        await setUserConnect({ token, userConnectId })
    }
    useEffect(() => {
        async function fetchData2(){
            token = state.userToken
            await getUserConnect({ token })
        } 
        fetchData2();
    },[]);
    const renderItem2 = ({ item }) => (
        <View
        style={{height:35, width:'100%',alignItems:'center', flexDirection:'row'}}>
            <Image
            source={userImage}
            style={{marginLeft:'5%', height:'100%', width:'10%'}}
            resizeMode='contain'/>
            <Text
            style={{
                fontFamily:"BM_hanna",
                color:'black',
                opacity:0.8,
                fontSize:18,
                marginLeft:'6%'
            }}>{item.name}</Text>
        </View>
    );   
    return(
        <View
        style={styles.container}>
            <View
            style={styles.Top}>
                <View style={{width:'100%', height:'60%'}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('설정메인')}
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
            </View>
            <View
            style={styles.first}>
                <Text
                style={styles.firstText_1}>시각 장애인 등록</Text>
                <Text
                style={styles.firstText_2}>등록 시스템을 통해서 {"\n"}등록된 사용자의 앱 사용 현황 및 위치를 알 수 있어요</Text>
            </View>
            <View
            style={styles.second}>
                <Image
                source={idIcon}
                style={styles.idIcon}
                resizeMode='contain'/>
                <TextInput
                style={styles.idInput}
                placeholder=' 사용자 아이디'
                value={userConnectId}
                onChangeText={(text) => setUserConnectId(text)}/>
                <TouchableOpacity
                style={styles.userConnectButton}
                onPress={() => userConnect()}>
                    <Text
                    style={styles.idText}>아이디로 추가</Text>
                </TouchableOpacity>
            </View>
            <View
            style={styles.third}>
                <View
                style={styles.third_1}>
                    <Text
                    style={styles.third_1_Text1}>등록된 프로필</Text>
                    <Text
                    style={styles.third_1_Text2}>연결상태</Text>
                </View>
                <View
                style={styles.third_2}>
                    <FlatList
                    data={state.acceptList3}
                    renderItem={renderItem2}
                    keyExtractor={item => item.p_id}/>
                </View>
            </View>
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
        flex:0.8,
        marginTop:'12%',
        flexDirection:'column',
        alignItems:'center',
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
    first:{
        flex:1.3,
        backgroundColor:'white',
        flexDirection:'column'
    },
    firstText_1:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:40,
        marginLeft:'5%',
        marginTop:'5%'
    },
    firstText_2:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.6,
        fontSize:13,
        marginLeft:'5%',
        marginTop:'1.5%'
    },
    second:{
        flex:1,
        backgroundColor:'white',
        marginTop:'3%',
        flexDirection:'row',
        alignItems:'center'
    },
    idIcon:{
        height:'40%',
        width:'10%',
        marginLeft:'1%',
        opacity:0.9
    },
    idInput:{
        width:'60%',
        height:'45%',
        fontFamily:"BM_hanna",
        borderWidth: 1,
        borderColor:'#777777',
        borderRadius:7
    },
    userConnectButton:{
        marginLeft:'1.5%',
        backgroundColor:'#467d3a',
        opacity:0.9,
        height:'35%',
        width:'25%',
        borderWidth: 1,
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center'
    },
    idText:{
        fontFamily:"BM_hanna",
        color:'white',
        fontSize:15,
    },
    third:{
        flex:6,
        backgroundColor:'white',
        marginTop:'3%',
        marginBottom:'3%',
        flexDirection:'column'
    },
    third_1:{
        flexDirection:'row',
        flex:1,
        alignItems:'center'
    },
    third_1_Text1:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:16,
        marginLeft:'6%'
    },
    third_1_Text2:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.6,
        fontSize:16,
        marginLeft:'53%'
    },
    third_2:{
        flex:7,
        flexDirection:'column'
    }
}
)
export default ProtectorConnectScreen;