import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./features/header/Header";
import MiniCart from "./features/miniCart/MiniCart";
import ProductList from "./features/productList/ProductList";
import { getProducts } from "./features/productList/productListSlice";
import { setMiniCartShow } from "./features/miniCart/miniCartSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // get products from provided API Url on App load
    dispatch(getProducts());

    // reset miniCart to closed state after page refresh
    dispatch(setMiniCartShow({ show: false }));
  }, [dispatch]);

  return (
    <div className="App" role="application">
      <Header />
      <MiniCart />
      <ProductList />
    </div>
  );
};

export default App;
