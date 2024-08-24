import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const CurrentLocationMarker = () => {
  return (
    <LottieView
      source={require('../../assets/images/ripple.json')}
      autoPlay
      style={{height: 100, width: 100, marginTop: 150}}
      speed={0.5}
    />
  );
};

export default CurrentLocationMarker;
