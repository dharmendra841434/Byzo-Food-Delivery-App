import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CustomButton from '../../components/CustomButton';
import ProductSlider from '../../components/ProductSlider';
import LinearGradient from 'react-native-linear-gradient';
import {lightColors} from '../../utils/constent';
import CustomText from '../../components/CustomText';
import {TextInput} from 'react-native-gesture-handler';
import appColors from '../../utils/appColors';
import {screenWidth} from '../../utils/scaling';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';

export default function UserLogin({onSkip}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const bottomColors = [...lightColors].reverse();
  const bottomValue = useSharedValue(0);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: bottomValue.value,
    };
  });

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
    bottomValue.value = withTiming(isVisible ? 0 : 100, {duration: 300}); // Change -150 to desired height
  };
  const handleChangeText = text => {
    // Replace non-numeric characters with an empty string
    const numericValue = text.replace(/[^0-9]/g, '');
    setMobileNumber(numericValue);
  };
  return (
    <View style={{height: '100%'}}>
      <ProductSlider />
      <Animated.View style={[[styles.loginSection, animatedStyle]]}>
        <LinearGradient colors={bottomColors} style={styles.gradient} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              backgroundColor: 'white',
              height: '100%',
              paddingTop: '5%',
              alignItems: 'center',
            }}>
            <CustomText font="bold" style={styles.heading}>
              India's last minute app
            </CustomText>
            <CustomText font="medium" style={styles.subtext}>
              Log in or sign up
            </CustomText>
            <View style={styles.inputContainer}>
              <CustomText font="bold">+91</CustomText>
              <TextInput
                style={styles.input}
                onFocus={toggleVisibility}
                onBlur={toggleVisibility}
                cursorColor={appColors.blackText}
                onChangeText={handleChangeText}
                value={mobileNumber}
                maxLength={10}
                placeholder="Enter mobile number"
                placeholderTextColor={appColors.borderGray}
                keyboardType="number-pad"
              />
            </View>
            <CustomButton
              disabled={true}
              title="Continue"
              style={{paddingBottom: 16}}
            />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: appColors.cardBg,
                width: '100%',
                marginTop: 10,
                borderTopWidth: 0.5,
                borderTopColor: appColors.borderGray,
                paddingVertical: '3.6%',
                justifyContent: 'center',
              }}>
              <CustomText style={{fontSize: 10, opacity: 0.7}}>
                By continuing, you agree to our :{' '}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 10,
                  opacity: 0.7,
                  textDecorationLine: 'underline', // Applies the underline
                  textDecorationStyle: 'dotted',
                }}>
                Term & Services{' '}
              </CustomText>
              <CustomText style={{fontSize: 10, opacity: 0.7}}> & </CustomText>
              <CustomText
                style={{
                  fontSize: 10,
                  opacity: 0.7,
                  textDecorationLine: 'underline', // Applies the underline
                  textDecorationStyle: 'dotted',
                }}>
                {' '}
                Privacy policy{' '}
              </CustomText>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{height: 28, width: 65}}
          />
        </View>
      </Animated.View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onSkip}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(54, 67, 92, 0.4)',
          borderRadius: 20,
          paddingBottom: 5,
          paddingHorizontal: 10,
        }}>
        <CustomText style={{color: appColors.background}}>
          Skip login
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'red',
  },
  loginSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '49.5%',
  },
  logo: {
    backgroundColor: appColors.primary,
    position: 'absolute',
    left: screenWidth / 2.5,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 15,
    top: 25,
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
  heading: {
    fontSize: 30,
    opacity: 0.9,
  },
  subtext: {
    fontSize: 17,
    opacity: 0.5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: '3%',
    borderWidth: 0.8,
    borderColor: appColors.borderGray,
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: '6%',
    marginBottom: '3%',
    elevation: 1,
    backgroundColor: appColors?.background,
  },
  input: {
    paddingVertical: 10,
    width: '100%',
    //backgroundColor: 'red',
    paddingStart: 10,
  },
});
