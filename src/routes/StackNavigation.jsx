import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MapScreen from '../screens/address/MapScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import CheckingLocation from '../screens/address/CheckingLocation';
import OtpScreen from '../screens/loginScreen/OtpScreen';
import RightDrawer from './RightDrawer';
import ProfileScreen from '../screens/profile/ProfileScreen';
import NetInfo from '@react-native-community/netinfo';
import NoInternetConnection from '../screens/NoInternetConnection';
import TestScreen from '../screens/testingScreen/TestScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const navigationRef = useRef();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        // If not connected, navigate to NoInternetScreen
        console.log('no internet go NoInternet');
        navigationRef.current?.navigate('NoInternet');
      } else {
        //navigationRef.current?.goBack();
        // Optional: Handle if the user regains connection
        //console.log('yes internet go home');
        //navigationRef.current?.navigate('checking');
      }
    });
    return () => {
      unsubscribe(); // Clean up the listener on unmount
    };
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash">
        <Stack.Screen
          name="splash"
          options={{
            animation: 'none',
          }}
          component={SplashScreen}
        />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={RightDrawer} />
        <Stack.Screen name="mapview" component={MapScreen} />
        <Stack.Screen name="test" component={TestScreen} />
        <Stack.Screen name="checking" component={CheckingLocation} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="NoInternet" component={NoInternetConnection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
