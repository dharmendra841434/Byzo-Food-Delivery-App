import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';

const NotDeliveryWarning = ({handleGoToCureent, handleSelectManually}) => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '2%',
        }}>
        <Image
          style={{height: 110, width: 110}}
          source={require('../../assets/images/location_not_found.png')}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <CustomText
          font="bold"
          style={{fontSize: 19, color: appColors.blackText}}>
          Opps
        </CustomText>
        <CustomText font="medium" style={styles.errorText}>
          Blinkit is not available at this location at the moment. Please select
          a different location.
        </CustomText>
        <TouchableOpacity
          onPress={handleGoToCureent}
          activeOpacity={0.7}
          style={styles.button}>
          <CustomText font="semibold" style={{color: appColors.background}}>
            Go to current location
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSelectManually}
          activeOpacity={0.7}
          style={{marginTop: '2%'}}>
          <CustomText font="semibold" style={{color: appColors.secondry}}>
            Select location manually
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.secondry,
    width: '90%',
    marginTop: '3%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default NotDeliveryWarning;
