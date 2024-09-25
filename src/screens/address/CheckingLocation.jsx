import {View, StatusBar, StyleSheet} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import CustomText from '../../components/CustomText';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fatchUserAddress,
  setAddressLoader,
  setConfirmAddress,
  setSearchInput,
  setSuggestedAddress,
} from '../../store/mapSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import addresAnimation from '../../assets/images/animations/ddd.json';
import changeNavigationBarColor, {
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import {
  checkIsWithinKanyakumari,
  getLocalStorageAddress,
  saveAdressOnLocalStorage,
} from '../../utils/helperfun';
import CustomBottomSheet2 from '../../components/bottomsheet/CustomBottomSheet2';
import appColors from '../../utils/appColors';

const CheckingLocation = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const loader = useSelector(state => state?.map?.addressLoader);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // ref
  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
    setIsModalOpen(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkAddressAndNavigate = async () => {
        showNavigationBar();
        const localAddress = await getLocalStorageAddress('user-address');
        if (localAddress) {
          console.log('Address found in local storage');
          bottomSheetModalRef?.current?.close();
          dispatch(setConfirmAddress(localAddress));
          dispatch(setAddressLoader(false));
          navigation.replace('home');
          return;
        }

        if (confirmAddress) {
          if (checkIsWithinKanyakumari(fullAddress)) {
            console.log('Address is within Kanyakumari, navigating to home');
            dispatch(setConfirmAddress(fullAddress));
            saveAdressOnLocalStorage('user-address', fullAddress);
            navigation.replace('home');
          }
        } else {
          if (locationPermission === 'denied') {
            console.log('Permission denied, navigating to home');
            navigation.replace('home');
          } else {
            console.log('Fetching address...');
            await dispatch(fatchUserAddress());
          }
        }
      };

      checkAddressAndNavigate();
    }, [fullAddress, locationPermission]),
  );

  return (
    <View
      style={{backgroundColor: appColors?.background}}
      className="h-[110vh] ">
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        barStyle={isModalOpen ? 'light-content' : 'dark-content'}
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
      <CustomBottomSheet2
        setModalState={setIsModalOpen}
        bottomSheetRef={bottomSheetModalRef}
      />
      <SettingOpenModel
        setSettingModelOpen={setSettingModelOpen}
        settingModelOpen={settingModelOpen}
      />
    </View>
  );
};

export default CheckingLocation;
