import classes from "./CartItem.module.css";

const CartItem = ({ item, onRemove, onAdd }) => {
  const { price, name, amount, id } = item;
  return (
    <li key={id} className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${price.toFixed(2)}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
