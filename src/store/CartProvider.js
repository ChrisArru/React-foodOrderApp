import { useReducer } from "react";
import CartContext from "./cart-context";

const initCart = { items: [], totalAmount: 0 };

const reducerFunc = (state, action) => {
  if (action.type === "addItem") {
    const findItem = state.items.findIndex(
      (element) => element.id === action.item.id
    );
    if (findItem > -1) {
      const existingItem = state.items[findItem];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      const updatedItems = [...state.items];
      updatedItems[findItem] = updatedItem;
      return {
        items: updatedItems,
        totalAmount:
          state.totalAmount + action.item.quantity * action.item.price,
      };
    }
    return {
      items: state.items.concat(action.item),
      totalAmount: state.totalAmount + action.item.quantity * action.item.price,
    };
  }
  if (action.type === "removeItem") {
    const findItem = state.items.findIndex(
      (element) => element.id === action.itemID
    );
    if (findItem > -1) {
      const existingItem = state.items[findItem];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.itemID);
      } else {
        //NB: ricordarsi di NON assegnare un oggetto ad una nuova variabile (perchè farebbe la copia del puntatore)
        //ma bensì bisogna creare un oggetto nuovo e usare l'operatore di spread
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[findItem] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  return initCart;
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(reducerFunc, initCart);

  const addItemHandler = (item) => {
    cartDispatch({ type: "addItem", item: item });
  };

  const removeItemHandler = (id) => {
    cartDispatch({ type: "removeItem", itemID: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
