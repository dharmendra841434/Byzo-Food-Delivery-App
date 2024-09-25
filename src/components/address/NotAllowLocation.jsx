import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';

const NotAllowLocation = ({handlePresentModalPress}) => {
  return (
    <View className="flex items-center justify-center flex-1 h-full ">
      <Image
        source={require('../../assets/images/location_not_found.png')}
        className="w-40 h-40 "
      />
      <CustomText
        font="medium"
        className="text-xl text-blackText w-[70%] text-center mt-5 ">
        Sorry we don't deliver at your location
      </CustomText>
      <CustomText className="my-2 text-gray-500 ">
        we will be there soon - hang on tight
      </CustomText>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePresentModalPress}
        className="px-3 pt-1 pb-2 mt-4 rounded-lg bg-secondry">
        <CustomText className="text-[13px] text-white ">
          Manually Select Your Location{' '}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default NotAllowLocation;
