import {View, StatusBar, StyleSheet, Keyboard} from 'react-native';
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
  getLocalStorageAddress,
  saveAdressOnLocalStorage,
} from '../../utils/helperfun';
import HomeLoader from '../../components/skeltonLoaders/HomeLoader';

const CheckingLocation = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const loader = useSelector(state => state?.map?.addressLoader);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '85%'], []);

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
        dispatch(fatchUserAddress());
      }
    }
  }, [loader]);

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
            <BottomSheetView
              style={{
                height: '100%',
                backgroundColor: appColors.bottomSheetBg,
                borderRadius: 14,
              }}>
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
