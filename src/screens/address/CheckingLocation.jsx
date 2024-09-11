import {
  View,
  StatusBar,
  StyleSheet,
  Keyboard,
  Animated as RNAnimated,
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
import {fatchUserAddress, setConfirmAddress} from '../../store/mapSlice';
import CustomBackdrop from '../../components/CustomBackDrop';
import {useNavigation} from '@react-navigation/native';
import AddressAutoComplete from '../../components/address/AddressAutoComplete';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import NotAllowLocation from '../../components/address/NotAllowLocation';
import addresAnimation from '../../assets/images/animations/ddd.json';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import {
  checkIsWithinKanyakumari,
  saveAdressOnLocalStorage,
  toPercentage,
} from '../../utils/helperfun';
import HomeLoader from '../../components/skeltonLoaders/HomeLoader';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TestBottomSheet from '../../components/address/TestBottomSheet';

const CheckingLocation = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const loader = useSelector(state => state?.map?.addressLoader);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [snapPoints, setSnapPoints] = useState(['10%', '75%']);
  // ref
  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    if (!index) {
      bottomSheetModalRef.current?.close();
    }
  }, []);

  const handleClose = () => {
    // console.log('close');
    bottomSheetModalRef.current?.close();
  };

  useEffect(() => {
    showNavigationBar();
    if (fullAddress) {
      if (checkIsWithinKanyakumari(fullAddress)) {
        dispatch(setConfirmAddress(fullAddress));
        saveAdressOnLocalStorage('user-address', fullAddress);
        console.log('going to home screen');
        navigation.replace('home');
      }
    } else {
      if (locationPermission === 'denied') {
        navigation.replace('home');
      } else {
        console.log('fatching address');
        setLoading(true);
        dispatch(fatchUserAddress());
        setLoading(false);
      }
    }
  }, [confirmAddress]);
  // console.log(confirmAddress, 'confirmadd');

  const translateY = useSharedValue(150); // Initial position
  const animatedPaddingTop = useSharedValue(120);

  // Animated style for bottom sheet container
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    // Listen to keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      // Cleanup keyboard event listeners
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onKeyboardShow = e => {
    translateY.value = withTiming(toPercentage(13), {duration: 300}); // Move up by keyboard height
    animatedPaddingTop.value = withTiming(60, {duration: 300});
  };

  const onKeyboardHide = () => {
    translateY.value = withTiming(toPercentage(21), {duration: 300}); // Move back to original position
    animatedPaddingTop.value = withTiming(120, {duration: 300});
  };

  // console.log(animatedStyle, 'thussu');

  return (
    <>
      <BottomSheetModalProvider>
        <View style={{flex: 1}} className="h-screen bg-white ">
          <StatusBar
            backgroundColor="rgba(0,0,0,0)"
            translucent
            barStyle="dark-content"
          />
          {loader ? (
            <View className="mt-16 ">
              <AddressScreenLoader />
              <View className="flex items-center h-full px-3 pt-[30%]">
                <LottieView
                  source={addresAnimation}
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
            </View>
          ) : (
            <View style={{flex: 1}}>
              {/* {geolocationErrorMessage ? (
                <View
                  style={{
                    alignItems: 'center',
                    paddingTop: '50%',
                    height: '100%',
                  }}>
                  <LottieView
                    source={timeOutAnimation}
                    autoPlay
                    style={{height: 100, width: 100}}
                    speed={0.5}
                  />
                  <CustomText font="semibold" style={{fontSize: 18}}>
                    Something went wrong
                  </CustomText>
                  <CustomText style={{fontSize: 13, opacity: 0.5}}>
                    {geolocationErrorMessage}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(fatchUserAddress());
                    }}
                    style={{
                      marginTop: '5%',
                      borderWidth: 0.5,
                      borderColor: appColors.primary,
                      paddingHorizontal: '5%',
                      paddingBottom: '1%',
                      borderRadius: 5,
                    }}>
                    <CustomText
                      font="medium"
                      style={{color: appColors.primary}}>
                      Try again
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  
                </>
              )} */}
              {!checkIsWithinKanyakumari(fullAddress) ? (
                <NotAllowLocation
                  handlePresentModalPress={handlePresentModalPress}
                />
              ) : (
                <View className="mt-16 ">
                  <AddressScreenLoader />
                  <View className="flex items-center h-full px-3 pt-[30%]">
                    <LottieView
                      source={addresAnimation}
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
                </View>
              )}
            </View>
          )}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={['10%', '80%']}
            handleComponent={null}
            style={animatedStyle}
            backdropComponent={props => (
              <CustomBackdrop
                {...props}
                handleClose={handleClose}
                keyboardStatus={keyboardVisible}
                animatedPaddingTop={animatedPaddingTop}
              />
            )}
            keyboardBehavior="interactive"
            enablePanDownToClose={true}
            onChange={handleSheetChanges}>
            <BottomSheetView
              style={[
                {
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  backgroundColor: appColors?.bottomSheetBg,
                  flex: 1,
                },
              ]}>
              <View>
                <View className="p-3 ">
                  <CustomText
                    font="bold"
                    className="text-[17px] text-blackText">
                    Select delivery address
                  </CustomText>
                </View>
                <View className="px-3 ">
                  <AddressAutoComplete
                    setSettingModelOpen={setSettingModelOpen}
                    handleCloseSheet={() => {}}
                    handleSelectAddress={() => {}}
                    onPressCureentLocation={() => {}}
                  />
                </View>
              </View>
            </BottomSheetView>
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

export default CheckingLocation;
