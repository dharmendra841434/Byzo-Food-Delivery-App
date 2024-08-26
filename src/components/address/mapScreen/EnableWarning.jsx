import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import CustomText from '../../CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const EnableWarning = ({handleEnableLocation}) => {
  return (
    <View className="flex flex-row items-center justify-between p-2 m-2 bg-white rounded-md ">
      <View className="flex flex-row ">
        <View>
          <Icon name="location-outline" size={40} color={appColors.blackText} />
          <View className="absolute w-12 h-1 mt-5 -rotate-45 bg-red-600 border border-white " />
        </View>
        <View className="ml-2 ">
          <CustomText font="bold" className="text-sm text-blackText">
            Device location not enabled
          </CustomText>
          <CustomText className=" text-[12px] text-blackText">
            Enable for a bettter delivery
          </CustomText>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleEnableLocation}
        className="px-6 pb-1.5 pt-0.5 rounded-lg bg-secondry h-fit">
        <CustomText className="text-white ">Enable</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default EnableWarning;
