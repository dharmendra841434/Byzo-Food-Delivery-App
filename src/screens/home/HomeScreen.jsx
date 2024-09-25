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
  getLocalStorageAddress,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import Home from './Home';
import CustomBottomSheet2 from '../../components/bottomsheet/CustomBottomSheet2';
const HomeScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const isChecking = useSelector(state => state?.map?.isChecking);
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const loader = useSelector(state => state?.map?.addressLoader);

  const [loading, setLoading] = useState(false);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
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
            console.log('Checking on Home Screen for permission');
            break;
          case RESULTS.LIMITED:
            console.log(
              'The permission is limited: some actions are possible.',
            );
            break;
          case RESULTS.GRANTED:
            setLoading(true);
            dispatch(setLocationPermission('granted'));
            dispatch(setIsChecking(false));
            // console.log(confirmAddress, 'confirmAddress');
            if (!confirmAddress) {
              dispatch(fatchUserAddress());
              dispatch(setConfirmAddress(fullAddress));
            }
            setTimeout(() => {
              setLoading(false);
              console.log('The permission is granted.');
              bottomSheetModalRef.current.close();
            }, 2000);

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
    // console.log('enable click');

    if (locationPermission === 'denied') {
      setSettingModelOpen(true);
    }
  };

  useEffect(() => {
    let timer;

    if (isChecking) {
      // Set an interval to check permission every second
      timer = setInterval(() => {
        checkPermission();
      }, 1000);

      // Handle modal state based on the presence of confirmAddress
      if (!confirmAddress) {
        console.log('present modal call');
        bottomSheetModalRef.current?.expand();
      } else {
        console.log('close called');
        bottomSheetModalRef.current?.close();
      }
    }

    // Clean up the interval on component unmount or when isChecking changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isChecking, confirmAddress]);

  useFocusEffect(
    useCallback(() => {
      const handleAddressCheck = async () => {
        console.log(checkIsWithinKanyakumari(confirmAddress), 'is confirm');
        showNavigationBar();

        if (locationPermission === 'denied') {
          dispatch(setIsChecking(true));
        }

        const localAddress = await getLocalStorageAddress('user-address');

        if (localAddress !== null) {
          handleModalClose();
          console.log('data found');
          dispatch(setConfirmAddress(localAddress));
        } else if (confirmAddress) {
          handleModalClose();
          console.log('modal should close');
        } else {
          handleModalPresent();
        }
      };

      const handleModalClose = () => {
        bottomSheetModalRef?.current?.close();
        dispatch(setAddressLoader(false));
      };

      const handleModalPresent = () => {
        console.log(loader, 'home loader');
        dispatch(setAddressLoader(true));
        bottomSheetModalRef.current?.expand();
      };

      handleAddressCheck();
    }, [confirmAddress, locationPermission, dispatch]),
  );

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

  console.log(confirmAddress, 'ccc');
  console.log(loader, 'loader');

  return (
    <View>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'light-content'}
      />
      <View
        style={{
          backgroundColor: appColors.background,
        }}>
        {loader ? (
          <View style={{height: '100%', paddingStart: '2%', marginTop: '15%'}}>
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
                <Home
                  address={splitAddressAtFirstComma(confirmAddress)}
                  sheetRef={bottomSheetModalRef}
                />
              </View>
            )}
          </>
        )}
      </View>
      <CustomBottomSheet2 bottomSheetRef={bottomSheetModalRef} />

      {/* <AddressBottomSheetModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleClose={() => {
          if (locationPermission !== 'denied' && confirmAddress !== '') {
            bottomSheetModalRef?.current?.close();
          }
        }}
        loading={loading}
        setModalVisible={setModalVisible}
        handleEnableLocation={enableLocation}
        settingModelOpen={settingModelOpen}
        setSettingModelOpen={setSettingModelOpen}
        handleSelectAddress={() => {
          bottomSheetModalRef?.current?.close();
          dispatch(setIsChecking(false));
        }}
      /> */}
    </View>
  );
};

export default HomeScreen;
