const app = {};

app.$sandwichList = $(".sandwichList");
app.$drinksList = $(".drinksList");
app.$sidesList = $(".sidesList");

app.renderProducts = () => {
  app.sandwiches.forEach((item) => {
    app.$sandwichList.append(
      `<img src='${item.image}'><p>${item.name}</p><p>$ ${item.price}</p>`
    );
  });
  app.drinks.forEach((item) => {
    app.$drinksList.append(
      `<img src='${item.image}'><p>${item.name}</p><p>$ ${item.price}</p>`
    );
  });
  app.sides.forEach((item) => {
    app.$sidesList.append(
      `<img src='${item.image}'><p>${item.name}</p><p>$ ${item.price}</p>`
    );
  });
};

app.sandwiches = [
  { id: 0, name: "Burger", price: 15, image: "../../assets/burger.png" },
  { id: 1, name: "Sandwich", price: 10, image: "../../assets/sandwich.png" },
  { id: 2, name: "Burrito", price: 10, image: "../../assets/burrito.png" },
  { id: 3, name: "Taco", price: 10, image: "../../assets/tacos.png" },
];

app.drinks = [
  { id: 4, name: "Soda", price: 2, image: "../../assets/soda.png" },
  { id: 5, name: "Milkshake", price: 5, image: "../../assets/milkshake.png" },
  { id: 6, name: "Water", price: 2, image: "../../assets/water.png" },
];

app.sides = [
  { id: 7, name: "Fries", price: 1, image: "../../assets/fries.png" },
  { id: 8, name: "Salad", price: 3, image: "../../assets/salad.png" },
  {
    id: 9,
    name: "Onion Rings",
    price: 1,
    image: "../../assets/onionrings.png",
  },
  { id: 10, name: "Poutine", price: 5, image: "../../assets/poutine.png" },
];

app.init = () => {
  app.renderProducts();
};

$(() => {
  app.init();
});
