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
  const geolocationErrorMessage = useSelector(
    state => state?.map?.geolocationErrorMessage,
  );

  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const addressLoader = useSelector(state => state?.map?.addressLoader);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handlePresentModalPress = useCallback(() => {
    dispatch(setAddressLoader(true));
    bottomSheetModalRef.current?.present();
  }, []);
  const [isCheckEnabled, setIsCheckEnabled] = useState(
    locationPermission === 'denied' ? true : false,
  );

  const enableLocation = async () => {
    if (locationPermission === 'denied') {
      setSettingModelOpen(true);
    }
  };

  useEffect(() => {
    if (userFullAddress === '') {
      handlePresentModalPress();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [userFullAddress]);

  const checkPermission = async () => {
    dispatch(setAddressLoader(true));
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

  useEffect(() => {
    getLocalStorageData('user-address').then(result => {
      if (result === null) {
        setUserFullAddress(fullAddress);
      } else {
        setUserFullAddress(result);
      }
    });
  }, [fullAddress]);

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
                    {splitAddressAtFirstComma(fullAddress)}
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
          setIsCheckEnabled(false);
        }}
      />
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
