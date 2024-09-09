import {View, Modal, TouchableOpacity, Platform, Linking} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';

const SettingOpenModel = ({
  setSettingModelOpen,
  settingModelOpen,
  setIsVisible,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={settingModelOpen}
      onRequestClose={() => {
        setSettingModelOpen(!settingModelOpen);
      }}>
      <View
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        className="relative flex flex-row items-center justify-center w-screen h-screen ">
        <View className="w-[85%] bg-white rounded-lg   ">
          <View className="flex flex-col items-center p-5 ">
            <CustomText className="text-[17px]  text-blackText " font="medium">
              Location permission denied
            </CustomText>
            <CustomText className="mt-1 text-blackText/70">
              You have denied the location permission. Please enable it from the
              'Settings' section of your phone
            </CustomText>
          </View>
          <View className="flex flex-row w-full border-t border-t-gray-300">
            <View className="w-1/2 border-r border-r-gray-300">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setSettingModelOpen(false);
                  setIsVisible(false);
                }}
                className="flex flex-col items-center w-full py-3 ">
                <CustomText className=" text-blackText" font="medium">
                  Cancel
                </CustomText>
              </TouchableOpacity>
            </View>
            <View className="w-1/2 ">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:');
                  } else {
                    // Linking.openURL('android.settings.SETTINGS').catch(() => {
                    //   Alert.alert('Unable to open settings');
                    // });
                    Linking.openSettings();
                    setSettingModelOpen(false);
                  }
                }}
                className="flex flex-col items-center w-full py-3">
                <CustomText className=" text-secondry" font="medium">
                  Go to settings
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SettingOpenModel;
