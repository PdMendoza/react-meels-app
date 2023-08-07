import meals from "../../assets/meals.jpg";

import classes from "./Header.module.css";
import { HeaderButton } from "./HeaderButton";

export function Header({ onShowCart }) {
  return (
    <>
      <header className={classes.header}>
        <h1>Meels</h1>
        <HeaderButton onClick={onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="table with food" />
      </div>
    </>
  );
}
