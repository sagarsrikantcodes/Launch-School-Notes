// Dealing with Context Loss II
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar();
  },
};

obj.foo();        // => undefined undefined
*/

/*
A function or method's execution context depends solely on how the function or method is invoked, not on how and where the function is defined. Here, bar is invoked as a standalone function on line 9. Thus, its execution context is the global object, not the obj object that you may have expected.

*/

// Some solutions to the problem include
// Solution 1: Preserve Context with a Variable in Outer Scope 
/*
One common way to preserve the context in this scenario is to use something like let self = this or let that = this in outer function. If you define the self or that variable -- these names are idiomatic, and not a required name -- in the outer scope, you can use that variable and whatever value it contains inside your nested inner function(s).

*/
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    let self = this;

    function bar() {
      console.log(self.a + ' ' + self.b);
    }

    bar();
  },
};

*/

/*
In this example, line 5 assigns this to the local variable self. Since JavaScript uses lexical scoping rules for variables, bar can access self within its body; that lets us use it instead of this to access the correct context object.
*/

// Solution 2: Call Inner Function with Explicit Context 
/*
You can also use call or apply to explicitly provide a context when calling the inner function. For instance:
*/
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar.call(this);
  },
};

obj.foo(); // => hello world
*/

// Solution 3: Use bind 
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    let qux = bar.bind(this);

    // some code
    qux();

    // some more code
    qux();

    // still more code
  }
};

obj.foo();
// => hello world
// => hello world
*/

/*
One advantage of bind is that you can do it once and then call it as often as needed without an explicit context.
*/

// Solution 4: Using an Arrow Function 
/*
Arrow functions have a property that comes in very handy when dealing with context loss; they use the execution context from the surrounding context in which they are defined. That means that an arrow function defined inside another function always has the same context as the outer function's execution context at the time the function is defined:

*/
/*
let obj = {
  a: 'hello',
  b: 'world',
  foo: function () {
    let bar = () => {
      console.log(this.a + ' ' + this.b);
    }

    // some code
    bar();

    // some more code
    bar();

    // still more code
  }
};

obj.foo();
// => hello world
// => hello world
*/
/*
Using arrow functions like this is similar to using bind in that you don't have to worry about arrow functions losing their surrounding context. An arrow function, once created, always has the same context as the function that surrounded it when it was created.

Note that this is not the same as saying that arrow functions get their context lexically. "Lexical" refers to the structure of the surrounding code without regard to its execution state; arrow functions rely on the execution state at the time of definition to determine their execution context.
*/
/*
let obj = {
  a: 5,

  foo: () => {
    console.log(this.a);
  },
};

obj.foo(); // => undefined
*/

let obj = {
  a: 5,
  printMessage() {
    console.log(this);
    console.log(this.a);
  },
}

obj.printMessage(); // 5