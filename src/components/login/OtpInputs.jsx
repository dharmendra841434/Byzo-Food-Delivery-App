import React, {useRef} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import appColors from '../../utils/appColors';

export default function OtpInputs({setOtpFields, otpFields}) {
  const ref = useRef([]);

  console.log(otpFields, 'this is otp field');

  const handleKeyDown = (e, index) => {
    const key = e.nativeEvent.key;
    const copyOtpFields = [...otpFields];

    if (key === 'ArrowLeft') {
      if (index > 0) ref.current[index - 1].focus();
      return;
    }

    if (key === 'ArrowRight') {
      if (index + 1 < otpFields.length) ref.current[index + 1].focus();
      return;
    }

    if (key === 'Backspace') {
      copyOtpFields[index] = '';
      setOtpFields(copyOtpFields);
      if (index > 0) ref.current[index - 1].focus();
      return;
    }

    if (!isNaN(key)) {
      copyOtpFields[index] = key;
      setOtpFields(copyOtpFields);
      if (index + 1 < otpFields.length) ref.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otpFields.map((value, index) => (
        <TextInput
          key={index}
          ref={currentInput => (ref.current[index] = currentInput)}
          style={[
            styles.input,
            {
              borderColor: value ? appColors.blackText : appColors.borderGray,
            },
          ]}
          value={value}
          onKeyPress={e => handleKeyDown(e, index)}
          keyboardType="numeric"
          maxLength={1}
          cursorColor={appColors.blackText}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 0.8,
    textAlign: 'center',
    borderRadius: 7,
    color: appColors.blackText,
  },
});
