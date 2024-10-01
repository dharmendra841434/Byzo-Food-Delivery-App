import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import CustomText from '../../components/CustomText';

const AllCategories = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors?.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar barStyle="dark-content" />
      <CustomText> All Categories</CustomText>
    </View>
  );
};

export default AllCategories;
