import {Image} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';

const CustomIcons = ({icon, size = 20, color = appColors.secondry}) => {
  return (
    <Image
      source={icon}
      style={{width: size, height: size}}
      tintColor={color}
    />
  );
};

export default CustomIcons;
