/*
class AnimalSpecies {
  constructor(name) {
    this.name = name;
  }

  walk() {
    if (this.name === 'Mike') {
      return `${this.name} strolls forward`;
    } else if (this.name === 'Kitty') {
      return `${this.name} saunters forward`;
    } else if (this.name === 'Flash') {
      return `${this.name} runs forward`;
    }
  }
}

class Person extends AnimalSpecies {
  constructor(name) {
    super(name);
  }

  gait() {
    return "strolls";
  }
}

class Cat extends AnimalSpecies {
  constructor(name) {
    super(name);
  }

  gait() {
    return "saunters";
  }
}

class Cheetah extends AnimalSpecies {
  constructor(name) {
    super(name);
  }

  gait() {
    return "runs";
  }
}

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"
*/

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
};

Object.assign(Person.prototype, walkMixin);
Object.assign(Cat.prototype, walkMixin);
Object.assign(Cheetah.prototype, walkMixin);

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"

