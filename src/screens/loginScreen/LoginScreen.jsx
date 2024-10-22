import {PermissionsAndroid, ToastAndroid, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fatchUserAddress, setLocationPermission} from '../../store/mapSlice';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import {storeLocalStorageData} from '../../utils/helperfun';
import {useNavigation} from '@react-navigation/native';
import UserLogin from './UserLogin';
import appColors from '../../utils/appColors';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can access the location');
        dispatch(setLocationPermission('granted'));
        dispatch(fatchUserAddress());
      } else {
        console.log('Location permission denied');
        dispatch(setLocationPermission('denied'));
        ToastAndroid.showWithGravityAndOffset(
          'Please provide location permission for hassle free delivery',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    showNavigationBar();
    requestLocationPermission();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: appColors?.background}}>
      <StatusBar backgroundColor={'#e9f7f8'} barStyle="dark-content" />
      <UserLogin
        onSkip={() => {
          storeLocalStorageData('skip-login', 'skipped');
          if (locationPermission === 'denied') {
            navigation.replace('home');
          } else {
            dispatch(fatchUserAddress());
            navigation.replace('checking');
          }
        }}
      />
    </View>
  );
};

export default LoginScreen;
