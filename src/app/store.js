import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "../features/productList/productListSlice";
import miniCartReducer from "../features/miniCart/miniCartSlice";

const configureStoreObject = {
  reducer: {
    productList: productListReducer,
    miniCart: miniCartReducer,
  },
};

export const createStore = (
  preloadedState = JSON.parse(localStorage.getItem("reduxState"))
) => {
  // Load if there is a saved state in localStorage
  if (preloadedState) {
    configureStoreObject.preloadedState = preloadedState;
    localStorage.setItem("stateLoadedFromLocalStorage", true);
  }

  return configureStore(configureStoreObject);
};

export const store = createStore();

// to store redux state in localStorage
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
