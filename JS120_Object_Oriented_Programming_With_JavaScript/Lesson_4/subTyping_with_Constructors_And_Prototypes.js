// Subtyping with Constructors and Prototypes

// Practice Problems

function Greeting() { }

Greeting.prototype.greet = function (message) {
  console.log(message);
};

function Hello() { }

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function () {
  this.greet('Hello!');
};

function Goodbye() { }

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function () {
  this.greet("Goodbye");
};

let hello = new Hello();
hello.hi(); // "Hello!"
// hello.bye(); // TypeError: hello.bye is not a function. 
hello.greet(); // undefined
hello.greet('Goodbye'); // Goodbye
// Hello.hi(); // TypeError since Hello object does not contain hi method. Its prototype object contains hi method. 
Hello.prototype.hi(); // Hello!





