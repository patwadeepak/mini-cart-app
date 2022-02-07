import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../productList/productListSlice";

const initialState = {
  cart: [],
  show: false,
};

export const miniCartSlice = createSlice({
  name: "miniCart",
  initialState,
  reducers: {
    incrementItemQty: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.item.id
      );
      if (index >= 0) {
        state.cart[index].quantity += 1;
      } else {
        // product not in cart incremented then push it with quantity 1
        state.cart.push({ ...action.payload.item, quantity: 1 });
      }
    },

    decrementItemQty: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.item.id
      );

      if (index >= 0 && state.cart[index].quantity > 0) {
        state.cart[index].quantity -= 1;
        // if quantity becomes 0 after decrement, remove from cart
        if (state.cart[index].quantity === 0) state.cart.splice(index, 1);
      }
    },

    removeItem: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.item.id
      );
      if (index >= 0) {
        state.cart.splice(index, 1);
      }
    },

    toggleMiniCartShow: (state) => {
      state.show = !state.show;
    },

    setMiniCartShow: (state, action) => {
      state.show = action.payload.show;
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      const loadedFromLocalStorage = localStorage.getItem(
        "stateLoadedFromLocalStorage"
      );
      state.cart = !loadedFromLocalStorage
        ? action.payload.map((item) => {
            return {
              ...item,
              quantity: 1,
            };
          })
        : state.cart;
    },
  },
});

export const {
  incrementItemQty,
  decrementItemQty,
  removeItem,
  toggleMiniCartShow,
  setMiniCartShow,
} = miniCartSlice.actions;

export default miniCartSlice.reducer;
