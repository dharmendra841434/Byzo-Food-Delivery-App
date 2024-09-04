import React from 'react';
import Svg, {Path} from 'react-native-svg';
import CustomText from '../../CustomText';
import {View} from 'react-native';
import appColors from '../../../utils/appColors';

const Wave = ({width, height, color}) => {
  return (
    <View style={{width: '100%'}}>
      <Svg
        height={height}
        width={width}
        viewBox="0 0 1440 320"
        style={{zIndex: 50}}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fill={color}
          d="M0,320 L40,260 L80,320 L120,260 L160,320 L200,260 L240,320 L280,260 L320,320 L360,260 L400,320 L440,260 L480,320 L520,260 L560,320 L600,260 L640,320 L680,260 L720,320 L760,260 L800,320 L840,260 L880,320 L920,260 L960,320 L1000,260 L1040,320 L1080,260 L1120,320 L1160,260 L1200,320 L1240,260 L1280,320 L1320,260 L1360,320 L1400,260 L1440,320 V0 H0 Z"
        />
      </Svg>
      <View style={{backgroundColor: appColors.secondry, position: 'absolute'}}>
        <CustomText>ajsgfuasgfusd</CustomText>
      </View>
    </View>
  );
};

export default Wave;
