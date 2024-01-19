/*
Question 1
console.log("Hello");
console.log([1,2,3]);
console.log({name: 'Srdjan'});


console.log("Hello".constructor.name); // String
console.log([1, 2, 3].constructor.name); // Array
console.log({ name: 'Srdjan' }.constructor.name); // Object
*/

/*
Question 2
Create the Class
Create an empty class named Cat.
*/

// Question 3 - Create an instance.

// Question 4 - What are you? 
// Using the code from the previous exercise, 
// add a constructor method that logs to the console I'm a cat! 
// when a new Cat object is initialized.
/*
class Cat {
  constructor() {
    console.log("I'm a cat!");
  }
}

let kitty = new Cat();
// "I'm a cat!"
*/

// Question 5 - Hello, Sophie! (part 1)
/*
class Cat {
  constructor(name) {
    this.name = name;
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');
// "Hello! My name is Sophie!"
*/

// Question 6 - Hello, Sophie! (part 2)
// Using the code from the previous exercise, 
// move the greeting from the constructor method to an instance method named greet that logs a greeting to the console when invoked.
/*
class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');
kitty.greet(); // Hello! My name is Sophie!
*/

// Question 7 - Default Person
/*
Create a class Person.

Person should accept one argument for "name" when instantiated.

If no arguments are given, person object should instantiate with a "name" of "John Doe".

*/
/*
class Person {
  constructor(name = 'John Doe') {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe
*/

// Question 8 - Hello, Chloe!
/*
class Cat {
  constructor(name) {
    this.name = name;
  }

  rename(name) {
    this.name = name;
  }
}

let kitty = new Cat('Sophie');
console.log(kitty.name); // Sophie
kitty.rename('Chloe');
console.log(kitty.name); // Chloe
*/

// Question 9 - Generic Greeting (part 1) 
/*
class Cat {
  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }
}

Cat.genericGreeting();
// Hello! I'm a cat!
*/

// Generic Greeting (part 2)

class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log("Hello! I'm a cat!");
  }

  personalGreeting() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
// Hello! I'm a cat!
kitty.personalGreeting();
// Hello! My name is Sophie!







