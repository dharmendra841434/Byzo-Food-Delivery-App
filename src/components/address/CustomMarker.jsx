import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import appColors from '../../utils/appColors';

const CustomMarker = () => {
  return (
    <View style={styles.marker}>
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: appColors?.blackText,
          borderRadius: 100,
          padding: 8,
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: appColors?.background,
            borderRadius: 100,
          }}
        />
      </View>
      <View
        style={{height: 20, width: 4, backgroundColor: appColors.blackText}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -60,
  },
  image: {
    width: 40,
    height: 40,
  },
  text: {
    color: 'black',
    fontSize: 12,
  },
});

export default CustomMarker;
