import {View, StatusBar} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import CustomText from '../../components/CustomText';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAddressLoader, setConfirmAddress} from '../../store/mapSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import addresAnimation from '../../assets/images/animations/ddd.json';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import {
  checkIsWithinKanyakumari,
  getLocalStorageAddress,
  saveAdressOnLocalStorage,
} from '../../utils/helperfun';
import appColors from '../../utils/appColors';
import AddressAutoComplete from '../../components/address/AddressAutoComplete';
import CustomBottomSheet from '../../components/bottomsheet/CustomBottomSheet';

const CheckingLocation = () => {
  const bottomSheetRef = useRef(null);
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const loader = useSelector(state => state?.map?.addressLoader);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetRef?.current?.expand();
  };
  useFocusEffect(
    useCallback(() => {
      const checkAddressAndNavigate = async () => {
        showNavigationBar();
        const localAddress = await getLocalStorageAddress('user-address');
        if (localAddress) {
          bottomSheetRef?.current?.close();
          dispatch(setConfirmAddress(localAddress));
          dispatch(setAddressLoader(false));
          navigation.replace('home');
          return;
        }
        if (confirmAddress) {
          console.log(confirmAddress, 'going to home');
          dispatch(setConfirmAddress(fullAddress));
          saveAdressOnLocalStorage('user-address', fullAddress);
          navigation.replace('home');
        } else if (locationPermission === 'denied') {
          // console.log('Permission denied, navigating to home');
          navigation.replace('home');
        }
      };

      checkAddressAndNavigate();
    }, [fullAddress, locationPermission, confirmAddress]),
  );

  return (
    <View
      style={{backgroundColor: appColors?.background}}
      className="h-[110vh] ">
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        barStyle={false ? 'light-content' : 'dark-content'}
        translucent
      />
      <View style={{flex: 1}}>
        {loader || checkIsWithinKanyakumari(fullAddress) ? (
          <View className="mt-16 ">
            <AddressScreenLoader />
            <View className="flex items-center h-full px-3 pt-[30%]">
              <LottieView
                source={addresAnimation}
                autoPlay
                style={{height: 150, width: 250}}
                speed={0.5}
              />
              <CustomText
                className="w-[70%] text-center text-gray-400/80 text-[14px] -mt-7"
                font="medium">
                Everything you need, delivered in minutes
              </CustomText>
            </View>
          </View>
        ) : (
          <NotAllowLocation handlePresentModalPress={handlePresentModalPress} />
        )}
      </View>
      <CustomBottomSheet bottomSheetRef={bottomSheetRef}>
        <View style={{flex: 1}}>
          <View className="p-3 ">
            <CustomText font="bold" className="text-[17px] text-blackText">
              Select delivery address
            </CustomText>
          </View>
          <View className="px-3 ">
            <AddressAutoComplete setSettingModelOpen={setSettingModelOpen} />
          </View>
        </View>
      </CustomBottomSheet>
      <SettingOpenModel
        setSettingModelOpen={setSettingModelOpen}
        settingModelOpen={settingModelOpen}
      />
    </View>
  );
};

export default CheckingLocation;
