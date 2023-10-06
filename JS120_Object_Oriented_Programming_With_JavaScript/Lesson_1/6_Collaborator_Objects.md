# Collaborator Objects

* We know that we can group related state and behavior with objects. An object's state is stored in properties that refer to other values or objects. 

```javascript

let pete = {
  name: 'Pete',

  printName() {
    console.log(`My name is ${this.name}!`);
  },
};


```

* Notice that `pete.name` holds a string value. An object's properties can hold any value or object; strings, numbers, arrays, and even other objects. For instance: 

```javascript
let pete = {
  heroes: ['Superman', 'Spiderman', 'Batman'],
  cash: { ones: 12, fives: 2, tens: 0, twenties: 2, hundreds: 0 },

  cashOnHand() {
    // This method uses this.cash to calculate the total cash value.
    // We'll skip the implementation.
  },

  allHeroes() {
    return this.heroes.join(', ');
  },
};
``` 

* From this example, you see that we can use any value or object to represent an object's state. Properties can store any object or value. Suppose we need an object that represents a person and his pet. We could have an object like this:

```javascript
let cat = {
  name: 'Fluffy',

  makeNoise() {
    console.log('Meow! Meow!');
  },

  eat() {
    // implementation
  },
};

let pete = {
  name: 'Pete',
  pet: cat,

  printName() {
    console.log(`My name is ${this.name}!`);
    console.log(`My pet's name is ${this.pet.name}`);
  },
};


```

* We can now access Pete's pet by referencing the `.pet` property with the `pete` object, e.g., `pete.pet`. Since `pet` is the `cat` object, we can use `pete.pet` to call the `cat`'s methods: `pete.pet.makeNoise()`. 

* Objects that help provide state within another object are called **collaborator objects,** or more simply, **collaborators**. Collaboration is all about objects working together in some manner. A collaborator works in conjunction -- in collaboration -- with another object.

* The `pete` object has a collaborator object stored in its `pet` property. The `pete` object and the object referenced by its `pet` property work together. When we need to access the `pet` object or have it perform a behavior, we can use `pete.pet` to access and use the object's properties. For instance, on line 19, the `pete` object collaborates with the cat object (via this.pet) to access the `cat`'s name.

* Collaborator objects play an important role in object-oriented design; they represent the connections between the different classes in your program. When working on an object-oriented program, be sure to consider what collaborators your objects need and whether those associations make sense, both from a technical standpoint and in terms of modeling the problem your program aims to solve.

* Let's now develop our program further and change the implementation to let Pete have many pets. How should we implement this? How about an array of `pet` objects?

```javascript

let cat = {
  name: 'Fluffy',

  makeNoise() {
    console.log('Meow! Meow!');
  },

  eat() {
    // implementation
  },
};

let dog = {
  name: 'Maxi',

  makeNoise() {
    console.log('Woof! Woof!');
  },

  eat() {
    // implementation
  },
};

let pete = {
  name: 'Pete',
  pets: [],
};

pete.pets.push(cat);
pete.pets.push(dog);


```

> We often talk of collaborators in the context of custom objects like `pet`, but collaborators don't have to be custom objects. They can be built-in objects like arrays and dates, as well.

## Summary
* Collaborator objects let you chop up and modularize the problem domain into cohesive pieces. They play an important role in modeling complicated problem domains in OO programming.
















