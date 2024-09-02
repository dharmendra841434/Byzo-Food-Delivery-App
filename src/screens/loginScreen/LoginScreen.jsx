import {
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fatchUserAddress, setLocationPermission} from '../../store/mapSlice';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import {storeLocalStorageData} from '../../utils/helperfun';
import {useNavigation} from '@react-navigation/native';
import UserLogin from './UserLogin';

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

  useEffect(() => {
    showNavigationBar();
  }, []);

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;
