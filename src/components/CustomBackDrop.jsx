import React, {useMemo} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CustomBackdrop = ({animatedIndex, style, handleClose, isCloseButton}) => {
  // Animated styles for backdrop container
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
        backgroundColor: '#a8b5eb',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      {isCloseButton && (
        <TouchableWithoutFeedback
          style={{height: '100%', width: '100%'}}
          onPress={handleClose}></TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

export default CustomBackdrop;
