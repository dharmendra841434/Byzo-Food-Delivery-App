import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../CustomBackDrop';
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

const AddressBottomSheetModal = ({
  setModalVisible,
  keyboardVisible,
  handleClose,
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
  const addressLoader = useSelector(state => state?.map?.addressLoader);

  // variables
  const snapPoints = useMemo(() => ['1%', '85%'], []);
  const handleSheetChanges = useCallback(index => {
    //console.log('handleSheetChanges', index);
    setModalVisible(index === 1 ? true : false);
    if (!index) {
      bottomSheetModalRef?.current?.close();
    }
  }, []);
  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={null}
        enableHandlePanningGesture={
          locationPermission === 'denied' ? false : true
        }
        enableContentPanningGesture={
          locationPermission === 'denied' ? false : true
        }
        enablePanDownToClose={locationPermission === 'denied' ? false : true}
        backdropComponent={props => (
          <CustomBackdrop
            {...props}
            handleClose={handleClose}
            keyboardStatus={keyboardVisible}
            isCloseButton={
              locationPermission === 'denied' || confirmAddress === ''
                ? false
                : true
            }
          />
        )}
        onChange={handleSheetChanges}>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={{height: '100%'}}>
          <BottomSheetView
            style={{
              height: '100%',
              backgroundColor: '#e6ecf0',
              borderRadius: 14,
            }}>
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
                  onPressCureentLocation={() => {}}
                />
              </View>
            </View>
            {loading && (
              <View
                style={{
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
                }}>
                <ActivityIndicator color={appColors?.secondry} size={33} />
              </View>
            )}
          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
      <SettingOpenModel
        setSettingModelOpen={setSettingModelOpen}
        settingModelOpen={settingModelOpen}
        setIsVisible={() => {}}
      />
    </>
  );
};

export default AddressBottomSheetModal;
