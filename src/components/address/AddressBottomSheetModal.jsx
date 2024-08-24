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
const AddressBottomSheetModal = ({
  setModalVisible,
  keyboardVisible,
  handleClose,
  bottomSheetModalRef,
  handleEnableLocation,
  setSettingModelOpen,
  settingModelOpen,
  loader,
}) => {
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
              <View className="flex flex-row items-center justify-between p-2 m-2 bg-white rounded-md ">
                <View className="flex flex-row ">
                  <View>
                    <Icon
                      name="location-outline"
                      size={40}
                      color={appColors.blackText}
                    />
                    <View className="absolute w-12 h-1 mt-5 -rotate-45 bg-red-600 border border-white " />
                  </View>
                  <View className="ml-2 ">
                    <CustomText font="bold" className="text-sm text-blackText">
                      Device location not enabled
                    </CustomText>
                    <CustomText className=" text-[12px] text-blackText">
                      Enable for a bettter delivery
                    </CustomText>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleEnableLocation}
                  className="px-6 pb-1.5 pt-0.5 rounded-lg bg-secondry h-fit">
                  <CustomText className="text-white ">
                    {loader ? (
                      <ActivityIndicator
                        color={appColors.background}
                        size={20}
                      />
                    ) : (
                      'Enable'
                    )}
                  </CustomText>
                </TouchableOpacity>
              </View>
              <View className="px-3 pb-2 ">
                <CustomText font="bold" className="text-lg text-blackText">
                  Select delivery address
                </CustomText>
              </View>
              <View className="px-3 ">
                <AddressAutoComplete
                  setSettingModelOpen={setSettingModelOpen}
                  setModalVisible={setModalVisible}
                  handleCloseSheet={() => {}}
                />
              </View>
            </View>
          </BottomSheetView>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
      <SettingOpenModel
        setSettingModelOpen={setSettingModelOpen}
        settingModelOpen={settingModelOpen}
      />
    </>
  );
};

export default AddressBottomSheetModal;
