# 5. Creating Objects

* We know how to create an object:
```javascript
let person = {
	name: 'John',
	age: 33,
};

```
* Here the object merely stores some data about a person. OOP is about combining data and behavior into an object.

* Imagine building a car racing game. We must have cars. That is, it must have some data about cars and some operations associated that use and manipulate that data. We must list the data and operations like this:

```javascript

Car Attributes
  Make: BMW
  Fuel level: 50%
  Engine status: Turned Off

Car Functionality/Behavior
  Start engine
  Stop engine
  Refuel
  Drive

```

* We have some data about a car and the functionality that applies to that data. The "start engine" feature, for example, should change the engine status from "off" to "on" and nothing more. It makes sense to combine this data and functionality together. Encapsulating it as an object like this:

```javascript
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine: function() {
    raceCar.engineOn = true;
  },

  drive: function() {
    raceCar.fuelLevel -= 0.1;
  },

  stopEngine: function() {
    raceCar.engineOn = false;
  },

  refuel: function(percent) {
    if ((raceCar.fuelLevel + (percent / 100)) <= 1) {
      raceCar.fuelLevel += (percent / 100);
    } else {
      raceCar.fuelLevel = 1;
    }
  },
};

```

* This code combines the data and operations related to a car into an object. The structure of the object is essentially the same as the objects we've encountered so far. The chief difference is that some of the property values are functions. That shouldn't suprise since we know that JavaScript functions are first-class values, which means we can treat them as we would any JavaScript value. That includes using them as object property values. When object properties have function values, we call them **methods**. The methods are responsible for changing the state of the **raceCar** object. 

* One advantage of this approach is: If we want to operate on a car, we don't have to search for both the function and the data that we need. We can see at a glance what you can do with a car merely by looking at the object. We can use dot-notation to call a method. For instance:

```javascript
raceCar.refuel(30);
```

* **Important Note** : Note that JavaScript doesn't stop you from changing the `fuelLevel` property directly instead of calling the `refuel` method. That's a limitation of JavaScript. The OO style **strongly** discourages changing the property values directly. Instead, it encourages using methods to interface with the object. We can see why that is by looking at the implementation for `refuel`. The `fuelLevel` property should be a number that's a fraction of `1`. The `refuel` method ensures that it never exceeds that value. If you only use `refuel` to increase the `fuelLevel` of the car, it'll never exceed 1. If you directly access and change `fuelLevel`, though, you may end up violating that restriction. 

## Compact Method Syntax

* Using functions as object values(i.e., methods) is so common that there's a shorthand syntax called the compact syntax for it:

```javascript

let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    raceCar.engineOn = true;
  },

  drive() {
    raceCar.fuelLevel -= 0.1;
  },

  stopEngine() {
    raceCar.engineOn = false;
  },

  refuel(percent) {
    if ((raceCar.fuelLevel + (percent / 100)) <= 1) {
      raceCar.fuelLevel += (percent / 100);
    } else {
      raceCar.fuelLevel = 1;
    }
  },
};

```

* You can omit the `:` and the `function` keyword and use parentheses to denote a method. There is a subtle difference between these two syntaxes, however. We'll cover that later when we talk about prototypes.

## The `this` Keyword

* Thus far in our example, we refer to the object from inside the methods by directly using the variable name, `raceCar`. Suppose we change the variable name or pass the object to a function that refers to its arguments by a different name. In that case, calling a method with the original variable name will throw a reference error. We need some way to refer to the object that contains a method from other methods in that object. The keyword `this` provides the desired functionality:

```javascript

let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};

```

* The workings of `this` are one of the most difficult JavaScript concepts to grasp; it's the source of a great deal of confusion. We'll talk about it extensively in the next lesson. For now, you can assume that when you use `this` inside a method, it refers to the object that contains the method.

## Summary
* In this assignment, we've seen an example of encapsulation in practice. In JavaScript, we achieve encapsulation by making use of an object. The properties of the object hold the state(data), and methods represent behavior. Inside the methods, the `this` keyword lets us refer to the properties and other methods of the object. 

















