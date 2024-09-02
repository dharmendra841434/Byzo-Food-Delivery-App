import {
  View,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import appColors from '../../utils/appColors';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import CustomText from '../../components/CustomText';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet, {
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
import timeOutAnimation from '../../assets/images/animations/wrong.json';
import addresAnimation from '../../assets/images/animations/ddd.json';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import {checkIsWithinKanyakumari} from '../../utils/helperfun';

const CheckingLocation = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const geolocationErrorMessage = useSelector(
    state => state?.map?.geolocationErrorMessage,
  );
  const loader = useSelector(state => state?.map?.addressLoader);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    showNavigationBar();
    // dispatch(fatchUserAddress())
  }, []);

  useEffect(() => {
    if (fullAddress) {
      console.log(fullAddress, 'full address');
      console.log(checkIsWithinKanyakumari(fullAddress), 'isWithinKanyakumari');
      if (checkIsWithinKanyakumari(fullAddress)) {
        dispatch(setConfirmAddress(fullAddress));
        console.log('going to home screen');
        navigation.replace('home');
      }
    }
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
            </>
          ) : (
            <View>
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
              {!checkIsWithinKanyakumari(fullAddress) && (
                <NotAllowLocation
                  handlePresentModalPress={handlePresentModalPress}
                />
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
