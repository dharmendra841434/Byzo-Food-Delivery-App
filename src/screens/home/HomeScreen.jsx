import {View, StatusBar, BackHandler} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import appColors from '../../utils/appColors';
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
import HomeBottomSheetModal from '../../components/home/HomeBottomSheetModal';

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);
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

  const handlePresentModalPress = () => {
    bottomSheetRef?.current?.expand();
  };
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
              bottomSheetRef?.current?.close();
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
    }
    // Clean up the interval on component unmount or when isChecking changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isChecking]);

  useEffect(() => {
    const handleAddressCheck = async () => {
      showNavigationBar();
      if (locationPermission === 'denied') {
        dispatch(setIsChecking(true));
        dispatch(setAddressLoader(true));
        bottomSheetRef?.current?.expand();
      }
      if (confirmAddress) {
        handleModalClose();
      } else {
        const localAddress = await getLocalStorageAddress('user-address');
        if (localAddress !== null) {
          dispatch(setConfirmAddress(localAddress));
          bottomSheetRef?.current?.close();
        }
      }
    };

    const handleModalClose = () => {
      bottomSheetRef?.current?.close();
      dispatch(setAddressLoader(false));
    };

    handleAddressCheck();
  }, [confirmAddress, fullAddress]);

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef?.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{backgroundColor: appColors?.background}}
      className="h-[110vh] ">
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
                  handleChangeAddress={handlePresentModalPress}
                />
              </View>
            )}
          </>
        )}
      </View>

      <HomeBottomSheetModal
        bottomSheetRef={bottomSheetRef}
        loading={loading}
        handleEnableLocation={enableLocation}
        settingModelOpen={settingModelOpen}
        setSettingModelOpen={setSettingModelOpen}
        handleSelectAddress={() => {
          bottomSheetRef?.current?.close();
          dispatch(setIsChecking(false));
        }}
      />
    </View>
  );
};

export default HomeScreen;
