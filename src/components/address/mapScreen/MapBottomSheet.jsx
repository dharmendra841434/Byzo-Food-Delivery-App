import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../CustomBackDrop';
import CustomText from '../../CustomText';
import AddressAutoComplete from '../AddressAutoComplete';
import appColors from '../../../utils/appColors';

const MapBottomSheet = ({
  bottomSheetModalRef,
  setModalVisible,
  setSettingModelOpen,
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const snapPoints = useMemo(() => ['85%', '85%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setModalVisible(index === 1 ? true : false);
  }, []);

  const handleClose = () => {
    // console.log('close');
    bottomSheetModalRef.current?.close();
  };
  return (
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
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{height: '100%'}}>
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
                handleCloseSheet={handleClose}
              />
            </View>
          </View>
        </BottomSheetView>
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};

export default MapBottomSheet;
