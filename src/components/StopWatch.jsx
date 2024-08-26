import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {setLocationPermission} from '../store/mapSlice';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const dispatch = useDispatch();
  const checkPermission = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) // or PERMISSIONS.IOS.LOCATION_WHEN_IN_USE for iOS
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available on this device.');
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable.',
            );
            break;
          case RESULTS.LIMITED:
            console.log(
              'The permission is limited: some actions are possible.',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted.');

            break;
          case RESULTS.BLOCKED:
            console.log(
              'The permission is denied and not requestable anymore.',
            );
            break;
        }
      })
      .catch(error => {
        console.log('Error checking permission:', error);
      });
  };

  useEffect(() => {
    let timer;
    if (locationPermission === 'denied') {
      timer = setInterval(() => {
        checkPermission();
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [locationPermission]);

  const startTimer = () => dispatch(setLocationPermission('denied'));
  const pauseTimer = () => dispatch(setLocationPermission('granted'));
  const resetTimer = () => {
    dispatch(setLocationPermission('granted'));
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{seconds}s</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Start"
          onPress={startTimer}
          disabled={locationPermission === 'denied'}
        />
        <Button
          title="Pause"
          onPress={pauseTimer}
          disabled={!locationPermission === 'denied'}
        />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timerText: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default Stopwatch;
