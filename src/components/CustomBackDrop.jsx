import React, {useMemo} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  TouchableOpacity,
  Animated as RNAnimated,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import appColors from '../utils/appColors';

const CustomBackdrop = ({
  animatedIndex,
  style,
  handleClose,
  isCloseButton = true,
  animatedPaddingTop,
}) => {
  // Animated styles for backdrop container
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));

  // Combine provided styles with animated style
  const containerStyle = useMemo(
    () => [style, styles.backdrop, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.fullScreen}>
          {isCloseButton && (
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: appColors.backDropBg,
  },
  fullScreen: {
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: '45%',
    padding: 8,
    backgroundColor: appColors?.closeButton,
    borderRadius: 50,
    top: '13%',
  },
});

export default CustomBackdrop;
