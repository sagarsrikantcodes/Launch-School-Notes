// Practice Problems - Constructors and Prototypes

/*
1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

*/
/*
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area); // NaN
console.log(rect1.perimeter); // NaN
*/

/*

The value of this within the RECTANGLE.area and RECTANGLE.perimeter methods gets set to the RECTANGLE object when they are called. Since RECTANGLE doesn't define width and height properties, the property accesses both return undefined. Since mathematical operations on undefined produce a value of NaN, the return value of the methods is NaN.

*/

// Question 2 - How would you fix the problem in the code from problem 1?
/*
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  Object.setPrototypeOf(this, RECTANGLE);
  this.width = width;
  this.height = height;
  this.area = this.area();
  this.perimeter = this.perimeter();
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area); // => 6
console.log(rect1.perimeter); // => 2 * (2 + 3) => 2 * 5 => 10
*/

/*

By Setting the prototype of `this`(i.e, Rectangle constructor function object) to RECTANGLE object.
By replacing the value of this.area from RECTANGLE.area() to this.area()
and replacing the value of this.perimeter from RECTANGLE.perimeter() to this.perimeter() so that this points to the new object created by the constructor function instead of a RECTANGLE object, which has its implicit context pointing to the global object.

*/

// Alternate Method using call() 
/*
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  }
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);      // => 6
console.log(rect1.perimeter); // => 10
*/

// ALternate Method using apply() method 
/*
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  }
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.apply(this);
  this.perimeter = RECTANGLE.perimeter.apply(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);      // => 6
console.log(rect1.perimeter); // => 10
*/

// Alternate Method using bind() method
/*
let RECTANGLE = {
  area: function () {
    return this.width * this.height;
  },
  perimeter: function () {
    return 2 * (this.width + this.height);
  }
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.bind(this)();
  this.perimeter = RECTANGLE.perimeter.bind(this)();
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);      // => 6
console.log(rect1.perimeter); // => 10
*/

// Question 3 - 
/*

Write a constructor function called Circle that takes a radius as an argument. You should be able to call an area method on any objects created by the constructor to get the circle's area. Test your implementation with the following code:

*/
/*
let AREA = {
  area() {
    return Math.PI * this.radius * this.radius;
  },
};

function Circle(radius) {
  Object.setPrototypeOf(this, AREA);
  this.radius = radius;
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false
*/

/*
// ALTERNATE METHOD

const Circle = function (radius) {
  this.radius = radius;
};

Circle.prototype.area = function () {
  return Math.PI * this.radius * this.radius;
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false
*/

// Question 4: What will the following code log to the console and why?
/*
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function () {
  return this.swung;
};

console.log(ninja.swingSword()); // true
*/

/*

Even though we define the swingSword method on the prototype after we create the ninja, all objects created by the Ninja constructor share the same prototype object. Thus, when we define swingSword, it immediately becomes available to the ninja object.

*/

// Question 5 - What will the following code output and why? Try to answer without running the code.
/*
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function () {
    return this.swung;
  },
};

console.log(ninja.swingSword());

/*

TypeError: ninja.swingSword is not a function
Despite the similarities to the code in the previous question, this code doesn't work the same way. That's because we're reassigning Ninja.prototype to an entirely new object instead of mutating the original prototype object. The prototype for the ninja object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the swingSword method in the prototype chain of ninja.

*/

// QUestion 6: Implement the method described in the comments below:
/*
function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object
Ninja.prototype.swing = function () {
  this.swung = true;
  return this;
}

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
/*
This pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object (in this case, ninjaA and ninjaB).
*/

// Question 7: In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:
/*
let ninjaA;

{
  const Ninja = function () {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();

console.log(ninjaA.constructor === ninjaB.constructor); // => true

*/

/*

Question 8:
Since a constructor is just a function, you can call it without the new operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the new operator. The function should return the same result with either form. Use the code below to check your solution:

*/

function User(first, last) {
  // ...
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe