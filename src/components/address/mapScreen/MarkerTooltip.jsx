import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomText from '../../CustomText';

const MarkerTooltip = () => {
  return (
    <View style={styles.tooltipContainer}>
      <View style={styles.tooltipBubble}>
        <CustomText style={styles.tooltipTitle}>
          Your order will be delivered here
        </CustomText>
        <CustomText style={styles.tooltipSubtitle}>
          Move pin to your exact location
        </CustomText>
      </View>
      <View style={styles.tooltipTail} />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    alignItems: 'center',
  },
  tooltipBubble: {
    backgroundColor: '#333', // Dark background color
    borderRadius: 10, // Rounded corners for bubble
    paddingHorizontal: 12, // Horizontal padding
    paddingVertical: 8, // Vertical padding
    maxWidth: 250, // Adjust width if necessary
    alignItems: 'center',
  },
  tooltipTitle: {
    color: '#fff', // White text
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  tooltipSubtitle: {
    color: '#fff', // White text
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  tooltipTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333', // Same as bubble background
    marginTop: -1, // Move the tail closer to the bubble
  },
});

export default MarkerTooltip;
