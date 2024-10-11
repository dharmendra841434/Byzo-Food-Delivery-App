import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import BottomNavigation from './BottomNavigation';
import {
  CheckingLocation,
  LoginScreen,
  MapScreen,
  NoInternetConnection,
  OtpScreen,
  ProfileScreen,
  SplashScreen,
  TestScreen,
} from '../screens';

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
          animation: 'fade',
          animationDuration: 200,
        }}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={BottomNavigation} />
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
