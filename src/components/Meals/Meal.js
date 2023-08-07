import { useContext } from "react";

import CartContext from "../../context/cartContext";
import MealForm from "./MealForm";

import classes from "./Meal.module.css";

export default function Meal({ data, inputId }) {
  const { id, name, description, price } = data;
  const context = useContext(CartContext);

  function addToCartHandler(amount) {
    context.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>
        <MealForm inputId={inputId} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
