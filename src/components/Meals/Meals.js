import { useEffect, useState } from "react";
import { mealsURL } from "../../constants/meals";
import useFetch from "../../hooks/useFetch";
import Card from "../UI/Card";
import Meal from "./Meal";

import classes from "./Meals.module.css";
import Summary from "./Summary";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const { loading, error, sendRequest: requestMeals } = useFetch();

  useEffect(() => {
    requestMeals(mealsURL, undefined, (data) => {
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({ id: key, ...data[key] });
      }

      setMeals(loadedMeals);
    });
  }, [requestMeals]);

  let content = (
    <ul>
      {meals.map((meal) => (
        <Meal key={meal.id} inputId={meal.id} data={meal} />
      ))}
    </ul>
  );

  if (loading) content = <p>Loading...</p>;

  if (error) content = <p>An error ocurred, please try again.</p>;

  return (
    <div>
      <Summary />
      <Card className={error || loading ? classes.error : classes.meals}>
        <ul>{content}</ul>
      </Card>
    </div>
  );
}
