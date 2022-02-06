import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productListAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const getProducts = createAsyncThunk(
  "productList/getProducts",
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "idle";
      state.products = action.payload;
    },
    [getProducts.rejected]: (state) => {
      state.status = "error";
      state.products = [];
    },
  },
});

export default productListSlice.reducer;
