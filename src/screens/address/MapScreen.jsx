import {StatusBar, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import appColors from '../../utils/appColors';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MapBottomSheet from '../../components/address/mapScreen/MapBottomSheet';
import {useNavigation} from '@react-navigation/native';
import {
  fatchAddressByCords,
  fatchUserAddress,
  setAddressCordinates,
  setConfirmAddress,
  setLocationPermission,
} from '../../store/mapSlice';
import Geolocation from 'react-native-geolocation-service';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import {storeLocalStorageData} from '../../utils/helperfun';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import CustomMap from './CustomMap';

const MapScreen = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  // console.log(fullAddress, 'this is full address');
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const addressCordinates = useSelector(state => state?.map?.addressCordinates);
  const addressLoader = useSelector(state => state?.map?.addressLoader);
  const [openSetting, setOpenSetting] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: addressCordinates?.latitude,
    longitude: addressCordinates?.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [isCheckEnabled, setIsCheckEnabled] = useState(
    locationPermission === 'denied' ? true : false,
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleConfirmLocation = async () => {
    storeLocalStorageData('user-address', fullAddress);
    if (isWithinKanyakumari) {
      dispatch(setConfirmAddress(fullAddress));
    }
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
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

  const onRegionChangeComplete = newRegion => {
    let cordinatesData = {
      latitude: newRegion?.latitude,
      longitude: newRegion?.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    //console.log(cordinatesData);
    setRegion(cordinatesData);
    dispatch(
      fatchAddressByCords({
        lat: newRegion?.latitude,
        long: newRegion?.longitude,
      }),
    );
  };

  useEffect(() => {
    setRegion({
      latitude: addressCordinates?.latitude,
      longitude: addressCordinates?.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, [addressCordinates]);

  const checkPermission = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) // or PERMISSIONS.IOS.LOCATION_WHEN_IN_USE for iOS
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // console.log('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            //console.log('The permission is denied on map');
            break;
          case RESULTS.LIMITED:
            // console.log('The permission is limited');
            break;
          case RESULTS.GRANTED:
            dispatch(fatchUserAddress());
            setIsCheckEnabled(false);
            dispatch(setLocationPermission('granted'));
            bottomSheetModalRef.current.close();
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
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCheckEnabled]);

  return (
    <BottomSheetModalProvider>
      <StatusBar
        backgroundColor={
          modalVisible ? appColors.backDropBg : appColors?.background
        }
        barStyle="dark-content"
      />
      <CustomMap
        mapRef={mapRef}
        isEnable={locationPermission === 'granted' ? true : false}
        loader={addressLoader}
        onRegionChangeComplete={onRegionChangeComplete}
        handleChangeAddress={handlePresentModalPress}
        handleConfirmLocation={handleConfirmLocation}
        handleEnableLocation={() => {
          setOpenSetting(true);
          setModalVisible(true);
        }}
        handleGoToCureentLocation={handleGoToCureent}
        handleSearchPress={handlePresentModalPress}
      />
      <MapBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        setModalVisible={setModalVisible}
        setSettingModelOpen={setOpenSetting}
        mapRef={mapRef}
        isEnable={locationPermission === 'granted' ? true : false}
        handleEnableLocation={() => {
          setOpenSetting(true);
          setModalVisible(true);
        }}
      />
      <SettingOpenModel
        setSettingModelOpen={setOpenSetting}
        settingModelOpen={openSetting}
        setIsVisible={setModalVisible}
      />
    </BottomSheetModalProvider>
  );
};

export default MapScreen;
