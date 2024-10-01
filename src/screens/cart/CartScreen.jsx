import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import appColors from '../../utils/appColors';

const CartScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors?.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar barStyle="dark-content" />
      <CustomText>Cart Screen</CustomText>
    </View>
  );
};

export default CartScreen;
