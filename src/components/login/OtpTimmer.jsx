import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import appColors from '../../utils/appColors';
import CustomText from '../CustomText';

export default function OtpTimer() {
  const [seconds, setSeconds] = useState(30);

  const handleResendOtp = () => {
    setSeconds(30);
  };

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <View style={styles.timerContainer}>
      {seconds > 0 ? (
        <CustomText style={{color: appColors.borderGray}}>
          {`Resend OTP in ${seconds < 10 ? `0${seconds}` : seconds} `}
        </CustomText>
      ) : (
        <TouchableOpacity activeOpacity={0.6} onPress={handleResendOtp}>
          <CustomText style={{color: appColors.primary}} font="semibold">
            Resend OTP
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timerText: {
    fontSize: 16,
  },
});
