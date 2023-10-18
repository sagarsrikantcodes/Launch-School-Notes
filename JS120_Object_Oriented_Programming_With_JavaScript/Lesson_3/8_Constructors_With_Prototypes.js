function Dog(name, breed, weight) {
  // deleted Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function () {
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
maxi.bark(); // 'Woof!'

let biggie = new Dog('Biggie', 'Whippet', 9);
biggie.bark(); // 'Yip!'

let dexter = new Dog('Dexter', 'Rottweiler', 50);

dexter.bark = function () {
  console.log('WOOF!')
}

maxi.bark();   // Woof!
dexter.bark(); // WOOF!

function sing() {
  console.log("hi");
}

console.log(Dog.prototype.constructor); // [Function: Dog]
console.log(maxi.prototype); // undefined
console.log(maxi.constructor); // [Function: Dog]
console.log(biggie.constructor); // [Function: Dog]
console.log(dexter.constructor); // [Function: Dog]
console.log(Object.getPrototypeOf(Dog).constructor); // [Function: Function]
console.log(Object.prototype.constructor); // [Function: Object]
console.log(sing.constructor); // [Function: Function]

if (maxi.constructor === Dog) {
  console.log("It's a dog");
} else {
  console.log("It's not a dog");
}

// It's a dog 

if (biggie.constructor === Dog) {
  console.log("It is a dog");
} else {
  console.log("It is not a dog");
}

console.log(maxi instanceof Dog); // true

// Reassign the constructor property to something else 
