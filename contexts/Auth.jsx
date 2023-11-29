import * as SecureStore from "expo-secure-store";
import { useMemo, useEffect, useReducer, createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [location, setLocation] = useState();
  const url = "http://192.168.0.100:7877";
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const geoLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const latitude = JSON.stringify(position.coords.latitude);
  //       const longitude = JSON.stringify(position.coords.longitude);
  //       setLatitude(latitude);
  //       setLongitude(longitude);
  //     },
  //     err => {
  //       console.log(err.code, err.message)
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   )
  // }
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isLoggedIn: true,
            userToken: action.token,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignUp : true,
          };
        case "SIGN_UP_CANCEL":
          return {
            ...prevState,
            isSignUp : false
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoggedIn: false,
            userToken: null,
            userName: null,
            userInfo: null
          };
        case "GET_USER_INFO":
          return {
            ...prevState,
            userName: action.name,
            userInfo: action.info
          };
        case "SET_ACCEPT_LIST":
          return {
            ...prevState,
            acceptList: action.list
          };
        case "SET_ACCEPT_LIST2":
          return {
            ...prevState,
            acceptList2: action.list
          };
        case "SET_ACCEPT_LIST3":
          return {
            ...prevState,
            acceptList3: action.list
          };
        case "SET_ALERT_LIST":
          return {
            ...prevState,
            alertList: action.list
          }
    }
    },
    {
      isSignUp: false,
      isLoading: true,
      isLoggedIn: false,
      userToken: null,
      userName: null,
      userInfo: null,
      acceptList: null, //사용자에게 보낸 보호자 요청 리스트
      acceptList2: null, //사용자가 수락한 보호자 리스트
      acceptList3: null,
      alertList: null
    }
  );
  const signIn = async (data)=>{
    const signin_info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/signin", signin_info)
      .then((response) => response.json())
      .then(async (response) => {
        if (response.result === "success") {
          await AsyncStorage.setItem('userToken', response.token);
          dispatch({ type: "SIGN_IN", token: response.token });
          alert(response.message)
        } else alert(response.error);
      });
  }

  const signIn2 = async (data)=>{
    dispatch({ type: "SIGN_IN", token: data });
  }

  const signOut = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await AsyncStorage.removeItem('userToken');
    dispatch({ type: "SIGN_OUT" });
  }
  const signUp = async (data) => {
    const { id, pw, pw2, name, sex, userInfo } = data;
      const signup_info = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      let result;
      fetch(url + "/signup", signup_info)
        .then((response) => response.json())
        .then((response) => {
          if (response.result === "success") {
            console.log(response)
            dispatch({ type: "SIGN_UP"});
            alert(response.message)
          }
          if (response.result === "fail") {
            alert(response.error)
          }
        });
  }
  const getUserInfo = async ( data ) => {
    const user_info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/userInfo", user_info)
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "success") {
          dispatch({ type: "GET_USER_INFO", name: response.user_name, info: response.user_info})
        }
        if (response.result === "fail") {
          alert(response.error)
        }
      })
  };
  const setUserConnect = async ( data ) => {
    const info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/userConnect", info)
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        alert(response.message)
      }
      if (response.result === "fail") {
        alert(response.error)
      }
    });
  }
  const getUserConnect = async ( data ) => {
    const info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/userConnect2", info)
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        dispatch({ type: "SET_ACCEPT_LIST3", list:response.list})
      }
      if (response.result === "fail") {
        alert(response.error)
      }
    });
  }
  const getProtectorConnect = async ( data ) => {
    const info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/protectorConnect", info)
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        dispatch({ type: "SET_ACCEPT_LIST", list:response.list})
      }
      if (response.result === "fail") {
        alert(response.error)
      }
    });
  }
  const getProtectorConnect2 = async ( data ) => {
    const info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/protectorConnect2", info)
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        dispatch({ type: "SET_ACCEPT_LIST2", list:response.list})
      }
      if (response.result === "fail") {
        alert(response.error)
      }
    });
  }

  const acceptBtn = async ( data ) => {
    const info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/acceptBtn", info)
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        dispatch({ type: "SET_ACCEPT_LIST", list:response.list})
      }
      if (response.result === "fail") {
        alert(response.error)
      }
    });
  }
  const deleteBtn = async ( data ) => {
    const info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/deleteBtn", info)
    .then((response) => response.json())
    .then((response) => {
      if (response.result === "success") {
        dispatch({ type: "SET_ACCEPT_LIST", list:response.list})
      }
      if (response.result === "fail") {
        alert(response.error)
      }
    });
  }

  const signUpCancel = () => {
    dispatch({ type: "SIGN_UP_CANCEL"})
  }

  const getLocation1 = async( token ) => {
    const date0 = new Date()
    const date = date0.getTime()
    let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
      const info = {
      method: "POST",
      body: JSON.stringify({token, location, date}),
      headers: {
        "Content-Type": "application/json",
      },
      };
      fetch(url + "/getLocation1", info)
  }

  const getAlertLog = async( token ) => {
      const info = {
      method: "POST",
      body: JSON.stringify(token),
      headers: {
        "Content-Type": "application/json",
      },
      };
      fetch(url + "/getAlertLog", info)
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "success") {
          dispatch({ type: "SET_ALERT_LIST", list:response.list})
        }
      })
    }
  return (
    <AuthContext.Provider value={{ url, signIn, signIn2, signOut, signUp, getUserInfo, signUpCancel, setUserConnect, getUserConnect, getProtectorConnect, getProtectorConnect2, acceptBtn, deleteBtn, getLocation1, getAlertLog, state}}>
      {children}
    </AuthContext.Provider>
  )

}

export { AuthContext, AuthProvider };

