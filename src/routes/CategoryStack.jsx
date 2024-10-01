import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AllCategories} from '../screens';

const Category_Stack = createNativeStackNavigator();

const CategoryStack = () => {
  return (
    <Category_Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Category_Stack.Screen name="category" component={AllCategories} />
    </Category_Stack.Navigator>
  );
};

export default CategoryStack;
