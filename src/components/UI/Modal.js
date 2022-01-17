import reactDom from "react-dom";
import classes from "./Modal.module.css";
import React from "react";

const Modal = (props) => {
  const Backdrop = () => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>;
  };

  const Overlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {reactDom.createPortal(<Backdrop />, document.getElementById("modal"))}
      {reactDom.createPortal(<Overlay>{props.children}</Overlay>, document.getElementById("modal"))}
    </React.Fragment>
  );
};

export default Modal;
