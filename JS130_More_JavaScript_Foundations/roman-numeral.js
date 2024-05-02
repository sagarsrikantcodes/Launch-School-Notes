/*
PEDAC
Problem: 
  input: Given a decimal number
  output: Return a string consist of roman number

Example/Test Cases:
  Mentioned in the given test file

Data Structures:
  input: number data type
  program execution: object and array
  output: string data type

Algorithm:
constructor function:
1. Initialize this.number to the given number
2. Initialize the given object from the known decimal values to roman values.
3. Initialize the array consisting of known decimal values.


toRoman Method:
1. Initialize the output string, res to ""
2. Continue the procedure below until the given number is equal to 0.
  1. From the array, this.arr find the number that is less than or equal to the 
given number, this.number
  
  3. Retrieve the roman equivalent of the number found from the array and append it to the 
    output string, res.
  4. Reassign the given number to the given number - number from this.arr
3. Return the output string, res.

*/

class RomanNumeral {
  constructor(number) {
    this.number = number;
    this.arr = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    this.map = {1: 'I', 4: "IV", 5: "V", 9: "IX", 10: "X", 40: "XL", 50: "L", 90: "XC", 100: "C", 400: "CD", 500: "D", 900: "CM", 1000: "M"};
  }

  toRoman() {
    let res = "";
    let x = this.number;

    while(x !== 0) {
      let filteredArr = this.arr.filter(num => num <= x);
      let v = filteredArr[filteredArr.length - 1];
      let romanNum = this.map[v];
      res += romanNum;
      x -= v;
    }

    return res;
  }
}

module.exports = RomanNumeral;