import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import OtpInputs from '../../components/login/OtpInputs';
import appColors from '../../utils/appColors';
import CustomHeader from '../../components/CustomHeader';
import CustomText from '../../components/CustomText';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import OtpTimer from '../../components/login/OtpTimmer';

const OtpScreen = () => {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={appColors.background} />
      <CustomHeader title="Otp verification" />
      <View style={{alignItems: 'center', marginTop: '5%'}}>
        <CustomText>We've send a verification code to </CustomText>
        <CustomText font="bold" style={{opacity: 0.9}}>
          +918364664636{' '}
        </CustomText>
      </View>
      <View style={styles.otpContainer}>
        <OtpInputs />
      </View>
      <View style={{marginTop: '10%'}}>
        <OtpTimer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  otpContainer: {
    paddingHorizontal: '5%',
    paddingTop: '5%',
    marginTop: '10%',
  },
});

export default OtpScreen;
