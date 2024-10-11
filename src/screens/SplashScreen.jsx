import {View, StatusBar, Image} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import appColors from '../utils/appColors';
import logo from '../assets/images/line.png';
import CustomText from '../components/CustomText';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {
  getLocalStorageAddress,
  getLocalStorageData,
  saveAdressOnLocalStorage,
} from '../utils/helperfun';
import {useDispatch, useSelector} from 'react-redux';
import {
  fatchUserAddress,
  setConfirmAddress,
  setfullAddress,
  setLocationPermission,
} from '../store/mapSlice';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';

const SplashScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);

  const checkPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // Adjust for iOS as needed

      const handleLocalStorageAddress = async () => {
        const savedAddress = await getLocalStorageAddress('user-address');
        if (savedAddress) {
          console.log(savedAddress, 'saved address');
          dispatch(setConfirmAddress(savedAddress));
          dispatch(setfullAddress(savedAddress));
          saveAdressOnLocalStorage('user-address', savedAddress);
          navigation.replace('home');
        } else {
          console.log('Local data expired or not found');
          await dispatch(fatchUserAddress());
          navigation.replace(result === RESULTS.GRANTED ? 'checking' : 'home');
        }
      };

      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available on this device.');
          break;

        case RESULTS.DENIED:
          console.log('Permission denied but requestable.');
          await handleLocalStorageAddress();
          break;

        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible.');
          break;

        case RESULTS.GRANTED:
          console.log('Permission granted');
          dispatch(setLocationPermission('granted'));
          await handleLocalStorageAddress();
          break;

        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore.');
          break;

        default:
          console.log('Unknown permission status:', result);
      }
    } catch (error) {
      console.log('Error checking permission:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          setTimeout(() => {
            getLocalStorageData('token').then(token => {
              if (token !== null) {
                navigation.replace('checking');
              } else {
                getLocalStorageData('skip-login').then(res => {
                  if (res === null) {
                    navigation.replace('login');
                  } else {
                    checkPermission();
                  }
                });
              }
            });
          }, 2000);
        }
      });

      hideNavigationBar();

      // Optional cleanup, in case anything needs to be cleaned up when the screen is unfocused
      return () => {
        // Cleanup logic if necessary
      };
    }, []),
  );

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
