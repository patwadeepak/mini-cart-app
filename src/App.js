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

/*

0. Test Converage
2. Set Colors, animations, hover, focus, active etc...
3. Put Comments
4. Remove miniCart slice and use only products slice
4.1 Make components resusable also, 
    if possible like make counter increment, decrement as props.
    if possible make a List component that replaces ProductList and miniCartPopover
4.3 Reduce popOver width, since so much space is left in middle empty
4.4 row(not(nthlast child)) use it put bottom border for minicartItems
4.5 put a horizontal separator line at the end of miniCart list as in techgig
5. Push Code to github and host it also
6. Prepare PPT and submit it
7. Prepare Video and submit it
8. Zip and submit it

9. Update Resume
10. Update Your Website
11. Deploy Resume site

*/
