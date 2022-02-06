import React from "react";
import { useSelector } from "react-redux";
import ProductRow from "../productRow/ProductRow";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const products = useSelector((state) => state.productList.products);
  const show = useSelector((state) => state.miniCart.show);
  return (
    !show && (
      <div className={styles.productListContainer} role="list">
        {products.map((product, index) => (
          <ProductRow product={product} key={index} />
        ))}
      </div>
    )
  );
};

export default ProductList;
