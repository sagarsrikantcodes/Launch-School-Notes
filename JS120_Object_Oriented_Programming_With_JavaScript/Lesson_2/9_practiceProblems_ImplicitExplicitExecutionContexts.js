// Practice Problems: Implicit and Explicit Function Execution Contexts 

// Question 1 
/*
function func() {
  return this;
}

let context = func();
// [Object global] {...}

The global object. In Node, that's global; in a browser, that's window.

Since line 5 calls func as a function, the implicit context for func is the global object, so it returns the global object.

*/
/*
let obj = {
  func: function () {
    return this;
  },
};

let context = obj.func();

console.log(context);
*/

message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage(); // 'Hello from the global scope!'

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage(); // 'Hello from the function scope!'