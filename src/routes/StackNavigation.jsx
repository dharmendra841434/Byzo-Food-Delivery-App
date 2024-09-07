import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MapScreen from '../screens/address/MapScreen';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import CheckingLocation from '../screens/address/CheckingLocation';
import OtpScreen from '../screens/loginScreen/OtpScreen';
import RightDrawer from './RightDrawer';
import ProfileScreen from '../screens/profile/ProfileScreen';

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
        <Stack.Screen name="home" component={RightDrawer} />
        <Stack.Screen name="mapview" component={MapScreen} />
        {/* <Stack.Screen name="test" component={ScrollTest} /> */}
        <Stack.Screen name="checking" component={CheckingLocation} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
