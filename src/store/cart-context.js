import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  removeAllItem: () => {},
});

export default CartContext;
