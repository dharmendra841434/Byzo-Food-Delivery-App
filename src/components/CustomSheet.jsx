import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(height);

  const toggleBottomSheet = useCallback(() => {
    setIsOpen((prev) => !prev);
    translateY.value = isOpen ? withSpring(height) : withSpring(height * 0.4);
  }, [isOpen, translateY]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(height * 0.4, translateY.value + e.translationY);
    })
    .onEnd(() => {
      if (translateY.value > height * 0.7) {
        translateY.value = withSpring(height);
        setIsOpen(false);
      } else {
        translateY.value = withSpring(height * 0.4);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
        <Text style={styles.buttonText}>{isOpen ? 'Close' : 'Open'} Bottom Sheet</Text>
      </TouchableOpacity>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <View style={styles.indicator} />
          <Text style={styles.content}>This is the Bottom Sheet content!</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: height,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  content: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
});

export default BottomSheet;
