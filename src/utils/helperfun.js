import AsyncStorage from '@react-native-async-storage/async-storage';
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
  //const extractedDigits = extractDigits(fullAddress);
  const extractedDigits = testExtractDigits(fullAddress);
  return !!extractedDigits;
};

const fixedZoomLevel = {
  latitudeDelta: 0.0092, // This defines the zoom level
  longitudeDelta: 0.0021, // This defines the zoom level
};
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
};
