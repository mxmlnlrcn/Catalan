import * as firebase from 'firebase';
import '@firebase/auth'
import '@firebase/firestore'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AccountScreen from "./screens/AccountScreen";
import GalonScreen from "./screens/GalonScreen";
import HistorialScreen from "./screens/HistorialScreen";
import PedirScreen from "./screens/PedirScreen";
import PreguntasScreen from "./screens/PreguntasScreen";
import React from "react";
import {
  Image,
  TouchableOpacity
} from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyABJtYurpCJWQS4dvTtgEeWiBXG7_bEmog",
  authDomain: "my-project-1541978813023.firebaseapp.com",
  databaseURL: "https://my-project-1541978813023.firebaseio.com",
  projectId: "my-project-1541978813023",
  storageBucket: "my-project-1541978813023.appspot.com",
  messagingSenderId: "1048181541330",
  appId: "1:1048181541330:web:222fa0856aa190abb3600b",
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:  ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#1aa3ff",
      },
      headerTitle: () => (
        <Image
              source={require("./screens/assets/logo.png")}
              style={{ height: 60, width: 60 }}
            />
      ),
      headerRight: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
        >
          <Image
            source={require("./screens/assets/user.png")}
            style={{ height: 30, width: 30 , marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )
    })
    
  },  
  Account: {
    screen: AccountScreen,
    navigationOptions:  ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#1aa3ff",
      },
      headerTitle: () => (
        <Image
              source={require("./screens/assets/logo.png")}
              style={{ height: 60, width: 60 }}
            />
      ),
      headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./screens/assets/previous.png")}
            style={{ height: 30, width: 30 , marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )
    }),
  }, 
  Galon: {
    screen: GalonScreen,
    navigationOptions:  ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#1aa3ff",
      },
      headerTitle: () => (
        <Image
              source={require("./screens/assets/logo.png")}
              style={{ height: 60, width: 60 }}
            />
      ),
      headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./screens/assets/previous.png")}
            style={{ height: 30, width: 30 , marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )
    }),
  }, 
  Historial: {
    screen: HistorialScreen,
    navigationOptions:  ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#1aa3ff",
      },
      headerTitle: () => (
        <Image
              source={require("./screens/assets/logo.png")}
              style={{ height: 60, width: 60 }}
            />
      ),
      headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./screens/assets/previous.png")}
            style={{ height: 30, width: 30 , marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )
    }),
  }, 
  Pedir: {
    screen: PedirScreen,
    navigationOptions:  ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#1aa3ff",
      },
      headerTitle: () => (
        <Image
              source={require("./screens/assets/logo.png")}
              style={{ height: 60, width: 60 }}
            />
      ),
      headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./screens/assets/previous.png")}
            style={{ height: 30, width: 30 , marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )
    }),
  }, 
  Preguntas: {
    screen: PreguntasScreen,
    navigationOptions:  ({navigation}) => ({
      headerStyle: {
        backgroundColor: "#1aa3ff",
      },
      headerTitle: () => (
        <Image
              source={require("./screens/assets/logo.png")}
              style={{ height: 60, width: 60 }}
            />
      ),
      headerLeft: () => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("./screens/assets/previous.png")}
            style={{ height: 30, width: 30 , marginHorizontal: 10}}
          />
        </TouchableOpacity>
      )
    }),
  }, 
  });

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    },
  }, 
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false
    },
  }, 
  
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    }
  )
);
