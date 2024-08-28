import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const CurrentLocationMarker = () => {
  return (
    <View className=" h-fit">
      <LottieView
        source={require('../../assets/images/ripple.json')}
        autoPlay
        style={{height: 50, width: 50, marginTop: 160}}
        speed={0.5}
      />
    </View>
  );
};

export default CurrentLocationMarker;
