import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import appColors from '../utils/appColors';
import logo from '../assets/images/line.png';
import CustomText from '../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {hideNavigationBar} from 'react-native-navigation-bar-color';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      console.log('login ');
      navigation.replace('login');
    }, 2000);
    hideNavigationBar();
  }, []);

  return (
    <View
      style={{flex: 1}}
      className="flex items-center justify-center h-screen bg-primary">
      <StatusBar backgroundColor={appColors.primary} barStyle="dark-content" />
      <View className="flex flex-row items-center ">
        <CustomText className="text-6xl text-blackText" font="extraBold">
          B
        </CustomText>
        <CustomText className="text-6xl text-secondry" font="extraBold">
          yzo
        </CustomText>
      </View>
      <CustomText className="text-lg text-blackText" font="bold">
        India's Last Minute App
      </CustomText>

      <Image source={logo} className="w-full h-5 " />
      <CustomText font="extraBold" className=" text-blackText text-[12px] mt-5">
        A ZOMATO COMPANY
      </CustomText>
    </View>
  );
};

export default SplashScreen;
