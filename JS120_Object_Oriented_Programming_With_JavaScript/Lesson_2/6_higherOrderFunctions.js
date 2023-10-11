// Functions That Accept Functions as Arguments
/*
function mapNumsToSquares(nums) {
  let squaredArray = [];

  for (let index = 0; index < nums.length; index += 1) {
    squaredArray.push(nums[index] * nums[index]);
  }

  return squaredArray;
}

console.log(mapNumsToSquares([1, 2, 3, 4, 5])); // [1, 4, 9, 16, 25]
*/
/*
function uppercaseStrings(strings) {
  let capStrings = [];

  for (let index = 0; index < strings.length; index += 1) {
    let current = strings[index];
    capStrings.push(current.toUpperCase());
  }

  return capStrings;
}

console.log(uppercaseStrings(["sam", "amy", "melbourne"])); // [ 'SAM', 'AMY', 'MELBOURNE' ]
*/
/*
let arrayOfNums = [1, 2, 3, 4, 5];
let res1 = arrayOfNums.map(num => num * num);
console.log(res1); // [1, 4, 9, 16, 25]

let arrayOfStrings = ["sam", "amy", "toronto"];
let res2 = arrayOfStrings.map(string => string.toUpperCase());
console.log(res2); // ["SAM", "AMY", "TORONTO"]
*/

function createGreeter(language) {
  switch (language) {
    case 'en':
      return () => console.log('Hello!');
    case 'es':
      return () => console.log('Hola!');
    case 'fr':
      return () => console.log('Bonjour!');
  }
}

let greeterEs = createGreeter('es');
console.log(greeterEs()); // 'Hola!'
console.log(greeterEs()); // 'Hola!'
console.log(greeterEs()); // 'Hola!' 

let greeterEn = createGreeter('en');
console.log(greeterEn()); // logs 'Hello!'


