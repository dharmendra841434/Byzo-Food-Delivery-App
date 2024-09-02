import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import OtpInputs from '../../components/login/OtpInputs';
import appColors from '../../utils/appColors';
import CustomHeader from '../../components/CustomHeader';
import CustomText from '../../components/CustomText';
import OtpTimer from '../../components/login/OtpTimmer';
import {useRoute} from '@react-navigation/native';
import {getHash, startOtpListener, useOtpVerify} from 'react-native-otp-verify';
import {numberToArray} from '../../utils/helperfun';

const OtpScreen = () => {
  const route = useRoute();
  // Get the phone number parameter from the route
  const {phone} = route.params;

  //  const [detectedOtp, setDetectedOtp] = useState();
  const [otpFields, setOtpFields] = useState(new Array(6).fill(''));
  useEffect(() => {
    getHash()
      .then(hash => {
        // use this hash in the message.
        //OH1GTBzlJAv
        console.log(hash, 'hash');
      })
      .catch(console.log);
    startOtpListener(message => {
      const regex = /(\d{6})/g;
      const match = regex.exec(message);

      const otp = match ? match[1] : null;

      if (otp === null) {
        console.error('No 6-digit OTP found in the message.');
      } else {
        setOtpFields(numberToArray(otp));
      }
    });
    // return () => removeListener();
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={appColors.background} />
      <CustomHeader title="Otp verification" />
      <View style={{alignItems: 'center', marginTop: '5%'}}>
        <CustomText>We've send a verification code to </CustomText>
        <CustomText font="bold" style={{opacity: 0.9}}>
          +91{phone}
        </CustomText>
      </View>
      <View style={styles.otpContainer}>
        <OtpInputs otpFields={otpFields} setOtpFields={setOtpFields} />
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
