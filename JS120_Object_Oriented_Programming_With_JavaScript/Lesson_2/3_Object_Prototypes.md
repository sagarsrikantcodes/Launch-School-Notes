# Object Prototypes

In previous lesson, we talked about the need to automate object creation. Factory functions are one way to automate object creation. An object factory serves two purposes:

1. It returns objects that represent data of a specific type. 
2. It reuses code. 

Examining the factory function below: 

```javascript
function createCar(make, model, year) {
  return {
    make,             // Same as "make: make"
    model,            // Same as "model: model"
    year,             // Same as "year: year"
    started: false,

    start() {         // Same as "start: function() {"
      this.started = true;
    },

    stop() {          // Same as "stop: function() {"
      this.started = false;
    },
  };
}

```

With this `createCar` object factory, you can create as many car objects as your program needs:

```javascript
let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
```

Factory functions give us the ability to create objects of the same type by merely calling a function. 
Entities that are common to multiple objects, such as the `start` and `stop` methods, get declared in one place. On the other hand, arguments are passed to the factory function to distinguish one object from another, such as the make, model, and year. Some entities, like `started`, don't fall easily into either category, but that's not important here. 

There are other ways to extract code into one place so that multiple objects can use it. In JavaScript, we rely heavily on prototypes to accomplish this. 
























