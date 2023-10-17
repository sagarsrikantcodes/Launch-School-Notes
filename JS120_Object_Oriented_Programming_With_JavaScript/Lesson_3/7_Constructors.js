// Constructors
/*
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.started = false;

  this.start = function () {
    this.started = true;
  };

  this.stop = function () {
    this.started = false;
  };
}

let corolla = new Car('Toyota', 'Corolla', 2016);
let leaf = new Car('Nissan', 'LEAF', 2018);
let nova = new Car('Chevrolet', 'Nova', 1974);

console.log(corolla.make); // Toyota
console.log(corolla.model); // Corolla
console.log(corolla.year); // 2016
console.log(corolla.started); // false

corolla.start();
console.log(corolla.started); // true

console.log(Car()); // undefined
console.log(Object.getPrototypeOf(new Car())); // {}
*/
/*
let Car = (make, model, year) => {
  this.make = make;
  this.model = model;
  this.year = year;
}
*/

// new Car(); // TypeError: Car is not a constructor
/*
function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  return { foo: 1 };
}

let fluffy = new Cat('fluffy', 'Persian', 15);
console.log(fluffy); // { foo: 1 }
console.log(fluffy.weight); // undefined
console.log(fluffy.foo); // 1
*/
/*
function Car(args) {
  this.make = args.make;
  this.model = args.model;
  this.year = args.year;
  this.color = args.color;
  this.passengers = args.passengers;
  this.convertible = args.convertible;
  this.mileage = args.mileage;
  this.start = false;

  this.started = function () {
    this.start = true;
  };
}

let civicArgs = {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000
}

let civic = new Car(civicArgs);
console.log(civic);
*/
/*

Car {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000,
  start: false,
  started: [Function (anonymous)]
}

*/

function Car(args) {
  Object.assign(this, args);

  this.started = function () {
    this.start = true;
  };
}

let civicArgs = {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000
}

let civic = new Car(civicArgs);
console.log(civic);
/*

Car {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000,
  started: [Function (anonymous)]
}

*/

console.log(civic instanceof Car); // true

if (civic instanceof Car) {
  console.log("It's a car!");
} else {
  console.log("It's not a car.");
}

// It's a car!
console.log();

function Lizard() {
  this.scamper = function () {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // I'm scampering