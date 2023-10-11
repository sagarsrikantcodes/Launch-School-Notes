
/*let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

function assignProperty(obj, desiredKey, desiredVal) {

  while (obj !== null) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key === desiredKey) {
        obj[key] = desiredVal;
      }
    }
    obj = Object.getPrototypeOf(obj);
  }

  // console.log(obj);
}

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
console.log(fooB.bar); // 2
*/

let obj = { a: 1 };
let foo = Object.create(obj);
foo.b = 2;

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
console.log();

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

/*
Output:

b: 2
a: 1

b: 2

*/

/*
We can create an object that doesn't include Object.prototype in its prototype chain. All we have to do is set the prototype property of an inherited object to null. 


*/

