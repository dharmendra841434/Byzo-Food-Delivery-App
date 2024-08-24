import React, {useMemo} from 'react';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import CustomText from './CustomText';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import appColors from '../utils/appColors';

const CustomBackdrop = ({
  animatedIndex,
  style,
  handleClose,
  keyboardStatus,
  isCloseButton = true,
}) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: appColors.backDropBg,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <TouchableWithoutFeedback
        onPress={handleClose}
        style={{height: '100%', width: '100%'}}>
        {isCloseButton && (
          <TouchableOpacity
            onPress={handleClose}
            className={`absolute bg-gray-700 w-fit  right-[45%] ${
              keyboardStatus ? 'top-[5%]' : 'top-[8%]'
            } p-2 rounded-full`}>
            <Icon name="close" size={20} color="white" />
          </TouchableOpacity>
        )}
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default CustomBackdrop;
