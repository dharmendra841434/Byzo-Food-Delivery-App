import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import RippleEffect from '../../assets/images/animations/ripple.json';

const CurrentLocationMarker = () => {
  return (
    <View className=" h-fit">
      <LottieView
        source={RippleEffect}
        autoPlay
        style={{height: 50, width: 50, marginTop: 160}}
        speed={0.5}
      />
    </View>
  );
};

export default CurrentLocationMarker;
