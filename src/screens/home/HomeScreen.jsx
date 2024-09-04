import {View, StatusBar, BackHandler} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AddressBottomSheetModal from '../../components/address/AddressBottomSheetModal';
import appColors from '../../utils/appColors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fatchUserAddress,
  setAddressLoader,
  setConfirmAddress,
  setIsChecking,
  setLocationPermission,
} from '../../store/mapSlice';
import CustomText from '../../components/CustomText';
import {
  checkIsWithinKanyakumari,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import {showNavigationBar} from 'react-native-navigation-bar-color';

import HomeTest from './HomeTest';

const HomeScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const isChecking = useSelector(state => state?.map?.isChecking);
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const loader = useSelector(state => state?.map?.addressLoader);
  const navigation = useNavigation();
  const handlePresentModalPress = useCallback(() => {
    dispatch(setAddressLoader(true));
    bottomSheetModalRef.current?.present();
  }, []);
  const checkPermission = async () => {
    if (!confirmAddress) {
      dispatch(setAddressLoader(true));
    }
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) // or PERMISSIONS.IOS.LOCATION_WHEN_IN_USE for iOS
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
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
            dispatch(setLocationPermission('granted'));
            bottomSheetModalRef.current.close();
            dispatch(setIsChecking(false));
            console.log(confirmAddress, 'confirmAddress');
            if (!confirmAddress) {
              dispatch(fatchUserAddress());
              dispatch(setConfirmAddress(fullAddress));
            }
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

  const enableLocation = async () => {
    console.log('enable click');

    if (locationPermission === 'denied') {
      setSettingModelOpen(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isChecking) {
      timer = setInterval(() => {
        checkPermission();
      }, 1000);
    }
    if (isChecking && !confirmAddress) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
    return () => clearInterval(timer);
  }, [isChecking]);

  useFocusEffect(
    useCallback(() => {
      showNavigationBar();
      console.log(confirmAddress, 'home confirmAddress');
      if (confirmAddress) {
        bottomSheetModalRef.current.close();
        dispatch(setAddressLoader(false));
      } else {
        console.log(loader, 'home loader');
        dispatch(setAddressLoader(true));
      }
    }, [confirmAddress, loader]), // Include checkPermission in the dependencies array if it's defined outside of this effect
  );

  //console.log(isWithinKanyakumari, 'isWithinKanyakumari');

  useEffect(() => {
    const backAction = () => {
      bottomSheetModalRef?.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <BottomSheetModalProvider>
      <StatusBar
        backgroundColor={
          modalVisible ? 'rgba(0,0,0,0.7)' : appColors.topSectionBg
        }
      />
      <View
        style={{
          backgroundColor: appColors.background,
        }}>
        {loader ? (
          <View style={{height: '100%'}}>
            <CustomText font="bold" style={{fontSize: 20}}>
              Waiting for location...
            </CustomText>
            <View style={{marginTop: '5%'}}>
              <AddressScreenLoader />
            </View>
          </View>
        ) : (
          <>
            {!checkIsWithinKanyakumari(confirmAddress) ? (
              <View style={{height: '100%'}}>
                <NotAllowLocation
                  handlePresentModalPress={handlePresentModalPress}
                />
              </View>
            ) : (
              <View style={{height: '100%'}}>
                <HomeTest
                  address={splitAddressAtFirstComma(confirmAddress)}
                  sheetRef={bottomSheetModalRef}
                />
              </View>
            )}
          </>
        )}
      </View>
      <AddressBottomSheetModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleClose={() => bottomSheetModalRef?.current?.close()}
        setModalVisible={setModalVisible}
        keyboardVisible={keyboardVisible}
        handleEnableLocation={enableLocation}
        settingModelOpen={settingModelOpen}
        setSettingModelOpen={setSettingModelOpen}
        handleSelectAddress={() => {
          dispatch(setIsChecking(false));
        }}
      />
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
