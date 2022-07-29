const app = {};

app.$sandwichList = $(".sandwichList ul");
app.$drinksList = $(".drinksList ul");
app.$sidesList = $(".sidesList ul");
app.$categoryLinks = $(".categoryLinks");
app.$menu = $(".menu");
app.$orderInfo = $(".orderInfo");
app.$receiptList = $(".receiptList");

// SUBTOTAL SPANS
app.$subtotalMoney = $(".subtotalMoney");
app.$discountMoney = $(".discountMoney");
app.$grandTotalMoney = $(".grandTotalMoney");
app.$totalItems = $(".totalItems");

// STATES
let cart = [];
let grandTotal = [];

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
    app.checkOrder(this.id);
  });
};

// adds item to order on receipt list
app.checkOrder = (id) => {
  // Check if product already exists in cart

  if (cart.some((item) => item.id == id)) {
    app.changeQty("plus", id);
  } else {
    const item = app.products.find((product) => product.id == id);

    console.log("adding new item");

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
    app.updateCart();
  }
};

// update quantity for order
app.changeQty = (action, id) => {
  console.log("we inchange");
  cart = cart.map((item) => {
    console.log("inside map");
    let numberOfUnits = item.numberOfUnits;
    console.log(item.numberOfUnits);

    if (item.id == id) {
      if (action === "minus" && numberOfUnits > 1) {
        console.log("decrease number of units");
        numberOfUnits--;
      } else if (action === "plus") {
        console.log("increase number of units");
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  app.updateCart();
};

app.updateCart = () => {
  app.addToOrder();
  app.updateTotals();
};

app.addToOrder = () => {
  app.$receiptList.html(""); // Clear Cart Element
  cart.forEach((item) => {
    app.$receiptList.append(`
    <ul class="orderItem">
      <li>${item.name}</li>
      <li>
        <button>
          <i class="fa-solid fa-circle-minus"></i>
        </button>
        ${item.numberOfUnits}
        <button>
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </li>
      <li>$ ${item.price} 
        <button>
          <i class="fas fa-trash"></i>
        </button>
      </li>
    </ul>`);
  });

  app.addClickEvents();
};

// ADD CLICK EVENTS FOR PLUS, MINUS, TRASH BUTTON
app.addClickEvents = () => {
  $(".orderItem button").on("click", function (e) {
    const action = e.target.className;

    const itemName =
      e.target.parentElement.parentElement.previousElementSibling.innerText;

    if (action == "fa-solid fa-circle-plus") {
      console.log("lets add");
      app.findItemIndex(itemName, "plus");
    } else if (action == "fa-solid fa-circle-minus") {
      console.log("lets subtract");

      app.findItemIndex(itemName, "minus");
    } else if (action == "fas fa-trash") {
      console.log("lets delete");
      const deleteItemName =
        e.target.parentElement.parentElement.previousElementSibling
          .previousElementSibling.innerText;
      app.findItemIndex(deleteItemName, "delete");
    }
  });
};

// SEARCHES CART ARRAY FOR ITEM ID
app.findItemIndex = (menuItem, action) => {
  cart.forEach((item, index) => {
    if (menuItem == item.name) {
      itemId = cart[index].id;

      if (action == "delete") {
        app.removeItem(itemId);
      } else {
        console.log("else", action, itemId);
        app.changeQty(action, itemId);
      }
    } else {
      console.log("not the same");
    }
  });
};

// REMOVE ITEM
app.removeItem = (id) => {
  cart = cart.filter((item) => item.id !== id);

  app.updateCart();
};

app.updateTotals = () => {
  // CALCULATES SUBTOTAL
  // STORES THE PRICE OF EACH ITEM IN ARRAY
  const subTotalArray = cart.map((item) => {
    return item.numberOfUnits * item.price;
  });
  // ADDS ALL THE NUMBERS TOGETHER IN THAT ARRAY
  const subTotal = subTotalArray.reduce((a, b) => a + b, 0);
  app.$subtotalMoney.text(subTotal);

  // CALCULATES TOTAL ITEMS
  const totalItemArray = cart.map((item) => {
    return item.numberOfUnits;
  });

  const totalItems = totalItemArray.reduce((a, b) => a + b, 0);
  app.$totalItems.text(totalItems);
};

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
