import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {locationAPI} from './api';
import {extractDigits, parseAddress} from '../utils/helperfun';
import Geolocation from 'react-native-geolocation-service';

export const fatchUserAddress = createAsyncThunk(
  'address',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      const fatchAddress = async cords => {
        dispatch(setAddressLoader(true));
        const response = await locationAPI.getUserAddress(cords);
        // console.log(response, 'address response');
        if (response.results && response.results.length > 0) {
          const fullAddress = response.results[0].formatted_address;
          dispatch(setfullAddress(fullAddress));
          const extractedDigits = extractDigits(fullAddress);
          //console.log(!!extractedDigits, 'check digits');
          dispatch(setIsWithinKanyakumari(!!extractedDigits));
          dispatch(setAddressLoader(false));
        } else {
          console.log('- Full Address: No results found');
          dispatch(setfullAddress('No results found'));
          dispatch(setAddressLoader(false));
        }
      };
      Geolocation.getCurrentPosition(
        position => {
          //console.log(position, values);
          dispatch(setAddressCordinates(position?.coords));
          dispatch(setCurrentCordinates(position?.coords));
          fatchAddress({
            lat: position?.coords?.latitude,
            long: position?.coords?.longitude,
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message, 'this is error');
        },
        {enableHighAccuracy: true, timeout: 15000},
      );
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const fatchAddressByCords = createAsyncThunk(
  'changeAddress',
  async (values, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setAddressLoader(true));
      const response = await locationAPI.getUserAddress(values);
      // console.log(response, 'address response');
      if (response.results && response.results.length > 0) {
        // console.log(response.results, 'addres response');
        const fullAddress = response.results[0].formatted_address;
        dispatch(setfullAddress(fullAddress));
        const extractedDigits = extractDigits(fullAddress);
        //console.log(!!extractedDigits, 'check digits');
        dispatch(setIsWithinKanyakumari(!!extractedDigits));
        dispatch(setAddressLoader(false));
      } else {
        console.log('- Full Address: No results found');
        dispatch(setfullAddress('No results found'));
        dispatch(setAddressLoader(false));
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

// Map slice with fetching location state
export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    markerPosition: null,
    isWithinKanyakumari: true,
    fetchingLocation: false, // Add fetching location state here
    fullAddress: '',
    locationPermission: 'denied',
    addressLoader: false,
    cordinatesAddressLoader: false,
    addressCordinates: {},
    currentCordinates: {},
    confirmAddress: '',
    geolocationErrorMessage: '',
  },
  reducers: {
    setMarkerPosition: (state, action) => {
      state.markerPosition = action.payload;
    },
    setCordinatesAddressLoader: (state, action) => {
      state.cordinatesAddressLoader = action.payload;
    },
    setCurrentCordinates: (state, action) => {
      state.currentCordinates = action.payload;
    },
    setfullAddress: (state, action) => {
      state.fullAddress = action.payload;
    },
    setIsWithinKanyakumari: (state, action) => {
      state.isWithinKanyakumari = action.payload;
    },
    setAddressCordinates: (state, action) => {
      state.addressCordinates = action.payload;
    },
    setFetchingLocation: (state, action) => {
      state.fetchingLocation = action.payload; // Add reducer to update fetching location state
    },
    setLocationPermission: (state, action) => {
      state.locationPermission = action.payload; // Add reducer to update fetching location state
    },
    setAddressLoader: (state, action) => {
      //console.log('addresss loaded called');
      state.addressLoader = action.payload; // Add reducer to update fetching location state
    },
    setConfirmAddress: (state, action) => {
      //console.log('addresss loaded called');
      state.confirmAddress = action.payload; // Add reducer to update fetching location state
    },
    setGeolocationErrorMessage: (state, action) => {
      //console.log('addresss loaded called');
      state.geolocationErrorMessage = action.payload; // Add reducer to update fetching location state
    },
  },
});

export const {
  setMarkerPosition,
  setIsWithinKanyakumari,
  setFetchingLocation,
  setfullAddress,
  setLocationPermission,
  setAddressLoader,
  setAddressCordinates,
  setCurrentCordinates,
  setCordinatesAddressLoader,
  setConfirmAddress,
  setGeolocationErrorMessage,
} = mapSlice.actions;

export default mapSlice.reducer;
