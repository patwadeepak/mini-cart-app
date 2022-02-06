import React from "react";
import { useSelector } from "react-redux";
import { SiReact, SiRedux } from "react-icons/si";
import styles from "./ProductRow.module.css";
import Counter from "../counter/Counter";

const ProductRow = ({ product }) => {
  const cart = useSelector((state) => state.miniCart.cart);
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
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
        <Counter id={product.id} quantity={quantity} />
      </div>
      <div
        className={`${styles.centerVertically} ${styles.price}`}
      >{`${product.currency}${product.price}`}</div>
    </div>
  );
};

export default ProductRow;
