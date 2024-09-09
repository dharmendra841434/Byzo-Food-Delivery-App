import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import appColors from '../utils/appColors';
import CustomText from '../components/CustomText';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const NoInternetConnection = () => {
  const navigation = useNavigation();
  const tryAgain = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        console.log('connested');
        navigation.goBack();
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'No Connection check your network',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    });
  };
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={appColors?.background} />
      <Image
        source={require('../assets/images/offline.png')}
        style={{height: 200, width: 200}}
      />
      <CustomText font="bold" style={styles.heading}>
        No internet connection
      </CustomText>
      <CustomText style={styles.subText}>Please check your network</CustomText>
      <TouchableOpacity
        onPress={tryAgain}
        activeOpacity={0.7}
        style={styles.button}>
        <CustomText style={{fontSize: 13, color: appColors.secondry}}>
          Try Again
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors?.background,
    alignItems: 'center',
    paddingTop: '50%',
  },
  heading: {
    fontSize: 19,
  },
  subText: {
    fontSize: 13,
    opacity: 0.6,
  },
  button: {
    borderWidth: 1,
    borderColor: appColors?.secondry,
    marginTop: '5%',
    paddingHorizontal: '2%',
    borderRadius: 5,
    paddingBottom: 5,
  },
});

export default NoInternetConnection;
