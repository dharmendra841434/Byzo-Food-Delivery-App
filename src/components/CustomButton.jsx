import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import appColors from '../utils/appColors';

const CustomButton = ({onPress, style, title = 'Button', disabled}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={{
        ...styles.button,
        ...style,
        ...{
          backgroundColor: disabled ? appColors?.disable : appColors?.secondry,
        },
      }}>
      <CustomText
        font="semibold"
        style={{color: appColors.background, fontSize: 16}}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.secondry,
    width: '90%',
    marginTop: '3%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default CustomButton;
