import React from 'react';
import {Text} from 'react-native';
import appFonts from '../utils/appFonts';
import appColors from '../utils/appColors';

const CustomText = ({font, children, className, style, ...props}) => {
  let fontFamily;
  switch (font) {
    case 'bold':
      fontFamily = appFonts.bold;
      break;
    case 'extraBold':
      fontFamily = appFonts.extraBold;
      break;
    case 'medium':
      fontFamily = appFonts.medium;
      break;
    case 'semibold':
      fontFamily = appFonts.semiBold;
      break;
    case 'itelic':
      fontFamily = appFonts.italic;
      break;
    case 'light':
      fontFamily = appFonts.light;
      break;
    default:
      fontFamily = appFonts.regular;
  }
  return (
    <Text
      className={` ${className} `}
      style={[{fontFamily: fontFamily, color: appColors?.blackText}, style]}
      {...props}
      testID={className}>
      {children}
    </Text>
  );
};

export default CustomText;
