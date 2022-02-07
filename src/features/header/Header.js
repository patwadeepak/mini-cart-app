import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Header.module.css";
import { toggleMiniCartShow } from "../miniCart/miniCartSlice";
import { IoCartOutline, IoCart } from "react-icons/io5";

const Header = () => {
  // local state for cleaner UI update using useEffect
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // redux dispatch and select
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.miniCart.cart);

  // memoizing function using useCallback to avoid redeclaration with every render
  const updateTotalAmount = useCallback((cart) => {
    let amount = 0;
    if (cart.length === 0) {
      amount = 0;
    } else {
      amount = cart.reduce((sum, currentItem) => {
        return sum + currentItem.price * currentItem.quantity;
      }, 0);
    }

    setTotalAmount(amount);
  }, []);

  // update totalAmount when cart/products changes
  useEffect(() => {
    updateTotalAmount(cart);
  }, [cart, updateTotalAmount]);

  // memoizing function usign useCallback to avoid redeclaration with every render
  const itemCount = useCallback((cart) => {
    const count = cart.filter((item) => item.quantity > 0).length;
    setCount(count);
  }, []);

  // reactive count update when items in cart changes
  useEffect(() => {
    itemCount(cart);
  }, [cart, itemCount]);

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.container}>
          <div className={styles.totalAmount}>{`$${totalAmount}`}</div>
          <div className={styles.itemCount}>
            {`${count} ${count > 1 ? "Items" : "Item"}`}
            <span className={styles.downArrow}></span>
          </div>
          <div
            className={styles.iconContainer}
            onClick={() => dispatch(toggleMiniCartShow())}
            role="button"
          >
            {count ? <IoCart size={40} /> : <IoCartOutline size={40} />}
          </div>
        </div>
      </div>
      <div className={styles.headerContainerAfter}></div>
    </>
  );
};

export default Header;
