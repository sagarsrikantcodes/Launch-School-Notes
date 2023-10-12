/*
Implicit and Explicit Execution Context







*/
/*
function foo() {
  console.log("this refers to: " + this);
  this.bar = "bar";
}

foo();
// this refers to: [object global]
console.log(global.bar); // "bar"
*/
/*
"use strict"; // the quotes are required

function foo() {
  console.log("this refers to: " + this);
}

foo(); // this refers to: undefined
*/
/*
let foo = {
  bar: function () {
    console.log(this);
  }
};

foo.bar(); // { bar: [Function: bar] }

let baz = foo.bar;
baz(); // Object [global] {...}
*/

// Explicit Execution Context with call 
/*
function logNum() {
  console.log(this.num);
}

let obj = { num: 42 };

logNum.call(obj); // logs 42
*/
/*
function logNum() {
  // console.log(this.num);
  console.log(this); // { num: 1000 }
  return this.num;
}

let object = { num: 1000 };

console.log(logNum.call(object)); // 1000
*/
/*
let obj1 = {
  logNum() {
    console.log(this.num);
  }
};

let obj2 = { num: 42 };

obj1.logNum.call(obj2); // 42
*/
/*
function sumNum(num1) {
  return this.num + num1;
}

let obj = {
  num: 42
};

obj.num = sumNum.call(obj, 5);
console.log(obj.num); // => 47
*/
/*
let iPad = {
  name: 'iPad',
  price: 40000,
};

let kindle = {
  name: 'Kindle',
  price: 30000,
};

function printLine(lineNumber, punctuation) {
  console.log(`${lineNumber}: ${this.name}, ${this.price / 100} dollars${punctuation}`);
}

printLine.call(iPad, 1, ';');        // => 1: iPad, 400 dollars;
printLine.call(kindle, 2, '.');      // => 2: Kindle, 300 dollars.
*/

/*
The general syntax for call is as follows:

someObject.someMethod.call(context, arg1, arg2, arg3, ...)

*/

/*
Explicit Execution Context with apply 

The apply method works in much the same way as call. The only difference is that apply uses an array to pass any arguments to the function. The general syntax is:

someObject.someMethod.apply(context, [arg1, arg2, arg3, ...])

apply is handy when you have the list of arguments in an array. With modern JavaScript (ES6 and higher), apply isn't needed since you can use call in conjunction with the spread operator to accomplish the same thing:

let agrs = [arg1, arg2, arg3];
someObject.someMethod.call(context, ...args);

*/

/*

Summary

All JavaScript functions and methods execute within an execution context, sometimes called its this binding. How this gets bound depends entirely on how the function is invoked. You can't tell a function's execution context by merely looking at how and where it's defined; you must examine the invocation itself.

Regular function calls use the global object as their execution context, while method calls use the calling object as their context. You can override this behavior by setting the execution context explicitly with either call or apply.

The mechanics of context binding is a difficult but essential concept. Most difficulties arise from forgetting that JavaScript does not use lexical scoping rules to determine the binding. For instance, if you use this inside a method of obj, you expect that this refers to obj. However, that's not always the case. It's important to remember that the rules for this are entirely different from the rules for variable scope. While a variable's scope is determined by where you write the code, this depends on how you invoke it.

The execution context is determined by how you invoke a function or method. We can't emphasize this enough. this is the way.

*/