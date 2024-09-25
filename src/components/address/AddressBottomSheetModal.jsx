import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';
import Icon from 'react-native-vector-icons/Ionicons';
import AddressAutoComplete from './AddressAutoComplete';
import SettingOpenModel from './SettingOpenModel';
import {useSelector} from 'react-redux';
import {
  checkIsWithinKanyakumari,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import EnableWarning from './mapScreen/EnableWarning';
import CustomBottomSheet from '../CustomBottomSheet';

const AddressBottomSheetModal = ({
  setModalVisible,
  bottomSheetModalRef,
  handleEnableLocation,
  setSettingModelOpen,
  settingModelOpen,
  handleSelectAddress,
  loading,
}) => {
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const confirmAddress = useSelector(state => state?.map?.confirmAddress);
  const handleSheetChanges = useCallback(index => {
    //console.log('handleSheetChanges', index);
    setModalVisible(index === 1 ? true : false);
    if (!index) {
      bottomSheetModalRef?.current?.close();
    }
  }, []);
  return (
    <>
      <CustomBottomSheet
        isCloseButton={
          locationPermission === 'denied' || confirmAddress === ''
            ? false
            : true
        }
        enableHandlePanningGesture={
          locationPermission === 'denied' ? false : true
        }
        enableContentPanningGesture={
          locationPermission === 'denied' ? false : true
        }
        enablePanDownToClose={locationPermission === 'denied' ? false : true}
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={handleSheetChanges}>
        <View>
          {/* <CustomText>Home modal</CustomText> */}
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
              setModalVisible={setModalVisible}
              handleCloseSheet={() => {}}
              handleSelectAddress={handleSelectAddress}
              onPressCureentLocation={() => {
                console.log('handle current location');
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

export default AddressBottomSheetModal;
