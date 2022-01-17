import React from "react";
import classes from "./Header.module.css";

import imgMeal from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h2> React Meals</h2>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={imgMeal} alt="A table full of food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
