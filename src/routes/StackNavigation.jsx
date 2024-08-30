import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/home/HomeScreen';
import MapScreen from '../screens/address/MapScreen';
import NoInternetConnection from '../screens/NoInternetConnection';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import CustomMap from '../screens/address/CustomMap';
import CheckingLocation from '../screens/address/CheckingLocation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="mapview" component={MapScreen} />
        <Stack.Screen name="checking" component={CheckingLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
