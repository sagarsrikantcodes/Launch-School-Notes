/*
PEDAC Guided Practice: Leftover Blocks

Leftover Blocks

You have a number of building blocks that can be used to build a valid structure. There are certain rules about what determines the validity of a structure:

The building blocks are cubes
The structure is built in layers
The top layer is a single block
A block in an upper layer must be supported by four blocks in a lower layer
A block in a lower layer can support more than one block in an upper layer
You cannot leave gaps between blocks
Write a program that, given the number for a specific amount of cubes, calculates the number of blocks left over after building the tallest possible valid structure.

Problem Statement - 
input: Integer involving specific number of cubes.
output: Integer involving the number of blocks left over after building a valid structure. 
rules:
  - Explicit Requirements:
    1. Building blocks are cubes.
    2. The structure is built in layers.
    3. The top layer is a single block.
    4. A block in an upper layer must be supported by four blocks in a lower layer.
    5. A block in a lower layer can support more than one block in an upper layer
    6. You cannot leave gaps between blocks
  - Implicit Requirements:
    1. - Layer number correlates with blocks in a layer
          - Layer number x Layer number = number of blocks in layer. 
    
  --Questions--

- Can we add more blocks to a layer than is necessary to support the layer above and that layer still be valid?
- Will there always be left-over blocks?

Examples / Test Cases- 

TestCase 1
Input = 0
Output = 0

TestCase 2
Input = 1
Output = 0

TestCase 3
Input = 2
Output = 1

TestCase 4
Input = 4
Output = 3

TestCase 5
Input = 5
Output = 0

TestCase 6
Input = 6
Output = 1

TestCase 7
Input = 14
Output = 0 

TestCase 8
Input = 15
Output = 1

TestCase 9
Input = 30
Output = 0 

Data Structures -
1. An array of integers.

Algorithm - 
1. Declare and initialize result array be an empty array. 
2. Declare and initialize sumOfSquares to 0.
3. Declare and initialize variable, num to 0.
4. As long as the sumOfSquares is less than cubes continue running the loop. 
  4.1 Ressign the value of variable, sumOfSquares to be the current value of sumOfSquares plus the square of the num variable. 
  4.2 If the sumOfSquares is less than cubes, push the sumOfSquares to the result array. 
      Else if sumOfSquares is equal to cubes , return 0. 
      Else, return the difference between cubes and sumOfSquares. 
  4.3 Increment the num variable by 1. 
5. Return the difference between cubes and sumOfSquares to the calling function. 

Implementing a Solution in Code

*/

function calculateLeftoverBlocks(cubes) {
  let result = [];
  let sumOfSquares = 0;
  let num = 0;

  while (sumOfSquares < cubes) {
    sumOfSquares += (num * num);
    if (sumOfSquares < cubes) {
      result.push(sumOfSquares);
    } else if (sumOfSquares === cubes) {
      return 0;
    } else {
      return cubes - result[result.length - 1];
    }

    num += 1;
  }

  return cubes - sumOfSquares;
}

console.log(calculateLeftoverBlocks(0) === 0); //true
console.log(calculateLeftoverBlocks(1) === 0); //true
console.log(calculateLeftoverBlocks(2) === 1); //true
console.log(calculateLeftoverBlocks(4) === 3); //true
console.log(calculateLeftoverBlocks(5) === 0); //true
console.log(calculateLeftoverBlocks(6) === 1); //true
console.log(calculateLeftoverBlocks(14) === 0); //true