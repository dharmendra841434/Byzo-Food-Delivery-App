import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import appColors from '../../utils/appColors';
import AddressList from './AddressList';
import SearchHandle from './SearchHandle';
import {useDispatch} from 'react-redux';
import {setSearchInput, setSuggestedAddress} from '../../store/mapSlice';
const CustomBottomSheet2 = ({
  bottomSheetRef,
  setModalState,
  isBackdropClosable = true,
}) => {
  const {height: SCREEN_HEIGHT} = Dimensions.get('window');

  const dispatch = useDispatch();

  // variables
  const snapPoints = useMemo(() => [10, SCREEN_HEIGHT], [SCREEN_HEIGHT]);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  // Handle closing the modal
  const handleBackdropPress = () => {
    if (isBackdropClosable) {
      bottomSheetRef.current?.close();
      if (setModalState) {
        setModalState(false);
      }
    }
  };

  const handleOnchange = index => {
    if (!index || index === -1) {
      console.log(index, 'current ind3x');
      handleClosePress();
      Keyboard.dismiss();
      showNavigationBar();
      if (setModalState) {
        setModalState(false);
      }
      dispatch(setSuggestedAddress([]));
      dispatch(setSearchInput(''));
    }
  };

  // Backdrop component for the BottomSheet
  const renderBackdrop = props => (
    <TouchableWithoutFeedback onPress={handleBackdropPress}>
      <BottomSheetBackdrop
        pressBehavior={isBackdropClosable ? 'close' : 'none'}
        {...props}
        disappearsOnIndex={-1}
        opacity={0.6}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      style={styles.sheetStyle}
      backgroundStyle={{
        backgroundColor: appColors?.bottomSheetBg,
      }}
      backdropComponent={renderBackdrop} // Add backdrop
      enableDynamicSizing={false}
      enablePanDownToClose={true} // Allow closing by swiping down
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleComponent={() => <SearchHandle />}
      onChange={handleOnchange}>
      <AddressList handleCloseSheet={() => {}} handleSelectAddress={() => {}} />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetStyle: {
    marginTop: '20%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
});

export default CustomBottomSheet2;
