class Rectangle {
  static count = 0;

  constructor(length, width) {
    this.length = length;
    this.width = width;
    Rectangle.count += 1;
  }

  getArea() {
    return this.length * this.width;
  }

  static getDescription() {
    console.log("A Rectangle is a shape with 4 sides");
  }


  getCount() {
    console.log(Rectangle.count);
  }
}

console.log(Rectangle.count); // 0
let rec1 = new Rectangle(10, 5);
console.log(Rectangle.count); // 1
let rec2 = new Rectangle(11, 8);
console.log(Rectangle.count); // 2 

console.log(rec1.getArea()); // 50 
console.log(rec2.getArea()); // 88 
Rectangle.getDescription();

let f = Rectangle;
console.log(Rectangle); // [class Rectangle] { count: 2 }

function returnRectangleClass() {
  return new Rectangle(5, 6);
}

let rec4 = returnRectangleClass();
console.log(rec4); // Rectangle { length: 5, width: 6 }
console.log(rec4.getArea()); // 30

/*
Practice Problems - Classes 

1. What do we mean when we say that classes are first-class values?
- It means classes can be passed to a function, can be returned from a function and can be assigned to a variable.

2. Consider the following class declaration:

*/

class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}

// What does the static modifier do? How would we call the method manufacturer?
// The static modifier makes the properties and methods inside class to be accessible to all the object of the same type. 
// The static modifier defines the properties / methods on the constructor function or class. That property points to an object that is shared amoung all instances of the constructor or class. 
// We can call manufacturer by the following syntax:
// Television.manufacturer();
// Whereas the model method is an instance method and must be called by an instance object.
// let tv1 = new Television();
// tv1.model();
// let tv2 = new Television();
// tv2.model();

