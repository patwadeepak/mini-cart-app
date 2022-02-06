import React from "react";
import MiniCartItem from "../miniCartItem/MiniCartItem";
import styles from "./MiniCartPopOver.module.css";
import miniCartItemStyles from "../miniCartItem/MiniCartItem.module.css";

const MiniCartPopOver = ({ cart }) => {
  const itemCount = cart.filter((item) => item.quantity > 0).length;
  return (
    <div className={styles.miniCartPopOver}>
      {itemCount ? (
        cart.map((item, index) => <MiniCartItem item={item} key={index} />)
      ) : (
        <div className={miniCartItemStyles.miniCartItemContainer}>
          {"Your cart is empty. Let's do some shopping"}
        </div>
      )}
    </div>
  );
};

export default MiniCartPopOver;
