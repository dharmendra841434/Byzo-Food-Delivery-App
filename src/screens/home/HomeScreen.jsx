import {View, StatusBar, BackHandler} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  toggleTabBarVisibility,
} from '../../utils/helperfun';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import Home from './Home';
import HomeBottomSheetModal from '../../components/home/HomeBottomSheetModal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getAllData} from '../../store/ProductsSlice';
import HomeProductLoader from '../../components/skeltonLoaders/HomeProductLoader';

const HomeScreen = () => {
  const bottomSheetRef = useRef(null);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const isChecking = useSelector(state => state?.map?.isChecking);
  const productsLoader = useSelector(state => state?.products?.productsLoader);
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const loader = useSelector(state => state?.map?.addressLoader);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handlePresentModalPress = () => {
    toggleTabBarVisibility(navigation, false);
    bottomSheetRef?.current?.expand();
  };

  const checkPermission = async () => {
    if (!confirmAddress) {
      dispatch(setAddressLoader(true));
    }
    if (locationPermission !== 'denied') {
      dispatch(setIsChecking(false));
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
              // console.log('calling cnf');
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
      }, 2000);
    }
    // Clean up the interval on component unmount or when isChecking changes
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isChecking]);

  useFocusEffect(
    useCallback(() => {
      const handleAddressCheck = async () => {
        showNavigationBar();
        if (confirmAddress) {
          console.log('modal is closed');
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
      };

      handleAddressCheck();
    }, [confirmAddress, fullAddress]), // Include checkPermission in the dependencies array if it's defined outside of this effect
  );

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

  useEffect(() => {
    console.log('fatched');

    dispatch(getAllData());
  }, []);

  useEffect(() => {
    if (loader || productsLoader) {
      toggleTabBarVisibility(navigation, false);
    } else {
      toggleTabBarVisibility(navigation, true);
    }
    if (!checkIsWithinKanyakumari(fullAddress)) {
      toggleTabBarVisibility(navigation, false);
    }
  }, [loader, productsLoader]);

  console.log(loader, 'addresssloader');
  console.log(confirmAddress, 'cfn');

  return (
    <View
      style={{backgroundColor: appColors?.background}}
      className="h-[110vh] ">
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        translucent
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: appColors.background,
        }}>
        {loader || productsLoader ? (
          <View style={{height: '100%'}}>
            <HomeProductLoader />
          </View>
        ) : (
          <>
            {!confirmAddress ? (
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
          dispatch(setIsChecking(false));
          dispatch(setAddressLoader(false));
        }}
      />
    </View>
  );
};

export default HomeScreen;
