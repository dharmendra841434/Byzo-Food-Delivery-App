import {configureStore, Tuple} from '@reduxjs/toolkit';
import mapReducer from './mapSlice';
import userReducer from './userSlice';
import productsReducer from './ProductsSlice';
export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
    products: productsReducer,
  },
});
