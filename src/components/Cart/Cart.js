import { useContext, useState } from "react";
import CartContext from "../../context/cartContext";

import CartItem from "./CartItem";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import Order from "./Order/Order";

export default function Cart({ onClose }) {
  const context = useContext(CartContext);
  const [showOrder, setShowOrder] = useState(false);

  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItems = context.items.length > 0;

  function cartItemAddHandler(item) {
    context.addItem({
      ...item,
      amount: 1
    });
  }

  function cartItemRemoveHandler(id) {
    context.removeItem(id);
  }

  function toggleOrderModal() {
    setShowOrder((prevState) => !prevState);
  }

  return (
    <>
      {showOrder && (
        <Order onToggleModal={toggleOrderModal} onCloseCart={onClose} />
      )}
      <Modal onClose={onClose}>
        <ul className={classes["cart-items"]}>
          {context.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onAdd={cartItemAddHandler.bind(null, item)}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
          ))}
        </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button-alt"]} onClick={onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={toggleOrderModal}>
              Order
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
