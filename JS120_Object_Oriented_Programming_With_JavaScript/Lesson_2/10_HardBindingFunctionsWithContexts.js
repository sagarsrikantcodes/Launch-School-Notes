// Hard Binding Functions with Contexts 
/*
In the previous two assignments, we learned about two methods on function objects that we can use to set the execution context of function and method calls explicitly: call and apply. JavaScript has a third way to specify the context: the bind method on function objects. bind works a little differently, however. Let's see an example:
*/
/*
function sumNum(num1) {
  return this.num + num1;
}

let obj = {
  num: 42
};

let sumNum2 = sumNum.bind(obj);
console.log(sumNum2); // [Function: bound sumNum]
console.log(sumNum2(5)); // => 47
*/

/*
In this example, we don't call the function immediately as we do when using call and apply. Instead, bind returns a new function. The new function is permanently bound to the object passed as bind's first argument. You can then pass that function around and call it without worrying about losing its context since it's permanently bound to the provided object.

*/
/*
let object = {
  a: 'hello',
  b: 'world',
  foo: function () {
    return this.a + ' ' + this.b;
  },
};

let bar = object.foo;
console.log(bar); // [Function: foo]
console.log(bar());                                // "undefined undefined"

let baz = object.foo.bind(object);
console.log(baz); // [Function: bound foo]
console.log(baz());                                // "hello world"

/*
An interesting and important property of permanently bound functions is that you cannot change their execution context, even if you use call or apply or call bind a second time. Continuing with the code from the previous example:

*/
/*
let object2 = {
  a: 'hi',
  b: 'there',
};

console.log(baz.call(object2));  // "hello world" - `this` still refers to `object`
*/
/*
JavaScript implements the bind method something like this:

Function.prototype.bind = function (...args) {
  let fn = this;
  let context = args.shift();
  // Remaining arguments are "pre-bound" arguments that will be passed to fn

  return function (...moreargs) {
    let allArgs = args.concat(moreargs);
    // Combine pre-bound args with args supplied when calling the function
    // returned by `bind`.
    return fn.apply(context, allArgs);
  };
};

While you've learned enough to understand most of that code, it's not really important to wrap your head around it. What's important to recognize is that bind's context is the original function, and it returns a new function that calls the original function with the context supplied to bind as its first argument. This code also shows why the binding makes permanent changes -- no matter what you do to the returned function, you can't change the value of context.

*/

let greetings = {
  morning: 'Good morning, ',
  afternoon: 'Good afternoon, ',
  evening: 'Good evening, ',

  greeting: function (name) {
    let currentHour = (new Date()).getHours();

    if (currentHour < 12) {
      console.log(this.morning + name);
    } else if (currentHour < 18) {
      console.log(this.afternoon + name);
    } else {
      console.log(this.evening + name);
    }
  }
};


let spanishWords = {
  morning: 'Buenos dias, ',
  afternoon: 'Buenas tardes, ',
  evening: 'Buenas noches, '
};

let spanishGreeter = greetings.greeting.bind(spanishWords);

spanishGreeter('Jose'); // 'Buenas tardes, Jose'
spanishGreeter('Juan'); // 'Buenas tardes, Juan'

/*
Summary

In this assignment, we saw a third way to specify the execution context. Unlike call and apply, though, bind returns a new function that is permanently bound to the context that's provided to bind as the first argument. You cannot alter the execution context of the resulting function, even if you use call, apply, or try calling bind a second time.

*/