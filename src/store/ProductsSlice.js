import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ProductsAPI} from './api';
import {setAddressLoader} from './mapSlice';

export const getAllData = createAsyncThunk(
  'allData',
  async (val, {dispatch, rejectWithValue}) => {
    try {
      dispatch(setProductLoader(true));
      const categoriesResponse = await ProductsAPI?.getProductsCategories();
      const allProductsListResponse = await ProductsAPI?.getAllProducts();
      let trimData = [...categoriesResponse?.data];
      trimData?.splice(-3);
      dispatch(setProductsCategories(trimData));
      dispatch(setAllProductsData(allProductsListResponse?.data));
      dispatch(setProductLoader(false));
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(setProductLoader(false));
        return rejectWithValue({hasError: error.response.data.message});
      }
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsCategories: [],
    allProducts: [],
    productsLoader: true,
  },
  reducers: {
    setProductLoader: (state, action) => {
      state.productsLoader = action.payload;
    },
    setProductsCategories: (state, action) => {
      state.productsCategories = action.payload;
    },
    setAllProductsData: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {setProductLoader, setProductsCategories, setAllProductsData} =
  productsSlice.actions;

export default productsSlice.reducer;
