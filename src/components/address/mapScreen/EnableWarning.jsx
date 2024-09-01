import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import CustomText from '../../CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const EnableWarning = ({handleEnableLocation, className}) => {
  return (
    <View
      className={`flex flex-row items-center justify-between px-3  pb-1  bg-red-50 ${className}`}>
      <View className="flex flex-row ">
        <View>
          <Icon name="location-outline" size={28} color={appColors.blackText} />
          <View className="absolute w-8 h-1 mt-3 -mr-3 -rotate-45 bg-red-600 border border-white " />
        </View>
        <View className="ml-2 ">
          <CustomText font="bold" className="text-[12px] text-blackText">
            Location permission is off
          </CustomText>
          <CustomText className="text-[10px] text-blackText/70">
            Enable for a bettter delivery
          </CustomText>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleEnableLocation}
        className="px-3 pb-1.5 pt-0.5 rounded-lg bg-secondry h-fit">
        <CustomText className="text-[10px] text-white ">Enable</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default EnableWarning;
