import {View, Text, PermissionsAndroid, StatusBar} from 'react-native';
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
  getLocalStorageData,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import CustomButton from '../../components/CustomButton';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import AddressFatchingLoader from '../../components/skeltonLoaders/AddressFatchingLoader';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import {showNavigationBar} from 'react-native-navigation-bar-color';

const HomeScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const [userFullAddress, setUserFullAddress] = useState('');

  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const isChecking = useSelector(state => state?.map?.isChecking);

  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const loader = useSelector(state => state?.map?.addressLoader);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handlePresentModalPress = useCallback(() => {
    dispatch(setAddressLoader(true));
    bottomSheetModalRef.current?.present();
  }, []);
  // const [isCheckEnabled, setIsCheckEnabled] = useState(
  //   locationPermission === 'denied' ? true : false,
  // );
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
            dispatch(fatchUserAddress());
            dispatch(setIsChecking(false));
            dispatch(setLocationPermission('granted'));
            bottomSheetModalRef.current.close();
            console.log('The permission is granted.');
            dispatch(setConfirmAddress(fullAddress));
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
    if (locationPermission === 'denied') {
      setSettingModelOpen(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkPermission();
      getLocalStorageData('user-address').then(result => {
        console.log(result, 'local address');
        if (result === null) {
          dispatch(setConfirmAddress(''));
        } else {
          dispatch(setAddressLoader(false));
          dispatch(setConfirmAddress(result));
          bottomSheetModalRef.current?.close();
        }
      });
      if (confirmAddress === '') {
        handlePresentModalPress();
      } else {
        console.log('nees to close');
        bottomSheetModalRef.current?.close();
      }
      return () => {
        // This code will run when the screen is unfocused
        console.log('Screen is unfocused');
      };
    }, [isChecking]),
  );

  useEffect(() => {
    let timer;
    if (isChecking) {
      timer = setInterval(() => {
        checkPermission();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isChecking]);

  useFocusEffect(
    useCallback(() => {
      if (isWithinKanyakumari) {
        dispatch(setConfirmAddress(fullAddress));
      }
      return () => {
        // This code will run when the screen is unfocused
        console.log('Screen is unfocused');
      };
    }, [fullAddress]),
  );

  // console.log(confirmAddress, 'this is confirm address');

  return (
    <BottomSheetModalProvider>
      <StatusBar
        backgroundColor={
          modalVisible ? 'rgba(0,0,0,0.7)' : appColors.background
        }
      />
      <View
        style={{
          backgroundColor: appColors.background,
          paddingHorizontal: '3%',
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
            {!isWithinKanyakumari ? (
              <View style={{height: '100%'}}>
                <NotAllowLocation
                  handlePresentModalPress={handlePresentModalPress}
                />
              </View>
            ) : (
              <View style={{height: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomText font="bold">Delivery Address is : </CustomText>
                  <CustomText style={{width: '60%'}}>
                    {splitAddressAtFirstComma(confirmAddress)}
                  </CustomText>
                </View>
                <CustomButton
                  title="Change delivery address"
                  onPress={() => bottomSheetModalRef?.current?.present()}
                />
              </View>
            )}
          </>
        )}
      </View>
      <AddressBottomSheetModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleClose={() => console.log('close')}
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
