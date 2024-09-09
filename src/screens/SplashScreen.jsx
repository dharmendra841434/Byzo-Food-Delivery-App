import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import appColors from '../utils/appColors';
import logo from '../assets/images/line.png';
import CustomText from '../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {getLocalStorageData, storeLocalStorageData} from '../utils/helperfun';
import {useDispatch, useSelector} from 'react-redux';
import {
  setConfirmAddress,
  setfullAddress,
  setLocationPermission,
} from '../store/mapSlice';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const SplashScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);

  const checkPermission = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) // or PERMISSIONS.IOS.LOCATION_WHEN_IN_USE for iOS
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            navigation.replace('home');
            // handleDenied();
            console.log(
              'The permission has not been requested / is denied but requestable.',
            );
            break;
          case RESULTS.LIMITED:
            console.log(
              'The permission is limited: some actions are possible.',
            );
            break;
          case RESULTS.GRANTED:
            console.log('permission granted');
            dispatch(setLocationPermission('granted'));
            // dispatch(fatchUserAddress());
            getLocalStorageData('user-address').then(result => {
              if (result !== null) {
                console.log(result, 'saved address');
                dispatch(setConfirmAddress(result));
                dispatch(setfullAddress(result));
                navigation.replace('home');
              } else {
                console.log('local data not found');
                navigation.replace('checking');
              }
            });

            break;
          case RESULTS.BLOCKED:
            console.log(
              'The permission is denied and not requestable anymore.',
            );
            break;
        }
      })
      .catch(error => {
        console.log('Error checking permission:', error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getLocalStorageData('token').then(token => {
        if (token !== null) {
          //console.log(token);
          navigation.replace('checking');
        } else {
          getLocalStorageData('skip-login').then(res => {
            if (res === null) {
              navigation.replace('login');
            } else {
              //console.log('going to home');
              checkPermission();
            }
          });
        }
      });
    }, 2000);
    hideNavigationBar();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('test');
  //   }, 2000);
  //   hideNavigationBar();
  // }, []);

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
