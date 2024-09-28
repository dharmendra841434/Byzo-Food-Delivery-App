import React, {useMemo} from 'react';
import {
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import appColors from '../../utils/appColors';

const CustomBottomSheet = ({
  isBackdropClosable = true,
  children,
  bottomSheetRef,
  isOpened = false,
}) => {
  const {height: SCREEN_HEIGHT} = Dimensions.get('window');

  // variables
  const snapPoints = useMemo(() => [1, SCREEN_HEIGHT], [SCREEN_HEIGHT]);
  const handleClosePress = () => {
    bottomSheetRef?.current?.close();
  };
  // Handle closing the modal
  const handleBackdropPress = () => {
    if (isBackdropClosable) {
      handleClosePress();
    }
  };

  const handleOnchange = index => {
    if (!index || index === -1) {
      handleClosePress();
      Keyboard.dismiss();
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
      index={isOpened ? 1 : -1}
      style={styles.sheetStyle}
      backgroundStyle={{
        backgroundColor: appColors?.bottomSheetBg,
      }}
      backdropComponent={renderBackdrop} // Add backdrop
      enableDynamicSizing={false}
      enablePanDownToClose={true} // Allow closing by swiping down
      enableContentPanningGesture={!isOpened}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      enableOverDrag={false}
      handleComponent={null}
      onChange={handleOnchange}>
      <BottomSheetView style={{height: '100%'}}>{children}</BottomSheetView>
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

export default CustomBottomSheet;
