/*
PEDAC 
Problem - 
  input: Given a string
  output: compute the hamming distance

  Explicit Requirements:
  The Hamming distance is only defined for sequences of equal length. 
  If you have two sequences of unequal length, you should compute the Hamming distance over the shorter length.

  Implicit Requirements:
  1. For empty strands/strings, hamming distance is 0.
  2. For equal strings, hamming distance is 0.

Example/Test Cases:
  Given in the test file

Data Structures:
  input: String data structure
  output: Number data type

Algorithm:
HammingDistance(externalStrand) method of DNA class
1. Edge Cases:
  - Check if both strings/strands are empty OR both strands are of equal, return 0.
2. Initialize the count to 0.
3. Check if both the strands are of equal lengths:
    - 
    - Iterate through both the strings.
      - If the character at index for both strings are not equal, increment the count. 
   - Else if, One of the strand is greater than the other. 
    - Iterate through the shorter length of the two strands
      - If the character at index for both strings are not equal, increment the count.
3. Return the value of count variable.

*/

class DNA {
  constructor(givenStrand) {
    this.givenStrand = givenStrand;
  }

  hammingDistance(externalStrand) {
    if ((this.givenStrand === '' && externalStrand === '') || (this.givenStrand === externalStrand)) {
      return 0;
    }

    let count = 0;
    if (this.givenStrand.length === externalStrand.length) {
      for (let idx = 0; idx < this.givenStrand.length; idx += 1) {
        if (this.givenStrand[idx] !== externalStrand[idx]) {
          count += 1;
        }
      }
    } else if (this.givenStrand.length > externalStrand.length) {
      for (let idx = 0; idx < externalStrand.length; idx += 1) {
        if (this.givenStrand[idx] !== externalStrand[idx]) {
          count += 1;
        }
      }
    } else if (this.givenStrand.length < externalStrand.length) {
      for (let idx = 0; idx < this.givenStrand.length; idx += 1) {
        if (this.givenStrand[idx] !== externalStrand[idx]) {
          count += 1;
        }
      }
    }
    return count;
  }
}

module.exports = DNA;