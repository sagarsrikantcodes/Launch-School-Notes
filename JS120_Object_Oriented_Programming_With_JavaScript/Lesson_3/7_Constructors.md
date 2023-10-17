# Constructors

* **Object constructors,** or **constructors** for short, are another way to create objects in JavaScript.

```javascript

let car = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2016,
  started: false,

  start() {
    this.started = true;
  },

  stop() {
    this.started = false;
  },
};

```

Using factory function to create individual cars. 

```javascript

function createCar(make, model, year) {
  return {
    make, // shorthand for `make: make`
    model,
    year,
    started: false,

    start() {
      this.started = true;
    },

    stop() {
      this.started = false;
    },
  };
}

let corolla = createCar('Toyota', 'Corolla', 2016);
let leaf = createCar('Nissan', 'LEAF', 2018);
let nova = createCar('Chevrolet', 'Nova', 1974);

```

This factory function creates new cars of any make, model, or year, and ensures that the engines are initially off.

Another way to accomplish the same thing is to use a constructor function and the `new` keyword:

```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.started = false;

  this.start = function() {
    this.started = true;
  };

  this.stop = function() {
    this.started = false;
  };
}

let corolla = new Car('Toyota', 'Corolla', 2016);
let leaf = new Car('Nissan', 'LEAF', 2018);
let nova = new Car('Chevrolet', 'Nova', 1974);
```

## Calling a Constructor Function

The most striking features that distinguish constructors from ordinary functions are that:
* We call it with the `new` keyword,
* we use `this` to set the object's properties and methods,
* we don't supply an explicit return value (we can, but we usually don't).

We know that `this` always refers to an object. The value of `this` depends on how we call/invoke the function. Calling the constructors is where you see the most significant difference between them and other functions.

Let's create a `Car` object:

```javascript

let corolla = new Car('Toyota', 'Corolla', 2016);

corolla.make;    // => 'Toyota'
corolla.model;   // => 'Corolla'
corolla.year;    // => 2016
corolla.started; // => false

corolla.start();
corolla.started; // => true

```

Notice that the `new` keyword precedes the function invocation. This combination of using `new` with a function call treats the function as a constructor. 

What's different about using the `new` keyword to invoke the function? 
JavaScript takes the following steps when you invoke a function with `new` keyword:
1. It creates an entirely new object. 
2. It sets the prototype of the new object to the object that is referenced by the constructor's `prototype` property. 
3. It sets the value of `this` for use inside the function to point to the new object. 
4. It invokes the function. Since `this` refers to the new object, we use it within the function to set the object's properties and methods.
5. Finally, once the function finishes running, `new` returns the new object even though we don't explicitly return anything. 

**JavaScript won't complain about a missing `new` keyword.**

```Javascript
Car(); // => undefined
``` 

If you don't use the `new` keyword, the constructor function won't work as intended. Instead, it acts like an ordinary function. In particular, no new objects are created, so `this` won't point to a new object. 

Furthermore, since functions that don't return an explicit value return `undefined`, calling a constructor without `new` also returns `undefined`. When you use `new`, however, the function doesn't have to return anything explicitly: it returns the newly created object automatically.

## Who Can be a Constructor

You can use `new` to call almost any JavaScript function that you create. However, you cannot call arrow functions with `new` since they do not have a `prototype` property:

```javascript
let Car = (make, model, year) => {
  this.make = make;
  this.model = model;
  this.year = year;
}

new Car(); // TypeError: Car is not a constructor 
```

You can also use `new` on methods that you define in objects. 

```javaScript

let foo = {
  Car: function(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
};

let car1 = new foo.Car('Toyota', 'Camry', 2019);
console.log(car1); // { make: 'Toyota', model: 'Camry', year: 2019 }
console.log(car1.make); //=> 'Toyota'


```

However, calling a method defined with concise syntax (also called a concise method) won't work:

```javascript

let foo = {
  Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
};

new foo.Car(); //=> Uncaught TypeError: foo.Car is not a constructor

```

In addition, many -- but not all -- built-in objects and methods are incompatible with `new`:

```javascript
new console.log(); //=> Uncaught TypeError: console.log is not a constructor
new Math();        //=> Uncaught TypeError: Math is not a constructor
new parseInt("3"); //=> Uncaught TypeError: parseInt is not a constructor

new Date();        //=> 2019-06-26T02:50:20.191Z

```

`new` is also incompatible with special functions known as **generators**.

## Constructors With Explicit Return Values

When we use `new` operator to call a function that returns an explicit value?


```javascript
function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  return 'a cat';
}

let fluffy = new Cat('fluffy', 'Persian', 15);
console.log(fluffy); 
// Cat { name: 'fluffy', breed: 'Persian', weight: 15 }
console.log(fluffy.weight); // 15
```

Even though we explicitly returned the string `'a cat'`, our constructor returned the cat object with `name`, `breed`, and `weight` as its properties. 

Note that `'a cat'` is a primitive value. Suppose we returned an object instead. What would happen, then?

```javascript

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

```

This time the constructor returned the object `{ foo: 1 }`, not a cat object. 

Rules are:
* If a constructor explicitly tries to return an object, then that object is returned instead of the new object created with the use of `new` operator. 

* In all other situations, it returns the newly created object, provided no errors occur. In particular, the constructor ignores explicit return values that are primitives.


## Supplying Constructor Arguments with Plain Objects 

Constructor functions sometimes have to grow with the needs of a program. That means adding more arguments to the constructor. For instance, our `Car` constructor will look like this:

```javascript

function Car(make, model, year, color, passengers, convertible, mileage) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;
  this.passengers = passengers;
  this.convertible = convertible;
  this.mileage = mileage;
  this.started = false;

  this.drive = function() {
    this.started = true;
  };

  // rest of the methods
}

```

One common technique to manage parameters better involves passing them to our constructor with an object argument:

```javascript
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

```
We had to rework our `Car` constructor to accept an object as an argument. 

With `Object.assign`, we can simplify this constructor considerably:

```javascript

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

```

However, one drawback of the `Object.assign` approach is that `args` object may contain properties that the `Car` object doesn't need. Those additional properties will, nevertheless, get added to the `Car` object. Those properties may just be excess baggage for the objects to carry around, but they may also cause trouble. 


## Determining an Object's Type

As we know the `new` operator creates a new object. Suppose that you call the Car constructor with `new`. Informally, we can say that the resulting object is a car. More formally, we can say that the object is an **instance** of a `Car`. 

The `instanceof` operator lets us determine whether a given constructor created an object:

```javascript
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

```

One effect that we didn't mention when talking about the `new` operator is that the object it returns contains some information that ties it back to the constructor that created the object. The `instanceof` operator uses that information to determine what constructor created the object.


## `new` operator and Implicit Execution Context 

In particular, function and method calls provide an implicit context. For a function call, the implicit context is the global object; for a method call, it's the object used to call the method. 

We can add a constructor call with `new` operator as a third way to provide an implicit execution context. When we call a function with `new` operator, its implicit context is the new object. 


## Problems 

1. What naming convention separates constructor functions from other functions?

* Constructor functions begin with capital letter: Example `Car` versus other functions begin with lowercase letter. Example `car`. In short, Constructor function names are capitalized. 


2. What happens if you run the following code? Why?

```javascript
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = Lizard();
lizzy.scamper(); // ?


```

This code throws a `TypeError` since `scamper` is an undefined property on `lizzy`. Since `Lizard` was invoked without the `new` operator and it doesn't have an explicit return value, the return value is `undefined`. Thus, `lizzy` gets assigned to `undefined` which causes the call to `scamper` to throw an error: we can't call a method on `undefined`. 


3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

```javascript
function Lizard() {
  this.scamper = function () {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // I'm scampering!

```

By calling the function with the help of `new` operator, its implicit context is the new object. Here, the new object would reference the `Lizard` constructor. 


















