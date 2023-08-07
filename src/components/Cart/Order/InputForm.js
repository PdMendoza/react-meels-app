import { useContext, useState } from "react";
import { ordersURL } from "../../../constants/meals";
import CartContext from "../../../context/cartContext";
import useFetch from "../../../hooks/useFetch";
import useInput from "../../../hooks/useInput";

import classes from "./InputForm.module.css";

export default function InputForm({ onClose, onCloseCart }) {
  const { loading, error, sendRequest: createOrder } = useFetch();
  const context = useContext(CartContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    handleChange: handleNameChange,
    handleBlur: handleNameBlur,
    handleReset: resetName
  } = useInput("", (value) => value.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    handleReset: resetEmail
  } = useInput("", (value) => value.trim() !== "" && value.includes("@"));

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    handleChange: handleAddressChange,
    handleBlur: handleAddressBlur,
    handleReset: resetAddress
  } = useInput("", (value) => value.trim().length >= 5);

  let formIsValid = false;

  if (nameIsValid && emailIsValid && addressIsValid) {
    formIsValid = true;
  }

  function submitHandler(e) {
    e.preventDefault();

    if (!formIsValid) return;

    createOrder(
      ordersURL,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          address,
          items: context.items,
          orderTotal: context.totalAmount.toFixed(2)
        }),
        headers: {
          "Content-type": "application/json"
        }
      },
      (data) => {
        if (data) setIsSubmitted(true);
      }
    );

    resetName();
    resetEmail();
    resetAddress();
  }

  function finishProcess() {
    onClose();
    onCloseCart();
    context.clearCart();
  }

  let content = (
    <form onSubmit={submitHandler}>
      <div className={classes["control-group"]}>
        <div
          className={
            nameHasError
              ? `${classes["form-control"]} ${classes["invalid"]}`
              : classes["form-control"]
          }
        >
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          {nameHasError && (
            <p className={classes["error-text"]}>Name input can not be empty</p>
          )}
        </div>
        <div
          className={
            emailHasError
              ? `${classes["form-control"]} ${classes["invalid"]}`
              : classes["form-control"]
          }
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {emailHasError && (
            <p className={classes["error-text"]}>Email input is invalid</p>
          )}
        </div>
      </div>
      <div
        className={
          addressHasError
            ? `${classes["form-control"]} ${classes["invalid"]}`
            : classes["form-control"]
        }
      >
        <label htmlFor="address">Address</label>
        <textarea
          type="address"
          id="address"
          value={address}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
          maxLength="60"
          rows="3"
          cols="40"
        />
        {addressHasError && (
          <p className={classes["error-text"]}>
            Address input must be at least 5 characters
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={onClose}>
          Cancel
        </button>
        <button className={classes.button} disabled={!formIsValid || loading}>
          Place order
        </button>
      </div>
    </form>
  );

  if (loading && !isSubmitted) {
    content = (
      <section className={classes.status}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    content = (
      <section className={classes.status}>
        <p>Ups! something went wrong, try again</p>
      </section>
    );
  }

  if (!loading && isSubmitted) {
    content = (
      <section className={classes.status}>
        <p>Order placed successfully!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={finishProcess}>
            Finish
          </button>
        </div>
      </section>
    );
  }

  return <>{content}</>;
}
