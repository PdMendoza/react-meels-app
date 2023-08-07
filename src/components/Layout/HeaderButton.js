import { useContext, useEffect, useState } from "react";
import CartIcon from "../../assets/CartIcon";
import CartContext from "../../context/cartContext";
import classes from "./HeaderButton.module.css";

export function HeaderButton({ onClick }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const context = useContext(CartContext);

  const cartItemsNumber = context.items.reduce((acumulator, currentItem) => {
    return acumulator + currentItem.amount;
  }, 0);

  useEffect(() => {
    if (!context.items.length) {
      return;
    }
    setShouldAnimate(true);

    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [context.items]);

  return (
    <button
      className={`${classes.button} ${shouldAnimate ? classes.bump : ""}`}
      onClick={onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
}
