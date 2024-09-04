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
