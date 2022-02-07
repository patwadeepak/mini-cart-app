import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./MiniCartItem.module.css";
import { removeItem } from "../miniCart/miniCartSlice";
import { IoClose } from "react-icons/io5";

const MiniCartItem = ({ item }) => {
  const { id, quantity } = item;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList.products);
  const { title, price } = products.find((item) => item.id === id);

  return (
    <div className={styles.miniCartItemContainer}>
      <div
        className={styles.closeIcon}
        onClick={() => dispatch(removeItem({ item }))}
        aria-label="remove button"
      >
        <IoClose />
      </div>
      <div className={styles.titleAndPrice}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>{`$${price * quantity}`}</div>
      </div>
      <div className={styles.quantity}>{`Qty ${quantity}`}</div>
    </div>
  );
};

export default MiniCartItem;
