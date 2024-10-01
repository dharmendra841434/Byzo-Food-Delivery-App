import axios from 'axios';
import {BASE_URL} from '../utils/constent';

export const locationAPI = {
  getUserAddress: async values => {
    return await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${values.lat},${values.long}&key=AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is`,
      )
      .then(res => res.data);
  },
  getAddressSuggetion: async input => {
    console.log(input, 'sdsa');

    return await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:in&key=AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is`,
      )
      .then(res => res.data);
  },
  getReverseLocation: async placeId => {
    return await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is`,
      )
      .then(res => res.data);
  },
};

export const LoginAPI = {
  sendOtp: async mobileNumber => {
    return await axios
      .post(`${BASE_URL}/userlogin`, {
        mobileNumber: mobileNumber,
      })
      .then(res => res.data);
  },

  verifyOtp: async values => {
    return await axios
      .post(`${BASE_URL}/VerifyOTP`, {
        mobile: values?.mobileNumber,
        otp: values?.otp,
      })
      .then(res => res.data);
  },
};

export const ProductsAPI = {
  getProductsCategories: async () => {
    return await axios
      .get(`${BASE_URL}/getAllCatogeries`)
      .then(res => res.data);
  },

  getAllProducts: async () => {
    return await axios.get(`${BASE_URL}/getByzoProducts`).then(res => res.data);
  },
};
