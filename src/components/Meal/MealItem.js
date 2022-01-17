import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const ctx = useContext(CartContext);

  const addCartItemHandler = (amount) => {
    const itemToAdd = {
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: amount,
    };

    ctx.addItem(itemToAdd);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddCartItem={addCartItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;
