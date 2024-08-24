import axios from 'axios';

export const locationAPI = {
  getUserAddress: async values => {
    return await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${values.lat},${values.long}&key=AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is`,
      )
      .then(res => res.data);
  },
};
