import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
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
}) => {
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const confirmAddress = useSelector(state => state?.map?.confirmAddress);

  // variables
  const snapPoints = useMemo(() => ['85%', '85%'], []);
  const handleSheetChanges = useCallback(index => {
    //console.log('handleSheetChanges', index);
    setModalVisible(index === 1 ? true : false);
  }, []);
  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={null}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enablePanDownToClose={false}
        backdropComponent={props => (
          <CustomBackdrop
            {...props}
            handleClose={handleClose}
            keyboardStatus={keyboardVisible}
            isCloseButton={false}
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
              {locationPermission === 'denied' ? (
                <View style={{marginHorizontal: '1%'}}>
                  <EnableWarning
                    className="rounded-md"
                    handleEnableLocation={handleEnableLocation}
                  />
                </View>
              ) : (
                <>
                  {isWithinKanyakumari && confirmAddress && (
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
                  className="-mt-1 text-[15px] text-blackText">
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
