import * as SecureStore from "expo-secure-store";
import { useMemo, useEffect, useReducer, createContext} from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const url = "http://172.20.10.2:7878";

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
          }
      }
    },
    {
      isSignUp: false,
      isLoading: true,
      isLoggedIn: false,
      userToken: null,
      userName: null,
      userInfo: null
    }
  );

  const signIn = async (data)=>{
    const { id, pw } = data;
    const signin_info = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url + "/signin", signin_info)
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "success") {
          SecureStore.setItemAsync("userToken", response.token);
          dispatch({ type: "SIGN_IN", token: response.token });
          alert(response.message)
        } else alert(response.error);
      });
  }
  const signOut = async () => {
    await SecureStore.deleteItemAsync("userToken");
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
  const signUpCancel = () => {
    dispatch({ type: "SIGN_UP_CANCEL"})
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp, getUserInfo, signUpCancel, state}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };

