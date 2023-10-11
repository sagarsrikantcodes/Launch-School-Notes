// NOTE: Run this code from a file; don't use the REPL
/*
bar();
function bar() {
  console.log("this is bar");
}

foo();
const foo = function () {
  console.log("this is foo");
};
*/
/*
let prompt = function () {
  console.log("Hi");
}

console.log(prompt());
*/
/*
[1, 2, 3].forEach(function (num) {
  console.log(num);
});
*/

/*
function makeIncrementer(increment) {
  return function (value) { // return to caller 
    return value + increment;
  }
}

let f = makeIncrementer(1);
let res = f(4);
console.log(res); // 4 + 1 => 5
*/
/*
let squaredNums = [1, 2, 3].map(function squareNum(num) {
  return num * num;
}); // [1, 4, 9]
*/
/*
let squaredNums = [1, 2, 3].map(num => num * num);
*/
/*
let squaredNums = [1, 2, 3].map(function squareNum(num) {
  return num * num;
})

console.log(squaredNums);
*/
/*
function logNum(num) {
  console.log(`Number: ${num}`);
}

[1, 2, 3].forEach(logNum);
// Number: 1
// Number: 2
// Number: 3

[1, 2, 3].forEach(logNum());
*/
/*
function logNum(num) {
  console.log(`Number: ${num}`);
}


[1, 2, 3].forEach(logNum);
// Number: 1
// Number: 2
// Number: 3
*/
/*
[1, 2, 3].forEach(num => console.log(`Number: ${num}`));
*/
/*
[1, 2, 3].forEach(function logNum(num) {
  console.log(`Number: ${num}`);
});
// Number: 1
// Number: 2
// Number: 3
*/
/*
[1, 2, 3].forEach(num => {
  console.log(`Number: ${num}`);
});
*/

let myFunc = function () { };
console.log(typeof myFunc); // "function"



