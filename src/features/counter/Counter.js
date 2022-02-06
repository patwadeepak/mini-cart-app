import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Counter.module.css";

import {
  incrementItemQty,
  decrementItemQty,
  setItemQty,
} from "../miniCart/miniCartSlice";

const Counter = ({ id, quantity, disablePaste = true }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrementItemQty({ id }))}
        >
          -
        </button>
        <input
          className={styles.textbox}
          aria-label="Textbox to show counter value"
          value={quantity}
          onChange={(event) =>
            dispatch(
              setItemQty({
                id,
                quantity: event.target.value,
                inputType: event.nativeEvent.inputType,
                data: event.nativeEvent.data,
              })
            )
          }
          onPaste={(event) => {
            disablePaste && event.preventDefault();
          }}
        />
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(incrementItemQty({ id }))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
