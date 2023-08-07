const baseApiURL = process.env.REACT_APP_API_URL;

export const mealsURL = `${baseApiURL}/meels/meals.json`;

export const ordersURL = `${baseApiURL}/meels/orders.json`;

export const DUMMY_MEALS = [
  {
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99
  },
  {
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99
  },
  {
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99
  },
  {
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5
  }
];

export const enterCreateData = () => {
  DUMMY_MEALS.forEach(async (meal) => {
    const res = await fetch(mealsURL, {
      method: "POST",
      body: JSON.stringify(meal),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);
  });
};
