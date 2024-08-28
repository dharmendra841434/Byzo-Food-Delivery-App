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
            console.log('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            console.log('The permission is denied');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited');
            break;
          case RESULTS.GRANTED:
            dispatch(fatchUserAddress());
            setIsCheckEnabled(false);
            dispatch(setLocationPermission('granted'));
            bottomSheetModalRef.current.close();
            console.log('The permission is granted.');
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
    let timer;
    if (isCheckEnabled) {
      timer = setInterval(() => {
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
      />
      <SettingOpenModel
        setSettingModelOpen={setOpenSetting}
        settingModelOpen={openSetting}
        setIsVisible={setModalVisible}
      />
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  screen: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  container: {
    elevation: 1,
    backgroundColor: appColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderRadius: 8,
    paddingBottom: 12,
    paddingTop: 7,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.background,
    paddingBottom: '3%',
    paddingHorizontal: '3%',
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: appColors.blackText,
    marginStart: '28%',
    fontSize: 16,
    marginTop: -8,
  },
  searchBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    paddingHorizontal: '2%',
  },
  bottomSection: {
    backgroundColor: appColors.background,
  },
  errorText: {
    textAlign: 'center',
    width: '85%',
    fontSize: 15,
    color: appColors.blackText,
  },
  button: {
    backgroundColor: appColors.secondry,
    width: '90%',
    marginTop: '3%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
  },
  addresscard: {
    margin: 10,
    backgroundColor: appColors.cardBg,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.bottomSheetBg,
  },
  cardTitle: {
    color: appColors.blackText,
    fontSize: 15,
  },
  cardDesc: {
    color: appColors.blackText,
    fontSize: 12.5,
    opacity: 0.7,
  },
  notEnableTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    backgroundColor: appColors?.background,
  },
});

export default MapScreen;
