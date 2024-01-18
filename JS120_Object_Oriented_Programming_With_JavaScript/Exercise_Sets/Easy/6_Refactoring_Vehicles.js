// Refactoring Vehicles
// Refactor these classes so they all use a common superclass, and inherit behavior as needed.

class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }

  setWheels(wheels) {
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }
}

class Car extends Vehicle{
  constructor(make, model, wheels) {
    super(make, model);
  }
}

class Motorcycle extends Vehicle{
  constructor(make, model, wheels) {
    super(make, model);
  }
}

class Truck extends Vehicle{
  constructor(make, model, wheels, payload) {
    super(make, model, wheels);
    this.payload = payload;
  }
}

let car = new Car('Toyota', 'Corolla', 4);
console.log(car.info() === 'Toyota Corolla'); // logs true

let bmwMotorcycle = new Motorcycle('BMW Motorcycle', 'S 1000 RR', 2);
console.log(bmwMotorcycle.info() === 'BMW Motorcycle S 1000 RR'); // logs true

let truck = new Truck('Ford', 'F150', 6);
console.log(truck.info() === 'Ford F150'); // logs true
console.log(truck.getWheels() === 6); // logs true
truck.setWheels(4);
console.log(truck.getWheels() === 4); // logs true
