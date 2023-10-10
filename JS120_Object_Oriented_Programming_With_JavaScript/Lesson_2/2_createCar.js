function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    started: false,

    start() {
      this.started = true;
    },

    stop() {
      this.started = false;
    }
  };
}

let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
console.log(car1.started); // false 
car1.start();
console.log(car1.started); // true
console.log(car1);  // { make: 'Toyota', model: 'Corolla', year: 2016, started: true, start: [Function: start], stop: [Function: stop]}
car1.stop();
console.log(car1.started); // false
console.log(car1); // { make: 'Toyota', model: 'Corolla', year: 2016, started: false, start: [Function: start], stop: [Function: stop]}




