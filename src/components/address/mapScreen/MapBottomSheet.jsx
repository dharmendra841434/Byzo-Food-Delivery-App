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
import CustomBottomSheet from '../../CustomBottomSheet';

const MapBottomSheet = ({
  bottomSheetModalRef,
  setSettingModelOpen,
  mapRef,
  isEnable,
  handleEnableLocation,
  isValidAddress,
  inputRef,
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const snapPoints = useMemo(() => ['5%', '85%'], []);

  const handleSheetChanges = useCallback(index => {
    if (!index) {
      bottomSheetModalRef.current?.close();
    }
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
    <CustomBottomSheet
      bottomSheetModalRef={bottomSheetModalRef}
      handleSheetChanges={handleSheetChanges}>
      <View style={{marginTop: '2%'}}>
        {!isEnable ? (
          <View style={{marginHorizontal: '1%'}}>
            <EnableWarning
              className="rounded-md"
              handleEnableLocation={handleEnableLocation}
            />
          </View>
        ) : (
          <>
            {
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
            }
          </>
        )}
        <View className="px-3 ">
          {/* <View className="px-3 py-3 bg-white rounded-md ">
                <CustomText font="semibold">
                  {addEllipsis(fullAddress, 50)}
                </CustomText>
              </View> */}
          <CustomText font="bold" className="my-2 text-[17px] text-blackText">
            Change delivery address
          </CustomText>
        </View>
        <View className="px-3 ">
          <AddressAutoComplete
            setSettingModelOpen={setSettingModelOpen}
            handleCloseSheet={handleClose}
            onPressCureentLocation={() => {}}
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
            inputRef={inputRef}
          />
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default MapBottomSheet;
