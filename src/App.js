import React, { useState } from "react";
import Header from "./components/Layout/Header";
import MealsSummary from "./components/Meal/MealsSummary";
import AvailableMeals from "./components/Meal/AvailableMeals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [show, setShow] = useState(false);

  const showCart = () => {
    setShow(true);
  };

  const hideCart = () => {
    setShow(false);
  };

  return (
    <CartProvider>
      <Header onShowCart={showCart} />
      {show && <Cart onHideCart={hideCart} />}
      <MealsSummary />
      <AvailableMeals />
    </CartProvider>
  );
}

export default App;
