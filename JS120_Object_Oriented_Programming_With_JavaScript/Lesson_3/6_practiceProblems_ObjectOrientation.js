// Practice Problems: Object Orientation
// In these problems, we will be building an object-oriented inventory management system.

// Question 1: 
// Suppose we want to use code to keep track of products in our hardware store's inventory. A first stab might look something like this:
/*
let scissorsId = 0;
let scissorsName = 'Scissors';
let scissorsStock = 8;
let scissorsPrice = 10;

let drillId = 1;
let drillName = 'Cordless Drill';
let drillStock = 15;
let drillPrice = 45;
*/
/*
let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,
};
*/









/*
function createProduct(productId, productName, productStock, productPrice) {

  let product = {
    Id: productId,
    Name: productName,
    Stock: productStock,
    Price: productPrice,
  };

  return product;
}

let scissor = createProduct(0, 'Scissors', 8, 10);
console.log(scissor.Id); // 0
console.log(scissor.Name); // 'Scissors'
console.log(scissor.Stock); // 8
console.log(scissor.Price); // 10

let drill = createProduct(1, 'Cordless Drill', 15, 45);
console.log(drill.Id); // 1
console.log(drill.Name); // 'Cordless Drill'
console.log(drill.Stock); // 15
console.log(drill.Price); // 45

*/

/*
2. Our new organization also makes it easier to write functions dealing with the products, because we can now take advantage of conventions in the objects' data. Create a function that takes one of our product objects as an argument, and sets the object's price to a non-negative number of our choosing, passed in as a second argument. If the new price is negative, alert the user that the new price is invalid.

*/

/*
function setProductPrice(product, newPrice) {
  if (newPrice < 0) {
    alert("The new price is invalid");
  } else {
    product.price = newPrice;
  }
}

let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
};

// setProductPrice(scissors, -9);
setProductPrice(scissors, 12);
console.log(scissors); // { id: 0, name: 'Scissors', stock: 8, price: 12 }
*/

/*
Question 3:
It would also be useful to have the ability to output descriptions of our product objects. Implement such a function following the example below:

describeProduct(scissors);
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8

*/
/*
function describeProduct(product) {
  console.log(`Name: ${product.name}`);
  console.log(`ID: ${product.id}`);
  console.log(`Price: ${'$' + product.price}`);
  console.log(`Stock: ${product.stock}`);
}

let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
};

describeProduct(scissors);
*/

/*
Question 4:
We want our code to take an object-oriented approach to keeping track of the products, and although the functions we just wrote work fine, since they are manipulating data in the objects, we should place them in the objects themselves. Rewrite the code such that the functions describeProduct and setProductPrice become methods describe and setPrice on both our scissors and drill objects.

*/
/*
let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,

  describe: function () {
    console.log("Name: " + this.name);
    console.log("ID: " + this.id);
    console.log("Price: $" + this.price);
    console.log("Stock: " + this.stock);
  },

  setPrice: function (newPrice) {
    if (newPrice >= 0) {
      this.price = newPrice;
    } else {
      alert("Invalid price!");
    }
  },
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,

  describe: function () {
    console.log("Name: " + this.name);
    console.log("ID: " + this.id);
    console.log("Price: $" + this.price);
    console.log("Stock: " + this.stock);
  },

  setPrice: function (newPrice) {
    if (newPrice >= 0) {
      this.price = newPrice;
    } else {
      alert("Invalid price!");
    }
  },
};
*/

/*
QUestion 5: This solution has brought us closer to our object-oriented ideal, but has also introduced some inefficiency, insofar as our setPrice and describe methods are duplicated in each object, and we will have to type out this code for each new object we want to create. One solution to this problem is to stop manually creating each object, and instead use a factory function to generate them. Create a new function createProduct which takes arguments for id, name, stock, and price and also adds setPrice and describe to the new object.

*/

function createProduct(id, name, stock, price) {
  let product = {
    id: id,
    name: name,
    stock: stock,
    price: price,

    setPrice: function (newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        alert("Invalid price!");
      }
    },

    describe: function () {
      console.log("Name: " + this.name);
      console.log("ID: " + this.id);
      console.log("Price: $" + this.price);
      console.log("Stock: " + this.stock);
    },

  };

  return product;
}

let scissors = createProduct(0, 'Scissors', 10, 8);
console.log(scissors);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
console.log(drill);
let saw = createProduct(2, 'Circular Saw', 12, 95);
console.log(saw);
let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
console.log(hammer);
let boxCutter = createProduct(4, 'Box Cutter', 41, 15);
console.log(boxCutter);












