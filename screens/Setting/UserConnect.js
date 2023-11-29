import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList  } from 'react-native';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth';
import { blinkLogo, userImage, leftDirection } from '../../imageUrls.js';

const UserConnectScreen = ({ navigation }) => {
    const { getUserInfo } = useContext(AuthContext);
    const { state } = useContext(AuthContext);
    const { getProtectorConnect } = useContext(AuthContext);
    const { getProtectorConnect2 } = useContext(AuthContext);
    const { acceptBtn } = useContext(AuthContext);
    const { deleteBtn } = useContext(AuthContext);
    const [isFont, setIsFont] = useState("");
    const [acceptList, setAcceptList] = useState(null);

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

    useEffect(() => {
        async function fetchData2(){
            token = state.userToken
            await getProtectorConnect({ token })
            await getProtectorConnect2({ token })
        } 
        fetchData2();
    },[]);

    const accpet_Btn = (p_id) => {
        token = state.userToken
        acceptBtn({token, p_id})
    };
    const delete_Btn = (p_id) => {
        token = state.userToken
        deleteBtn({token, p_id})
    };
    const renderItem = ({ item }) => (
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
            <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => accpet_Btn(item.p_id)}>
                <Text
                style={styles.btnText}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.acceptBtn2}
            onPress={() => delete_Btn(item.p_id)}>
                <Text
                style={styles.btnText}>삭제</Text>
            </TouchableOpacity>
        </View>
    );
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
                style={styles.firstText_1}>보호자 등록</Text>
                <Text
                style={styles.firstText_2}>등록 시스템을 통해서 {"\n"}등록된 보호자에게 앱 사용 현황 및 위치를 알려줄 수 있어요</Text>
            </View>
            <View
            style={styles.second}>
                <View
                style={styles.second_1}>
                    <Text
                    style={styles.second_1_text}>
                        등록 요청({state.acceptList != null ?state.acceptList.length:0})
                    </Text>
                </View>
                <View
                style={styles.second_2}>
                    <FlatList
                    data={state.acceptList}
                    renderItem={renderItem}
                    keyExtractor={item => item.p_id}
                />
                </View>
            </View>
            <View
            style={styles.third}>
                <View
                style={styles.third_1}>
                    <Text
                    style={styles.third_1_text}>
                        등록된 프로필
                    </Text>
                </View>
                <View
                style={styles.third_2}>
                     <FlatList
                    data={state.acceptList2}
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
        flex:3,
        marginTop:'12%',
        flexDirection:'column',
        alignItems:'center'
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
        flex:1.2,
        backgroundColor:'white'
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
        flex:2,
        backgroundColor:'white',
        marginTop:'3%'
    },
    second_1:{
        marginTop:'1%',
        flexDirection:'row',
        flex:1,
        alignItems:'center'
    },
    second_1_text:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:16,
        marginLeft:'5%'
    },
    second_2:{
        flex:7,
        flexDirection:'column',
        marginTop:'3%'
    },
    third:{
        flex:3,
        backgroundColor:'white',
        marginTop:'3%',
        marginBottom:'3%'
    },
    third_1:{
        marginTop:'1%',
        flexDirection:'row',
        flex:1,
        alignItems:'center'
    },
    third_1_text:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:16,
        marginLeft:'5%'
    },
    acceptBtn:{
        marginLeft:'9%',
        backgroundColor:'#467d3a',
        opacity:0.9,
        height:'80%',
        width:'23%',
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center'
    },
    acceptBtn2:{
        marginLeft:'3%',
        backgroundColor:'gray',
        opacity:0.9,
        height:'80%',
        width:'25%',
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        fontFamily:"BM_hanna",
        color:'white',
        opacity:1,
        fontSize:15
    },
    third_2:{
        flex:7,
        flexDirection:'column'
    }
}
)
export default UserConnectScreen;