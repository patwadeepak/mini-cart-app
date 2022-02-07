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
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.cart[index].quantity = Number(state.cart[index].quantity) + 1;
      } else {
        // product not in cart incremented then push it with quantity 1
        state.cart.push({ id: action.payload.id, quantity: 1 });
      }
    },

    decrementItemQty: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0 && state.cart[index].quantity > 0) {
        state.cart[index].quantity = Number(state.cart[index].quantity) - 1;
        // if quantity becomes 0 after decrement, remove from cart
        if (state.cart[index].quantity === 0) state.cart.splice(index, 1);
      }
    },

    setItemQty: (state, action) => {
      const { id, quantity, inputType, data } = action.payload;
      // validate input to be zero/positive integers
      let isInputValid = true;
      if (inputType === "insertText") {
        isInputValid = data.match(/[0-9]/);
      }

      const index = state.cart.findIndex((item) => item.id === id);
      if (isInputValid && quantity) {
        if (index >= 0) {
          state.cart[index].quantity = Number(quantity);
        } else if (quantity) {
          state.cart.push({
            id: action.payload.id,
            quantity: Number(quantity),
          });
        }
      }

      // if quantity set to 0, remove from cart
      if (index >= 0 && Number(quantity) === 0) {
        state.cart.splice(index, 1);
      }
    },

    removeItem: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
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
              id: item.id,
              quantity: 1,
              title: item.title,
              price: item.price,
            };
          })
        : state.cart;
    },
  },
});

export const {
  incrementItemQty,
  decrementItemQty,
  setItemQty,
  removeItem,
  toggleMiniCartShow,
  setMiniCartShow,
} = miniCartSlice.actions;

export default miniCartSlice.reducer;
