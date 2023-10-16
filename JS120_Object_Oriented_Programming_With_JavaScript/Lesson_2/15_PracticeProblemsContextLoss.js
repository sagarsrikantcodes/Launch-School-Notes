// Question 1
/*
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
      + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}
*/

// logReturnVal(turk.getDescription);
// undefined undefined is a undefined. 
/*
Since the execution context is a global object, we obtain the output "undefined undefined is a undefined."

In order to obtain the output "Christopher Turk is a Surgeon" we need to set the execution context to turk object. There are several ways to explicitly set the execution context to Turk.

- By using bind method
- By using arrow function.

*/

/*
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
      + this.occupation + '.';
  },
};
*/
/*
function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

// Question 2 - Modify the program from the previous problem so that logReturnVal accepts an additional context argument. If you then run the program with turk as the context argument, it should produce the desired output.

logReturnVal(turk.getDescription, turk);
// Christopher Turk is a Surgeon.
*/

// Question 3
// Suppose that we want to extract getDescription from turk, but we always want it to execute with turk as its execution context. How would you modify your code to do that?
/*
function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription.bind(turk));
// Christopher Turk is a Surgeon.
*/

// Question 4 - Consider the following code: 
/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    let self = this;
    this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
*/

// Will this code produce the following output? Why or why not?
/*
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
*/

// No, the code does not produce the following output. Since the `forEach` method inside the `listGames` property loses the execution context `TESgames` and `this.seriesTitle` is `global.seriesTitle` which is undefined. 
// The actual output obtained is 
/*
undefined: Arena
undefined: Daggerfall
undefined: Morrowind
undefined: Oblivion
undefined: Skyrim
*/

/*
Since functions lose their surrounding context when used as arguments to another function, the context of line 6 is not the TESgames object. Instead, it is the global object. Thus, this.seriesTitle resolves to undefined rather than "The Elder Scrolls"

*/

// QUestion 5 
// Use let self = this; to ensure that TESgames.listGames uses TESGames as its context and logs the proper output.



/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    let self = this;
    this.titles.forEach(function (title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

*/


// Question 6
// The forEach method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:
// We can use thisArg execution context 
// forEach(callBackFunction, thisArg)
/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    this.titles.forEach(function (title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames.listGames();
/*
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
*/

// Question 7: Use an arrow function to achieve the same result:
/*
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
/*
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
*/

// Question 8
// Consider the following code:
/*
let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a); // 0
console.log(global.a); // NaN
*/

// What will the value of foo.a be after this code runs?

// NaN is the return value of foo.a since the execution context is lost in the inner function and the execution context is global inside the increment function.
// global.a is undefined => undefined + 1 is NaN

/*
The value of foo.a will be 0. Since increment gets invoked as a function, this.a on line 5 references a property of the global object rather than a property of foo. Thus, the property foo.a isn't modified by the increment; its value remains 0.

*/

// Question 9 - Use one of the methods we learned in this lesson to invoke increment with an explicit context such that foo.a gets incremented with each invocation of incrementA.

// Using call method
/*
let foo = {
  a: 0,
  incrementA: function () {
    console.log(this); // foo object
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
console.log(foo.a); // 1
foo.incrementA();
console.log(foo.a); // 2
foo.incrementA();
console.log(foo.a); // 3
*/

// Using bind method 
/*
let foo = {
  a: 0,
  incrementA: function () {
    function increment() {
      this.a += 1;
    }

    increment.bind(this)();
  }
};

foo.incrementA();
console.log(foo.a); // 1
foo.incrementA();
console.log(foo.a); // 2
foo.incrementA();
console.log(foo.a); // 3
*/
// Using let self = this, we can preserve the execution context by using self.a
/*
let foo = {
  a: 0,
  incrementA: function () {
    let self = this;
    function increment() {
      self.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a); // 3
*/
/*
let foo = {
  a: 0,
  incrementA: function () {
    function increment(obj) {
      obj.a += 1;
    }

    increment(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a); // 3
*/

// Using arrow function 
/*
let foo = {
  a: 0,
  incrementA: function () {
    let increment = () => {
      this.a += 1;
    };

    increment();
  }
};

foo.incrementA();
console.log(foo.a); // 1
foo.incrementA();
console.log(foo.a); // 2
foo.incrementA();
console.log(foo.a);// 3
*/


