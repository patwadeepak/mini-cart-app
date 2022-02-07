import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Counter.module.css";

import { incrementItemQty, decrementItemQty } from "../miniCart/miniCartSlice";

const Counter = ({ item, disablePaste = true }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.miniCart.cart);
  const cartItem = cart.find((currentItem) => currentItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrementItemQty({ item }))}
        >
          -
        </button>
        <div className={styles.textboxLook} aria-label="show product quantity">
          {quantity}
        </div>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(incrementItemQty({ item }))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
