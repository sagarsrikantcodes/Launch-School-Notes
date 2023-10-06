/*
let pete = {
  name: 'Pete',

  printName() {
    console.log(`My name is ${this.name}!`);
  },
};

pete.printName(); // My name is Pete
*/
/*
let pete = {
  heroes: ['Superman', 'Spiderman', 'Batman'],
  cash: { ones: 12, fives: 2, tens: 0, twenties: 2, hundreds: 0 },

  cashOnHand() {
    // This method uses this.cash to calculate the total cash value.
    // We'll skip the implementation.
    let totalCashValue = 0;

    for (let key in this.cash) {
      if (key === 'ones') {
        totalCashValue += this.cash[key];
      } else if (key === 'fives') {
        totalCashValue += (this.cash[key] * 5);
      } else if (key === 'tens') {
        totalCashValue += (this.cash[key] * 10);
      } else if (key === 'twenties') {
        totalCashValue += (this.cash[key] * 20);
      } else if (key === 'hundreds') {
        totalCashValue += (this.cash[key] * 100);
      }
    }

    return totalCashValue;
  },

  allHeroes() {
    return this.heroes.join(', ');
  },
};

console.log(pete.cashOnHand()); // 62
*/

/*
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

// console.log(pete.pet.makeNoise()); // Meow! Meow!
pete.pet.makeNoise(); // Meow! Meow!
*/

let cat = {
  name: 'Fluffy',

  makeNoise() {
    console.log('Meow! Meow!');
  },

  eat() {
    // implementation
    console.log(`Cat's favorite food is carrot.`);
  },
};

let dog = {
  name: 'Maxi',

  makeNoise() {
    console.log('Woof! Woof!');
  },

  eat() {
    // implementation
    console.log(`Dog's favorite food is biscuit.`);
  },
};

let pete = {
  name: 'Pete',
  pets: [],

  printCatsName() {
    console.log(`The cat's name is ${this.pets[0].name}`);
  },

  printDogsName() {
    console.log(`The dog's name is ${this.pets[1].name}`);
  },

  printCatsFood() {
    this.pets[0].eat();
  },

  printDogsFood() {
    this.pets[1].eat();
  },
};

pete.pets.push(cat);
pete.pets.push(dog);

pete.pets[0].makeNoise(); // Meow! Meow!
pete.pets[1].makeNoise(); // Woof! Woof!
console.log(pete.pets[0].name); // Fluffy 
console.log(pete.pets[1].name); // Maxi
console.log();
pete.printCatsName();
pete.printDogsName();
pete.printCatsFood();
pete.printDogsFood();