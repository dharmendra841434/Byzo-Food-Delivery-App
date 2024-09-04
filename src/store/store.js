import {configureStore, Tuple} from '@reduxjs/toolkit';
import mapReducer from './mapSlice';
import userReducer from './userSlice';
export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
  },
});
