import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import AddressAutoComplete from '../address/AddressAutoComplete';
import SettingOpenModel from '../address/SettingOpenModel';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkIsWithinKanyakumari,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import EnableWarning from '../address/mapScreen/EnableWarning';
import CustomBottomSheet from '../bottomsheet/CustomBottomSheet';
import {setAddressLoader} from '../../store/mapSlice';

const HomeBottomSheetModal = ({
  handleEnableLocation,
  setSettingModelOpen,
  settingModelOpen,
  handleSelectAddress,
  loading,
  bottomSheetRef,
}) => {
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const dispatch = useDispatch();
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);

  return (
    <>
      <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        isOpened={
          locationPermission === 'denied' && !confirmAddress ? true : false
        }
        isBackdropClosable={locationPermission === 'denied' ? false : true}>
        <View>
          {locationPermission === 'denied' ? (
            <View style={{marginHorizontal: '1%', paddingTop: '3%'}}>
              <EnableWarning
                className="rounded-md"
                handleEnableLocation={handleEnableLocation}
              />
            </View>
          ) : (
            <>
              {checkIsWithinKanyakumari(confirmAddress) && (
                <View className="flex flex-row items-center justify-between p-2 m-2 bg-white rounded-md ">
                  <View className="flex flex-row ">
                    <View>
                      <Icon
                        name="location-outline"
                        size={25}
                        color={appColors.blackText}
                      />
                    </View>
                    <View className="w-[85%] ml-2 ">
                      <CustomText
                        font="semibold"
                        className=" text-[13px] text-blackText">
                        {splitAddressAtFirstComma(confirmAddress)}
                      </CustomText>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}
          <View
            className={` px-3 ${
              checkIsWithinKanyakumari(confirmAddress) ? ' pb-2  ' : 'py-3'
            }`}>
            <CustomText
              font="bold"
              className="-mt-1 text-[17px] text-blackText">
              Select delivery address
            </CustomText>
          </View>
          <View className="px-3 ">
            <AddressAutoComplete
              setSettingModelOpen={setSettingModelOpen}
              handleCloseSheet={() => {
                bottomSheetRef?.current?.close();
                dispatch(setAddressLoader(false));
              }}
              handleSelectAddress={handleSelectAddress}
              onPressCureentLocation={() => {
                bottomSheetRef?.current?.close();
              }}
            />
          </View>
        </View>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={appColors?.secondry} size={33} />
          </View>
        )}
      </CustomBottomSheet>

      <SettingOpenModel
        setSettingModelOpen={setSettingModelOpen}
        settingModelOpen={settingModelOpen}
        setIsVisible={() => {}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: '45%',
    alignItems: 'center',
    paddingTop: '55%',
  },
});

export default HomeBottomSheetModal;
