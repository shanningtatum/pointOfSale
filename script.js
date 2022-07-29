const app = {};

app.$sandwichList = $(".sandwichList ul");
app.$drinksList = $(".drinksList ul");
app.$sidesList = $(".sidesList ul");
app.$categoryLinks = $(".categoryLinks");
app.$menu = $(".menu");
app.$orderInfo = $(".orderInfo");
app.$receiptList = $(".receiptList");

// STATES
let cart = [];
let grandTotal = [];

// sets the max number of Total Items allowed to 0;
let totalItems = 0;

// selecting tab to open menu
app.openMenu = function () {
  app.$categoryLinks.on("click", function (e) {
    app.$selectedTab = $(`#${e.target.innerText.toLowerCase()}`);

    // REMOVE all display properties for each menu
    app.$menu.each(function () {
      $(this).css("display", "none");
    });

    // REMOVE all active class
    app.$categoryLinks.each(function () {
      $(this).removeClass("active");
    });

    app.$selectedTab.css("display", "flex");
    app.$selectedTab.addClass("active");
  });
};

// renders product on menu list
app.renderProducts = () => {
  app.sandwiches.forEach((item) => {
    app.$sandwichList.append(
      `<li><button class="menuItemButton" id='${item.id}'><img src='${item.image}'><p>${item.name}</p><p>$${item.price}</p></button></li>`
    );
  });
  app.drinks.forEach((item) => {
    app.$drinksList.append(
      `<li><button class="menuItemButton" id='${item.id}'><img src='${item.image}'><p>${item.name}</p><p>$${item.price}</p></button></li>`
    );
  });
  app.sides.forEach((item) => {
    app.$sidesList.append(
      `<li><button class="menuItemButton" id='${item.id}'><img src='${item.image}'><p>${item.name}</p><p>$${item.price}</p></button></li>`
    );
  });
};

// setup event listener for menu item buttons
app.setupEventListener = function () {
  app.$menuItemButton = $(".menuItemButton");

  app.$menuItemButton.on("click", function () {
    totalItems++;
    if (totalItems < 10) {
      app.checkOrder(this.id);
    } else {
      alert("too many items");
    }
  });
};

// adds item to order on receipt list
app.checkOrder = function (id) {
  // Check if product already exists in cart

  if (cart.some((item) => item.id == id)) {
    app.changeQty("plus", id);
    console.log("item exists!");
  } else {
    const item = app.products.find((product) => product.id == id);

    console.log(item);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });

    console.log(cart);
  }
  //   app.$orderInfo.append(`<ul class="orderItem">
  //   <li>${item}</li>
  //   <li>
  //     <button>
  //       <i class="fa-solid fa-circle-minus"></i>
  //     </button>
  //     2
  //     <button>
  //       <i class="fa-solid fa-circle-plus"></i>
  //     </button>
  //   </li>
  //   <li>${price}</li>
  // </ul>`);
};

// update quantity for order
app.changeQty = function (action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    console.log(item);

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
        console.log("subtract");
      } else if (action === "plus") {
        numberOfUnits++;
        console.log("add");
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });
};

app.addToOrder = () => {};
// product list
// sandwiches
app.sandwiches = [
  { id: 0, name: "Burger", price: 15, image: "../../assets/burger.png" },
  { id: 1, name: "Sandwich", price: 10, image: "../../assets/sandwich.png" },
  { id: 2, name: "Burrito", price: 10, image: "../../assets/burrito.png" },
  { id: 3, name: "Taco", price: 10, image: "../../assets/tacos.png" },
];
// drinks
app.drinks = [
  { id: 4, name: "Soda", price: 2, image: "../../assets/soda.png" },
  { id: 5, name: "Milkshake", price: 5, image: "../../assets/milkshake.png" },
  { id: 6, name: "Water", price: 2, image: "../../assets/water.png" },
];
// sides
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

// overall product list

app.products = [
  { id: 0, name: "Burger", price: 15, image: "../../assets/burger.png" },
  { id: 1, name: "Sandwich", price: 10, image: "../../assets/sandwich.png" },
  { id: 2, name: "Burrito", price: 10, image: "../../assets/burrito.png" },
  { id: 3, name: "Taco", price: 10, image: "../../assets/tacos.png" },
  { id: 4, name: "Soda", price: 2, image: "../../assets/soda.png" },
  { id: 5, name: "Milkshake", price: 5, image: "../../assets/milkshake.png" },
  { id: 6, name: "Water", price: 2, image: "../../assets/water.png" },
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
  app.openMenu();
  app.setupEventListener();
};

$(() => {
  app.init();
});
