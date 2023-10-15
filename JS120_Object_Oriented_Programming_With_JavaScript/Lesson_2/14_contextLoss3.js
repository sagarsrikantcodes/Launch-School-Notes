// Dealing with Context Los III

// Function as Argument Losing Surrounding Context 
/*
function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function () {
    console.log(this);
    repeatThreeTimes(function () {
      console.log(this);
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    });
  },
};

john.greetings();

// => hello, undefined undefined
// => hello, undefined undefined
// => hello, undefined undefined
*/
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    console.log(this); // obj
    [1, 2, 3].forEach(function (number) {
      console.log(this); // global
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    });
  },
};

obj.foo();

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined

*/

// Solution 1: Preserve the Context with a Variable in Outer Scope 
/*
function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function () {
    console.log(this);
    let self = this;
    repeatThreeTimes(function () {
      console.log('hello, ' + self.firstName + ' ' + self.lastName);
    });
  },
};

john.greetings();
*/
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    console.log(this);
    let self = this;
    [1, 2, 3].forEach(function (number) {
      console.log(String(number) + ' ' + self.a + ' ' + self.b);
    });
  },
};

obj.foo();
// => '1 hello world'
// => '2 hello world'
// => '3 hello world'

*/

// Solution 2: Use bind 
/*
function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function () {
    repeatThreeTimes(function () {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    }.bind(this));
  },
};

john.greetings();

// => hello, John Doe
// => hello, John Doe
// => hello, John Doe
*/

/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    console.log(this); // obj => { a: 'hello', b: 'world', foo: [Function: foo] }
    [1, 2, 3].forEach(function (number) {
      //console.log(this); // global
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }.bind(this));
  },
};

obj.foo();
// => 1 hello world
// => 2 hello world
// => 3 hello world
*/

// Solution 3: Use an Arrow Function 
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    // console.log(this); // => {a: 'hello', b: 'world', foo: [Function]}
    [1, 2, 3].forEach(number => {
      // console.log(this);
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    });
  },
};

obj.foo();
// 1 hello world
// 2 hello world
// 3 hello world
*/
/*
function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function () {
    repeatThreeTimes(() => {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    });
  },
};

john.greetings();

// => hello, John Doe
// => hello, John Doe
// => hello, John Doe
*/

// Solution 4: Use the optional thisArg argument

/*
Some methods that take function arguments allow an optional argument that specifies the context to use when invoking the function. Array.prototype.forEach, for instance, has an optional thisArg argument for the context. This argument makes it easy to work around this context-loss problem.


*/

let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    [1, 2, 3].forEach(function (number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }, this);
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world

/*
Summary
Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. This problem is identical to the problem with copying a method from an object and using it as a bare function. For instance, the following two code snippets do the same thing:

Copy Code
array.forEach(obj.logData);

Copy Code
let logData = obj.logData;
array.forEach(logData);

In both snippets, the obj.logData method gets invoked by forEach with the global object as the context, not obj.
*/




