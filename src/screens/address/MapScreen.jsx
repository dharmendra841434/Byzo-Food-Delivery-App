import {StatusBar, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import appColors from '../../utils/appColors';
import MapBottomSheet from '../../components/address/mapScreen/MapBottomSheet';
import {useNavigation} from '@react-navigation/native';
import {
  fatchAddressByCords,
  fatchUserAddress,
  setAddressCordinates,
  setAddressLoader,
  setConfirmAddress,
  setIsChecking,
  setLocationPermission,
} from '../../store/mapSlice';
import Geolocation from '@react-native-community/geolocation';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import {fixedZoomLevel, saveAdressOnLocalStorage} from '../../utils/helperfun';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomMap from './CustomMap';

const MapScreen = () => {
  const bottomSheetRef = useRef(null);
  const inputRef = useRef(null);
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  // console.log(fullAddress, 'this is full address');
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const addressLoader = useSelector(state => state?.map?.addressLoader);
  const [openSetting, setOpenSetting] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckEnabled, setIsCheckEnabled] = useState(
    locationPermission === 'denied' ? true : false,
  );
  const handlePresentModalPress = useCallback(() => {
    console.log('focus');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus(); // Focus on the TextInput after the BottomSheet opens
      }
    }, 300);
    bottomSheetRef?.current?.expand();
  }, []);

  const handleConfirmLocation = async () => {
    saveAdressOnLocalStorage('user-address', fullAddress);
    dispatch(setIsChecking(locationPermission === 'denied' ? true : false));
    dispatch(setConfirmAddress(fullAddress));
    navigation.navigate('home');
    setIsCheckEnabled(false);
  };

  const handleGoToCureent = () => {
    Geolocation.getCurrentPosition(
      position => {
        //console.log(position);
        dispatch(setAddressCordinates(position?.coords));
        dispatch(
          fatchAddressByCords({
            lat: position?.coords?.latitude,
            long: position?.coords?.longitude,
          }),
        );
        mapRef?.current?.animateToRegion(
          {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            ...fixedZoomLevel,
          },
          2000,
        );
      },
      error => {
        setOpenSetting(true);
        console.log(error.code, error.message, 'this is error');
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  const checkPermission = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) // or PERMISSIONS.IOS.LOCATION_WHEN_IN_USE for iOS
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // console.log('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            console.log('Checking on Map Screen for permission');
            break;
          case RESULTS.LIMITED:
            // console.log('The permission is limited');
            break;
          case RESULTS.GRANTED:
            dispatch(fatchUserAddress());
            setIsCheckEnabled(false);
            dispatch(setLocationPermission('granted'));
            bottomSheetRef?.current?.close();
            setModalVisible(false);
            // console.log('The permission is granted.');
            break;
          case RESULTS.BLOCKED:
            // console.log(
            //   'The permission is denied and not requestable anymore.',
            // );
            break;
        }
      })
      .catch(error => {
        console.log('Error checking permission:', error);
      });
  };

  useEffect(() => {
    let timer;
    if (isCheckEnabled) {
      timer = setInterval(() => {
        // console.log('map checked');
        checkPermission();
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isCheckEnabled]);

  useEffect(() => {
    bottomSheetRef?.current?.close();
    dispatch(setAddressLoader(false));
  }, []);

  return (
    <View
      style={{backgroundColor: appColors?.background}}
      className="h-[110vh] ">
      <StatusBar
        backgroundColor={
          !modalVisible ? 'rgba(0,0,0,0)' : appColors?.statuBarColor
        }
        barStyle={false ? 'light-content' : 'dark-content'}
        translucent={true}
      />

      <CustomMap
        mapRef={mapRef}
        isEnable={locationPermission === 'granted' ? true : false}
        loader={addressLoader}
        handleChangeAddress={handlePresentModalPress}
        handleConfirmLocation={handleConfirmLocation}
        handleEnableLocation={() => {
          setOpenSetting(true);
          setModalVisible(true);
        }}
        handleGoToCureentLocation={handleGoToCureent}
      />
      <MapBottomSheet
        bottomSheetRef={bottomSheetRef}
        setModalVisible={setModalVisible}
        setSettingModelOpen={setOpenSetting}
        mapRef={mapRef}
        isEnable={locationPermission === 'granted' ? true : false}
        handleEnableLocation={() => {
          setOpenSetting(true);
          setModalVisible(true);
        }}
        inputRef={inputRef}
      />

      <SettingOpenModel
        setSettingModelOpen={setOpenSetting}
        settingModelOpen={openSetting}
        setIsVisible={setModalVisible}
      />
    </View>
  );
};

export default MapScreen;
