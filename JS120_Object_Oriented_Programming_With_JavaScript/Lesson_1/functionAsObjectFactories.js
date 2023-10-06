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