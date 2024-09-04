import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

const Home_Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Home_Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Home_Stack.Screen name="main" component={HomeScreen} />
    </Home_Stack.Navigator>
  );
};

export default HomeStack;
