import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
const storeLocalStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getLocalStorageData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
  }
};

const saveAdressOnLocalStorage = async (key, value) => {
  try {
    const currentTime = new Date().getTime();
    const expiryTime = 5 * 60 * 1000; // 8 hours in milliseconds
    const data = {value, expiry: currentTime + expiryTime};

    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data with expiry', error);
  }
};

const getLocalStorageAddress = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;

    const parsedData = JSON.parse(data);
    const currentTime = new Date().getTime();

    if (currentTime > parsedData.expiry) {
      await AsyncStorage.removeItem(key); // Delete if expired
      return null;
    }

    return parsedData.value;
  } catch (error) {
    console.error('Error retrieving data with expiry', error);
    return null;
  }
};

function extractDigits(fullAddress) {
  const regex = /\b629\d{3}\b/g;
  const matches = fullAddress.match(regex);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
}

function testExtractDigits(fullAddress) {
  const regex = /\b841\d{3}\b/g;
  const matches = fullAddress.match(regex);
  if (matches) {
    return matches[0];
  } else {
    return null;
  }
}

function extractAddress(data) {
  const {structured_formatting, description} = data;

  // Extracting the main text as the address title
  const addressTitle = structured_formatting.main_text;

  // Using the description as the full address
  const addressDescription = description;

  return {
    addressTitle,
    addressDescription,
  };
}

function splitAddressAtFirstComma(addressString) {
  // Find the index of the first comma
  const indexOfFirstComma = addressString.indexOf(',');

  if (indexOfFirstComma === -1) {
    // If there's no comma, return an empty string
    return '';
  }

  // Extract the remaining part after the first comma
  const remainingPart = addressString.substring(indexOfFirstComma + 1).trim();

  return remainingPart;
}

const isEmptyObject = obj => {
  // Check if the object is not null and is of type 'object'
  if (obj && typeof obj === 'object') {
    // Return true if the object has no own enumerable properties
    return Object.keys(obj).length === 0;
  }
  // If not an object, return false
  return false;
};

const getLocationPermissionStatus = async () => {
  const status = await checkLocationPermission();
  return status;
};

const checkIsWithinKanyakumari = fullAddress => {
  const extractedDigits = extractDigits(fullAddress);
  // const extractedDigits = testExtractDigits(fullAddress);
  return !!extractedDigits;
};

const fixedZoomLevel = {
  latitudeDelta: 0.0092, // This defines the zoom level
  longitudeDelta: 0.0021, // This defines the zoom level
};

function numberToArray(num) {
  // Convert the number to a string, then split it into an array of characters
  // Convert each character back to a number
  return num.toString().split('');
}

const showToastWithGravityAndOffset = message => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

function addEllipsis(str, maxLength) {
  if (str?.length > maxLength) {
    return str?.substring(0, maxLength - 3) + '...';
  }
  return str;
}

export {
  storeLocalStorageData,
  getLocalStorageData,
  extractDigits,
  extractAddress,
  splitAddressAtFirstComma,
  isEmptyObject,
  testExtractDigits,
  getLocationPermissionStatus,
  checkIsWithinKanyakumari,
  fixedZoomLevel,
  numberToArray,
  showToastWithGravityAndOffset,
  addEllipsis,
  getLocalStorageAddress,
  saveAdressOnLocalStorage,
};
