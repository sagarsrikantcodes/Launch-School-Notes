/*
Car Attributes
  Make: BMW
  Fuel level: 50%
  Engine status: Turned Off

Car Functionality/Behavior
  Start engine
  Stop engine
  Refuel
  Drive

*/
/*
let raceCar = {
  make: "BMW",
  fuelLevel: 0.5,
  engineOn: false,

  startEngine: function () {
    raceCar.engineOn = true;
  },

  stopEngine: function () {
    raceCar.engineOn = false;
  },

  refuel: function (percent) {
    if (raceCar.fuelLevel + (percent / 100) <= 1) {
      raceCar.fuelLevel += (percent / 100);
    } else {
      raceCar.fuelLevel = 1;
    }
  },

  drive: function () {
    raceCar.fuelLevel -= 0.1;
  },
};

console.log(raceCar.engineOn); // false
raceCar.startEngine();
console.log(raceCar.engineOn); // true
console.log(raceCar.fuelLevel); // 0.5
raceCar.refuel(20);
console.log(raceCar.fuelLevel); // 0.7
raceCar.refuel(50);
console.log(raceCar.fuelLevel); // 1.0
raceCar.drive();
console.log(raceCar.fuelLevel); // 0.9
raceCar.drive();
console.log(raceCar.fuelLevel); // 0.8
console.log(raceCar.engineOn); // true
raceCar.stopEngine();
console.log(raceCar.engineOn); // false
console.log(raceCar.make); // BMW
console.log(raceCar.fuelLevel); // 0.8
raceCar.drive();
console.log(raceCar.fuelLevel.toFixed(1)); // 0.7

raceCar.drive();
console.log(raceCar.fuelLevel.toFixed(1)); // 0.6
*/

// Using `this` keyword 

let raceCar = {
  make: "BMW",
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
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

  drive() {
    if (this.fuelLevel > 0) {
      this.fuelLevel -= 0.1;
    } else {
      console.log("No fuel sorry. Please refill the fuel tank");
    }
  }
};

console.log(raceCar.engineOn); // false
raceCar.startEngine();
console.log(raceCar.engineOn); // true
console.log(raceCar.fuelLevel); // 0.5
raceCar.refuel(20);
console.log(raceCar.fuelLevel); // 0.7
raceCar.refuel(50);
console.log(raceCar.fuelLevel); // 1.0
raceCar.drive();
console.log(raceCar.fuelLevel); // 0.9
raceCar.drive();
console.log(raceCar.fuelLevel); // 0.8
console.log(raceCar.engineOn); // true
raceCar.stopEngine();
console.log(raceCar.engineOn); // false
console.log(raceCar.make); // BMW
console.log(raceCar.fuelLevel); // 0.8
raceCar.drive();
console.log(raceCar.fuelLevel.toFixed(1)); // 0.7

raceCar.drive();
console.log(raceCar.fuelLevel.toFixed(1)); // 0.6

