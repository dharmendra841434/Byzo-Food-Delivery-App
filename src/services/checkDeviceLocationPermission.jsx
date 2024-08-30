import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkLocationPermission = () => {
  try {
    const result = check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // or PERMISSIONS.IOS.LOCATION_WHEN_IN_USE for iOS

    switch (result) {
      case RESULTS.UNAVAILABLE:
        // Return 'unavailable' when the feature is not available on this device.
        return 'unavailable';

      case RESULTS.DENIED:
        // Return 'denied' when the permission has not been requested / is denied but requestable.
        return 'denied';

      case RESULTS.LIMITED:
        // Return 'limited' when the permission is limited: some actions are possible.
        return 'limited';

      case RESULTS.GRANTED:
        return 'granted';

      case RESULTS.BLOCKED:
        // Return 'blocked' when the permission is denied and not requestable anymore.
        return 'blocked';

      default:
        // Handle any unexpected cases.
        return 'unknown';
    }
  } catch (error) {
    console.log('Error checking permission:', error);
    return 'error';
  }
};

export default checkLocationPermission;
