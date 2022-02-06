import React from "react";
import { useSelector } from "react-redux";
import MiniCartPopOver from "../miniCartPopOver/MiniCartPopOver";
import styles from "./MiniCart.module.css";

const MiniCart = () => {
  const show = useSelector((state) => state.miniCart.show);
  const cart = useSelector((state) => state.miniCart.cart);
  return (
    show && (
      <div name={"miniCart"}>
        <div className={styles.upArrow}></div>
        <MiniCartPopOver cart={cart} />
      </div>
    )
  );
};

export default MiniCart;
