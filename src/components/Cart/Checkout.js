import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const inputNameRef = useRef();
  const inputAddressRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    postal: true,
    city: true,
  });

  const isNotEmpty = (value) => {
    return value.trim() !== "";
  };

  const isFiveDigit = (value) => {
    return value.trim().length === 5;
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredAddress = inputAddressRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    const enteredNameIsValid = isNotEmpty(enteredName);
    const enteredAddressIsValid = isNotEmpty(enteredAddress);
    const enteredPostalIsValid = isFiveDigit(enteredPostal);
    const enteredCityIsValid = isNotEmpty(enteredCity);

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    setFormValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div
        className={`${classes.control} ${
          !formValidity.name ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={inputNameRef} type="text" id="name"></input>
        {!formValidity.name && <p>The name must not be empty</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.address ? classes.invalid : ""
        }`}
      >
        <label htmlFor="address">Address</label>
        <input ref={inputAddressRef} type="text" id="address"></input>
        {!formValidity.address && <p>The address must not be empty</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.postal ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal code</label>
        <input ref={inputPostalRef} type="text" id="postal"></input>
        {!formValidity.postal && <p>The postal must have 5 characters</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.city ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={inputCityRef} type="text" id="city"></input>
        {!formValidity.city && <p>The city must not be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;
