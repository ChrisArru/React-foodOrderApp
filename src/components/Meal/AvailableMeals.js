import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://reactdatabaseconnection-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        setIsLoading(false);
        setError(true);
        throw new Error("Error fetching data");
      }

      const data = await response.json();

      const fetchedMeals = [];

      for (const key in data) {
        fetchedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(fetchedMeals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMeals();

    return () => {};
  }, [fetchMeals]);

  return (
    <section className={classes.meals}>
      {!isLoading && !error && (
        <Card>
          <ul>
            {meals.map((item) => {
              return (
                <MealItem
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                ></MealItem>
              );
            })}
          </ul>
        </Card>
      )}
      {isLoading && <p className={classes.loading}>Fetching data ...</p>}
      {error && <p className={classes.error}>Error fetching data...</p>}
    </section>
  );
};

export default AvailableMeals;
