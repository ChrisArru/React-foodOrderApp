import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const emptyCart = ctx.items.length === 0;
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartRemoveHandler = (itemID) => {
    ctx.removeItem(itemID);
  };

  const cartAddHandler = (item) => {
    ctx.addItem({ ...item, quantity: 1 });
  };

  const orderHandler = () => {
    setIsOrdering(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://reactdatabaseconnection-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    ctx.removeAllItem();
  };

  const modalContent = (
    <React.Fragment>
      <ul className={classes["cart-items"]}>
        {ctx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onRemove={cartRemoveHandler.bind(null, item.id)} //bind serve per NON richiamare la funzione ma per legare i parametri per richiami successivi
              onAdd={cartAddHandler.bind(null, item)}
            ></CartItem>
          );
        })}
      </ul>
      <div className={classes.total}>
        <span>Total amount</span>
        <span>${ctx.totalAmount.toFixed(2)}</span>
      </div>
      {isOrdering && (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {!isOrdering && (
        <div className={classes.actions}>
          <button onClick={props.onHideCart} className={classes[`button--alt`]}>
            Close
          </button>
          {!emptyCart && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Submitting order...</p>;

  const isSubmittedContent = (
    <React.Fragment>
      <p>Order submitted!</p>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes.button}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !isSubmitted && modalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && isSubmitted && isSubmittedContent}
    </Modal>
  );
};

export default Cart;
