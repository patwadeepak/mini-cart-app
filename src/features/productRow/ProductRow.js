import React from "react";
import { SiReact, SiRedux } from "react-icons/si";
import styles from "./ProductRow.module.css";
import Counter from "../counter/Counter";

const ProductRow = ({ product }) => {
  return (
    <div className={styles.productRowContainer}>
      <div className={styles.container}>
        <div className={`${styles.icon} ${styles.centerVertically}`}>
          {product.id % 2 ? <SiReact size={40} /> : <SiRedux size={40} />}
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.description}>{product.desc}</div>
      </div>
      <div className={styles.centerVertically}>
        <Counter item={product} />
      </div>
      <div
        className={`${styles.centerVertically} ${styles.price}`}
      >{`${product.currency}${product.price}`}</div>
    </div>
  );
};

export default ProductRow;
