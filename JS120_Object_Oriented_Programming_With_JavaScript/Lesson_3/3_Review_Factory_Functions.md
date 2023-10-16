# Review - Factory Functions

We can create objects in bulk by using the `factory function` pattern. 

## Factory Functions

Object factories, or factory functions (also called the _Factory Object Creation Pattern_), provide a simple way to create related object based on a predefined template:

```javascript

function createPerson(firstName, lastName = '') {
  let person = {};

  person.firstName = firstName;
  person.lastName = lastName;

  person.fullName = function() {
    return `${this.firstName} ${this.lastName}`.trim();
  };

  return person;
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

john.fullName();        // => "John Doe"
jane.fullName();        // => "Jane"

```

Alternate implementation of the above factory function:

```javascript

function createPerson(firstName, lastName) {
  let person = {
    firstName: firstName,
    lastName: lastName,
    fullName: function() {
      if (lastName === undefined) {
        console.log(this.firstName);
      } else {
        console.log(this.firstName + ' ' + this.lastName);
      }
    },
  };
  
  return person;
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

john.fullName();        // => "John Doe"
jane.fullName();        // => "Jane"


```

We can simplify by returning an object literal:

```javascript

function createPerson(firstName, lastName) {
  return {
    firstName: firstName,
    lastName: lastName,
    fullName: function() {
      if (lastName === undefined) {
        console.log(this.firstName);
      } else {
        console.log(this.firstName + ' ' + this.lastName);
      }
    },
  };
  
  
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

john.fullName();        // => "John Doe"
jane.fullName();        // => "Jane"


```

```javascript
The factory function lets us create multiple objects of the same "type" with a pre-defined "template". However, it has some disadvantages:

* Every object created with a factory function has a full copy of all the methods. That's redundant, and it can place a heavy load on system memory.

* There is no way to inspect an object and learn whether we created it with a factory function. That effectively makes it impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.


```

























