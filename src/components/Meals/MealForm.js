import { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealForm.module.css";

export default function MealForm({ onAddToCart, inputId }) {
  const inputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  function submitHandler(e) {
    e.preventDefault();
    setIsAmountValid(true);

    const enteredAmount = inputRef.current.value;
    const amountNumbered = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      amountNumbered < 1 ||
      amountNumbered > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    onAddToCart(amountNumbered);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: `amount_${inputId}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      <button type="submit">+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
}
