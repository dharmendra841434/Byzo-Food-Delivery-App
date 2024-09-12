import {View, Text, Keyboard, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useEffect, useMemo} from 'react';
import appColors from '../utils/appColors';
import CustomBackdrop from './CustomBackDrop';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {toPercentage} from '../utils/helperfun';

const CustomBottomSheet = ({
  bottomSheetModalRef,
  handleSheetChanges,
  children,
  isCloseButton,
  ...props
}) => {
  const handleClose = () => {
    // console.log('close');
    bottomSheetModalRef.current?.close();
  };
  const snapPoints = useMemo(() => ['10%', '80%'], []);
  const translateY = useSharedValue(150); // Initial position
  const animatedPaddingTop = useSharedValue(120);

  // Animated style for bottom sheet container
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    // Listen to keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      // Cleanup keyboard event listeners
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onKeyboardShow = e => {
    translateY.value = withTiming(toPercentage(15), {duration: 300}); // Move up by keyboard height
    animatedPaddingTop.value = withTiming(70, {duration: 300});
  };

  const onKeyboardHide = () => {
    translateY.value = withTiming(toPercentage(22), {duration: 300}); // Move back to original position
    animatedPaddingTop.value = withTiming(120, {duration: 300});
  };
  return (
    <BottomSheetModal
      backgroundStyle={styles.modalBackgroud}
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      handleComponent={null}
      {...props}
      style={animatedStyle}
      backdropComponent={props => (
        <CustomBackdrop
          {...props}
          handleClose={handleClose}
          // keyboardStatus={keyboardVisible}
          isCloseButton={isCloseButton}
          animatedPaddingTop={animatedPaddingTop}
        />
      )}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}>
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: appColors?.bottomSheetBg,
  },
  modalBackgroud: {
    flex: 1,
    backgroundColor: appColors?.bottomSheetBg,
  },
});

export default CustomBottomSheet;
