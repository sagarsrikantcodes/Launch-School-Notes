# 7. Functions as Object Factories

* We know how to create objects and add properties and methods to them. We can automate the process of creating objects. 

* How can we create more car objects as needed? All cars should have the same basic behaviors (i.e, methods), but they must have different state: `make`, `fuelLevel`, and `engineOn`.

* One approach is to duplicate the original code and tweak the state as needed:

```javascript

let raceCar1 = {
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

let raceCar2 = {
  make: 'Ferrari',
  fuelLevel: 0.7,
  engineOn: true,

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

* You can now interact with both cars independently:

```
raceCar1.drive();
raceCar2.drive();

```

* However, there are several problems with the above approach:
	1. There's lot of code duplication between the cars. 
	2. The game may need a dynamic number of cars with attributes that we can't determine before the game begins running.
	3. Creating additional cars is tedious and error-prone. 

* With the above approach it's hard to characterize and differentiate between the attributes from `raceCar1` and `raceCar2`: What makes them similar and what makes them different and unique?

* To avoid the copy and paste approach, one way to automate object creation is to use **object factories**: functions that create and return objects of a particular type. 


* The car objects have three distinct attributes such as `make`, `fuelLevel`, and `engineOn`. 

* Consider the following interface:

```javascript

function createCar(make, fuelLevel, engineOn) {
  // To be implemented by you.
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();

```

* Here the new function, `createCar` handles the similarities, while each function invocation specifies the differences with arguments. 

* Implementation of the createCar() function with the following details:

```javascript

Make: Jaguar
Fuel Level: 0.4
Engine Status: off

```

```javascript

function createCar(make, fuelLevel, engineOn) {
  // To be implemented by you.
  let raceCar = {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

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
      if (this.fuelLevel + (percent / 100) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  };

  return raceCar;
}
/*
let raceCar1 = createCar('BMW', 0.5, false);
console.log("Specifications of the race car-1 before driving: ");
console.log(raceCar1);
raceCar1.drive();
console.log("Specifications of the race car-1 after driving: ");
console.log(raceCar1);

let raceCar2 = createCar('Ferrari', 0.7, true);
console.log("Specifications of the race car-2 before driving: ");
console.log(raceCar2);
raceCar2.drive();
console.log("Specifications of the race car-2 after driving: ");
console.log(raceCar2);
*/

let raceCar3 = createCar('Jaguar', 0.4, false);
console.log(raceCar3);
raceCar3.drive();
console.log(raceCar3);
raceCar3.startEngine();
console.log(raceCar3);
raceCar3.refuel(20);
console.log(raceCar3);
raceCar3.drive();
console.log(raceCar3);
raceCar3.stopEngine();
console.log(raceCar3);

```

## Summary

* Automated object creation is an important process. It helps us in avoiding the monotonous work of copy pasting the code to create a related object that has its own attributes which can be error-prone. 
* In order to create hundreds or thousands of similar objects, we can automate the process of object creation and soon realize its importance in programming. 
* In OOP, we often need to create multiple objects of the same type. Object factory functions provide a straightforward abstraction for object creation. 











