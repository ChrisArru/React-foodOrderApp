import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [animated, setAnimated] = useState(false);

  //devo fare destructuring dell'oggetto items perchè non posso inserire come dipendenza di useEffect ctx.items dà errore
  const { items } = ctx;

  //reduce() permette di ciclare su tutto l'array eseguendo la funzione che viene passata.
  //In questo caso è stata utilizzata per sommare le quantità dei prodotti
  const totalCartItems = ctx.items.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  useEffect(() => {
    if (items.length === 0) return;
    setAnimated(true);
    const timer = setTimeout(() => {
      setAnimated(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [items]);

  const btnClasses = `${classes.button} ${animated ? classes.bump : ""}`;
  return (
    <div>
      <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Cart</span>
        <span className={classes.badge}>{totalCartItems}</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
