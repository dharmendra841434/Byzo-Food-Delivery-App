import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CartScreen} from '../screens';

const Cart_Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Cart_Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Cart_Stack.Screen name="category" component={CartScreen} />
    </Cart_Stack.Navigator>
  );
};

export default CartStack;
