import {
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  Modal,
  Platform,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import appColors from '../../utils/appColors';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import CustomText from '../../components/CustomText';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {fatchUserAddress, setLocationPermission} from '../../store/mapSlice';
import CustomBackdrop from '../../components/CustomBackDrop';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import {
  getLocalStorageData,
  storeLocalStorageData,
} from '../../utils/helperfun';
import {useNavigation} from '@react-navigation/native';
import AddressAutoComplete from '../../components/address/AddressAutoComplete';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import UserLogin from './UserLogin';
import NotAllowLocation from '../../components/address/NotAllowLocation';

const LoginScreen = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const loader = useSelector(state => state?.map?.addressLoader);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Byzo Location Permission',
          message: 'Byzo needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can access the location');
        dispatch(setLocationPermission('granted'));
        dispatch(fatchUserAddress());
      } else {
        console.log('Location permission denied');
        dispatch(setLocationPermission('denied'));
        ToastAndroid.showWithGravityAndOffset(
          'Please provide location permission for hassle free delivery',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    showNavigationBar();
    getLocalStorageData('skip-login').then(val => {
      console.log(val);
      if (val !== null) {
        navigation.replace('home');
      }
    });
    requestLocationPermission();
  }, []);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['85%', '85%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setModalVisible(index === 1 ? true : false);
  }, []);

  const handleClose = () => {
    // console.log('close');
    bottomSheetModalRef.current?.close();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <BottomSheetModalProvider>
        <View style={{flex: 1}} className="h-screen bg-white ">
          <StatusBar
            backgroundColor={
              modalVisible ? appColors.backDropBg : appColors.background
            }
          />
          {loader ? (
            <>
              <AddressScreenLoader />
              <View className="flex items-center h-full px-3 pt-[30%]">
                <LottieView
                  source={require('../../assets/images/ddd.json')}
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
            </>
          ) : (
            <View>
              {isWithinKanyakumari ? (
                <>
                  <UserLogin
                    onSkip={() => {
                      storeLocalStorageData('skip-login', 'skipped');
                      navigation.replace('home');
                    }}
                  />
                </>
              ) : (
                <NotAllowLocation
                  handlePresentModalPress={handlePresentModalPress}
                />
                // <View className="flex items-center pt-[50%] ">
                //   <Image
                //     source={require('../../assets/images/location_not_found.png')}
                //     className="w-40 h-40 "
                //   />
                //   <CustomText
                //     font="medium"
                //     className="text-xl text-blackText w-[70%] text-center mt-5 ">
                //     Sorry we don't deliver at your location
                //   </CustomText>
                //   <CustomText className="my-2 text-gray-500 ">
                //     we will be there soon - hang on tight
                //   </CustomText>
                //   <TouchableOpacity
                //     activeOpacity={0.8}
                //     onPress={handlePresentModalPress}
                //     className="px-3 pt-1 pb-2 mt-4 rounded-lg bg-secondry">
                //     <CustomText className="text-[13px] text-white ">
                //       Manually Select Your Location{' '}
                //     </CustomText>
                //   </TouchableOpacity>
                // </View>
              )}
            </View>
          )}

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            handleComponent={null}
            backdropComponent={props => (
              <CustomBackdrop
                {...props}
                handleClose={handleClose}
                keyboardStatus={keyboardVisible}
              />
            )}
            onChange={handleSheetChanges}>
            <TouchableWithoutFeedback
              onPress={() => Keyboard.dismiss()}
              style={{height: '100%'}}>
              <BottomSheetView
                style={{
                  height: '100%',
                  backgroundColor: appColors.bottomSheetBg,
                  borderRadius: 14,
                }}>
                <View>
                  <View className="p-3 ">
                    <CustomText font="bold" className="text-lg text-blackText">
                      Select delivery address
                    </CustomText>
                  </View>
                  <View className="px-3 ">
                    <AddressAutoComplete
                      setSettingModelOpen={setSettingModelOpen}
                      setModalVisible={setModalVisible}
                      handleCloseSheet={() => {}}
                      handleSelectAddress={() => {}}
                    />
                  </View>
                </View>
              </BottomSheetView>
            </TouchableWithoutFeedback>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
      <SettingOpenModel
        setSettingModelOpen={setSettingModelOpen}
        settingModelOpen={settingModelOpen}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;
