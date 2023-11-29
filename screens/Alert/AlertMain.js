import { useState, useContext, useEffect  } from 'react';
import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList  } from 'react-native';
import { blinkLogo, userImage, leftDirection, appStart } from '../../imageUrls.js';
import * as Font from "expo-font";
import { AuthContext } from '../../contexts/Auth.jsx';
import AlertMapModal from './AlertMapModal.js'

const AlertMainScreen = ({ navigation }) => {
    const { state } = useContext(AuthContext);
    const { getAlertLog } = useContext(AuthContext);
    const [ isFont, setIsFont ] = useState(false);
    const [ alertMapModalVisible, setAlertMapModalVisible ] = useState(false);
    const [ mapLatitude, setMapLatitude ] = useState(null);
    const [ mapLongitude, setMapLongitude ] = useState(null);
    const [ mapName, setMapName ] = useState(null);
    const [ mapDate, setMapDate ] = useState(null);
    const [ newList, setNewList ] = useState(null);
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
    const mapModal = ( longitude, latitude, name, date ) => {
        setAlertMapModalVisible(true)
        setMapLongitude(longitude)
        setMapLatitude(latitude)
        setMapName(name);
        setMapDate(date);
    }
    useEffect(() => {
        console.log("aaa")
        if(state.isLoggedIn && state.userInfo == "보호자"){
            token = state.userToken
            getAlertLog({ token })
        }
    },[]);
    const detailDate = (a) => {
		const milliSeconds = new Date() - a;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
	};
    const renderItem = ({ item }) => (
        <View
        style={{height:80, width:'100%',alignItems:'center', flexDirection:'row', marginLeft:'5%'}}>
            <TouchableOpacity
            onPress={()=> mapModal( item.longitude, item.latitude, item.name, item.date )}>
                <View
                style={{flexDirection:'row'}}>
                    <Image
                    source={appStart}
                    style={styles.alertLogImage}
                    resizeMode='contain'/>
                    {item.type == 1 && 
                    <Text
                    style={styles.alertLogTopText}>앱 실행</Text>}
                    <Text
                    style={styles.alertLogTopText2}>{detailDate(item.date)}</Text>
                </View>
                {item.type == 1 && <Text
                style={styles.alertLogCenterText}>{item.name}님이 앱을 실행했습니다.</Text>}
                <Text
                style={styles.alertLogBottomText}>위치 보기</Text>
            </TouchableOpacity>
        </View>
    );   
    return (
        <View
        style={styles.container}>
            <AlertMapModal alertMapModalVisible={alertMapModalVisible} setAlertMapModalVisible={setAlertMapModalVisible} mapLongitude={mapLongitude} mapLatitude={mapLatitude} mapName={mapName} mapDate={mapDate}/>
            <View
            style={styles.first}>
                <View style={{width:'100%', height:'60%', flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('홈')}
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
            </View>
            <View
            style={styles.second}>
                <View
                style={styles.alertTextView}>
                    {isFont && (<Text
                    style={styles.alertText}>알림</Text>)}
                </View>
                <View
                style={styles.alertLine}>
                </View>
                <View
                style={styles.alertList}>
                    {state.alertList && <FlatList
                    data={state.alertList.sort((a, b) => b.date - a.date)}
                    renderItem={renderItem}
                    keyExtractor={item => item.date}/>}
                </View>
            </View>
        </View>
    )
}

export default AlertMainScreen;

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor:'#d0d0d0'
    },
    first:{
        flex:1,
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
    login:{
        marginLeft:'60%',
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
    second:{
        flex:10,
        marginBottom:'7%',
        backgroundColor:'white',
        alignItems:'center'
    },
    alertTextView:{
        flex:1,
        width:'85%',
        justifyContent:'center'
    },
    alertText:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:40,
    },
    alertLine:{
        flex:0.02,
        width:'85%',
        backgroundColor:'#d0d0d0'
    },
    alertList:{
        flexDirection:'column',
        flex:6,
        width:'100%'
    },
    alertLogImage:{
        marginLeft:'4%', 
        height:'100%', 
        width:'6%'
    },
    alertLogTopText:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.6,
        fontSize:13,
    },
    alertLogTopText2:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.6,
        fontSize:13,
        marginLeft:'63%'
    },
    alertLogCenterText:{
        fontFamily:"BM_hanna",
        color:'black',
        opacity:0.8,
        fontSize:18,
        marginLeft:'6%',
        marginTop:'2%'
    },
    alertLogBottomText:{
        fontFamily:"BM_hanna",
        color:'#467d3a',
        opacity:0.8,
        fontSize:13,
        marginLeft:'6%',
        marginTop:'2%'
    }
})