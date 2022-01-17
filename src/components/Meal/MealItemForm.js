import { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    
    const enteredAmountInt = +enteredAmount;
    console.log(enteredAmountInt)
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountInt < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    props.onAddCartItem(enteredAmountInt);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{ id: props.id, type: "number", min: "0", defaultValue: "1" }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please put a right amount</p>}
    </form>
  );
};

export default MealItemForm;
