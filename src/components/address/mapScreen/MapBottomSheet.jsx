import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../CustomBackDrop';
import CustomText from '../../CustomText';
import AddressAutoComplete from '../AddressAutoComplete';
import appColors from '../../../utils/appColors';
import EnableWarning from './EnableWarning';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {addEllipsis, splitAddressAtFirstComma} from '../../../utils/helperfun';

const MapBottomSheet = ({
  bottomSheetModalRef,
  setModalVisible,
  setSettingModelOpen,
  mapRef,
  isEnable,
  handleEnableLocation,
  isValidAddress,
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const snapPoints = useMemo(() => ['5%', '85%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setModalVisible(index === 1 ? true : false);
  }, []);

  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const fullAddress = useSelector(state => state?.map?.fullAddress);

  const handleClose = () => {
    console.log('close');
    bottomSheetModalRef.current?.close();
  };

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
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      handleStyle={{
        backgroundColor: appColors.bottomSheetBg,
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
      }}
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
          }}>
          <View>
            {!isEnable ? (
              <View style={{marginHorizontal: '1%'}}>
                <EnableWarning
                  className="rounded-md"
                  handleEnableLocation={handleEnableLocation}
                />
              </View>
            ) : (
              <>
                {isWithinKanyakumari && (
                  <View className="flex flex-row items-center justify-between p-2 mx-2 bg-white rounded-md ">
                    <View className="flex flex-row ">
                      <View>
                        <Icon
                          name="location-outline"
                          size={25}
                          color={appColors.blackText}
                        />
                      </View>
                      <View className="w-[85%] ml-2  ">
                        <CustomText
                          font="bold"
                          className=" text-blackText text-[12px]">
                          {splitAddressAtFirstComma(fullAddress)}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                )}
              </>
            )}
            <View className="px-3 ">
              <View className="px-3 py-3 bg-white rounded-md ">
                <CustomText font="semibold">
                  {addEllipsis(fullAddress, 50)}
                </CustomText>
              </View>
              <CustomText
                font="bold"
                className="my-2 text-[15px] text-blackText">
                Change delivery address
              </CustomText>
            </View>
            <View className="px-3 ">
              <AddressAutoComplete
                setSettingModelOpen={setSettingModelOpen}
                setModalVisible={setModalVisible}
                handleCloseSheet={handleClose}
                handleSelectAddress={cords => {
                  mapRef?.current?.animateToRegion(
                    {
                      latitude: cords?.latitude,
                      longitude: cords?.longitude,
                      latitudeDelta: 15,
                      longitudeDelta: 15,
                    },
                    2000,
                  );
                }}
              />
            </View>
          </View>
        </BottomSheetView>
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};

export default MapBottomSheet;
