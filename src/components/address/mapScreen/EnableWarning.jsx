import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import CustomText from '../../CustomText';
import CustomIcons from '../../CustomIcons';
import {AppIcons} from '../../../utils/constent';

const EnableWarning = ({handleEnableLocation, className}) => {
  return (
    <View
      className={`flex flex-row items-center justify-between px-3  pb-1  bg-red-50 ${className}`}>
      <View className="flex flex-row items-center ">
        <View>
          <CustomIcons
            icon={AppIcons?.locationOutline}
            color={appColors?.blackText}
          />
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
