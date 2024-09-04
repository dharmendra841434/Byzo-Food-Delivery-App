import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {LoginAPI} from './api';

export const sendLoginOtp = createAsyncThunk(
  'login_otp',
  async (mobile, {dispatch, rejectWithValue}) => {
    try {
      const response = await LoginAPI.sendOtp(mobile);

      console.log(response, 'otp response');
    } catch (error) {
      console.log(error);

      if (error.response) {
        dispatch(setOtpVerificationLoader(false));
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isOpenDrawer: false,
  },
  reducers: {
    setIsOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
  },
});

export const {setIsOpenDrawer} = userSlice.actions;

export default userSlice.reducer;
