import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import MapView from 'react-native-maps';
import { Text, View, Image, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import { blinkLogo, userImage, leftDirection } from '../../imageUrls.js';
import * as Font from "expo-font";

const AlertMapModal = ({ alertMapModalVisible, setAlertMapModalVisible, mapLatitude, mapLongitude, mapName, mapDate }) => {
  const [isFont, setIsFont] = useState(false);
  const [ second, setSecond ] = useState(null);
  const [ minute, setMinute ] = useState(null);
  const [ hour, setHour ] = useState(null);
  const [ day, setDay ] = useState(null);
  const [ month, setMonth ] = useState(null);
  const [ year, setYear ] = useState(null);
  const [ address1, setAddress1 ] = useState(null);
  const [ address2, setAddress2 ] = useState(null);
  const [ address3, setAddress3 ] = useState(null);
  useEffect(() => {
    async function fetchData(){
    await Font.loadAsync({
      "BM_hanna": require('../../assets/fonts/BMHANNAPro.ttf'),
    });
    setIsFont(true);
    // getUserInfo()
    }
    fetchData();
    mapApi();
  });
  const mapApi = async () => {
    try {
      let response = await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${mapLongitude}&y=${mapLatitude}`,
          {
            headers: {
              Authorization: 'KakaoAK a0ddfa7f55e7910acc4b93e7ce78a3ac'  
            },
          },
        )
        .then(response => {
          const location = response.data.documents[0];
          setAddress1(location.address.region_2depth_name)
          setAddress2(location.address.region_3depth_name)
          setAddress3(location.address.main_address_no)
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const date = new Date(mapDate);
		setYear(date.getFullYear());
    setMonth(date.getMonth() + 1); // 월은 0부터 시작하므로 1을 더합니다.
    setDay(date.getDate());
    setHour(date.getHours());
    setMinute(date.getMinutes());
	});

  return(
  <Modal visible={alertMapModalVisible}>
  <View style={styles.screen}>
    <View style={styles.top}>
      <TouchableOpacity
        onPress={() => setAlertMapModalVisible(false)}
        style={styles.backButton}>
            <Image
            source={leftDirection}
            style={styles.leftDirection}
            resizeMode='contain'/>
            <View style={{justifyContent:'center', marginLeft:'5%'}}>
              <Text
              style={styles.backButtonText}>알림</Text>
            </View>
        </TouchableOpacity>
    </View>
    <MapView
    style={styles.map}
    initialRegion={{
        latitude: mapLatitude,
        longitude: mapLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    provider={PROVIDER_GOOGLE}>
      <Marker
      coordinate={{
      latitude: mapLatitude,
      longitude: mapLongitude,
      }}
        pinColor="#2D63E2"
        title= {mapName}
        description={mapName}/>
    </MapView>
    <View style={styles.bottom}>
      <View style={styles.info}>
        <View
        style={styles.infoView}>
          <Text
          style={styles.infoText}>이름 : {mapName}</Text>
        </View>
        <View
        style={styles.infoView}>
          <Text
            style={styles.infoText}>위치 : {address1} {address2} {address3}</Text>
        </View>
        <View
        style={styles.infoView}>
          <Text
          style={styles.infoText}>시간 : {year}년 {month}월 {day}일 {hour}시 {minute}분</Text>
        </View>
        
      </View>
    </View>
  </View>
  </Modal>
  )
}
export default AlertMapModal;

const styles = StyleSheet.create({
	screen:{
    width:'100%',
    height:'100%',
    backgroundColor:'#d0d0d0',
    flexDirection:'column',
  },
  top:{
    flex:1,
    marginTop:'5%',
    justifyContent:'center'
  },
  backButton:{
    width:'20%',
    height:'100%',
    marginLeft:'3%',
    marginTop:'5%',
    flexDirection:'row',
  },
  leftDirection:{
    width:'30%',
    height:'100%',
    opacity:0.8
  },
  backButtonText:{
    fontFamily:"BM_hanna",
    color:'black',
    fontSize:30,
    opacity:0.8,
  },
  map:{
    flex:5,
    width: "100%",
    height : "80%"
	},
  bottom:{
    flex:2,
    alignItems:'center'
  },
  info:{
    width:'97%',
    height:'94%',
    backgroundColor:'white',
    marginTop:'6%',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  infoView:{
    width:'85%',
    height:'14%',
  },
  infoText:{
    fontFamily:"BM_hanna",
    color:'black',
    fontSize:22,
    opacity:0.8,
  }
})