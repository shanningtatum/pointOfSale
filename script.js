const app = {};

app.renderProducts = () => {
  app.sandwiches.forEach((item) => {
    console.log(item.name);
  });
  app.drinks.forEach((item) => {
    console.log(item.name);
  });
  app.sides.forEach((item) => {
    console.log(item.name);
  });
};

app.sandwiches = [
  { id: 0, name: "Burger", price: 15 },
  { id: 1, name: "Sandwich", price: 10 },
  { id: 2, name: "Burrito", price: 10 },
  { id: 3, name: "Taco", price: 10 },
];

app.drinks = [
  { id: 4, name: "Soda", price: 2 },
  { id: 5, name: "Milkshake", price: 5 },
  { id: 6, name: "Water", price: 2 },
];

app.sides = [
  { id: 7, name: "Fries", price: 1 },
  { id: 8, name: "Salad", price: 3 },
  { id: 9, name: "Onion Rings", price: 1 },
  { id: 10, name: "Poutine", price: 5 },
];

app.init = () => {
  app.renderProducts();
};

$(() => {
  app.init();
});
