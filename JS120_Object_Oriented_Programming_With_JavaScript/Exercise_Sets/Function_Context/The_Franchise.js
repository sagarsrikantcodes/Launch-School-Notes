/*
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());
*/
// [ 'undefined 1', 'undefined 2', 'undefined 3' ]
/*
The method `allMovies` of `franchise` object returns
['undefined 1', 'undefined 2', 'undefined 3']
because on `line 5` the value of `this` points to a 
global object since `this` loses the object (i.e., franchise) 
context in a nested function.

*/

// Corrected Code
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let name = this.name;
    return [1, 2, 3].map(function(number) {
      return name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());
/*
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]
*/