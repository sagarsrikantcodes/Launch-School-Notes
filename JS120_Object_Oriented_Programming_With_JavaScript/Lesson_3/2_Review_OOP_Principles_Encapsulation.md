# Review - OOP Principles: Encapsulation

Objects provide a means to group related data and functions into one unit. In the context of the object, the data and the functions are commonly called state and methods respectively.

## Encapsulation

This grouping together of related data and functions is called encapsulation and is one of the fundamental principles of object-oriented programming. 

For example, let's take the following code:

```javascript

let overtime = 10;
let baseSalary = 6000;
let rate = 50;

function computeWage(baseSalary, overtime, rate) {
  return baseSalary + (overtime * rate)
}

console.log(computeWage(baseSalary, overtime, rate)); // 6500


```

The object-oriented way of solving this problem by using encapsulation is done by simply combining data and related functions into one unit such as:

```javascript

let employee = {
  overtime: 10,
  baseSalary: 6000,
  rate: 50,
  
  computeWage: function() {
    return this.baseSalary + (this.overtime * this.rate);
  },
};

console.log(employee.computeWage(employee.baseSalary, employee.overtime, employee.rate));
// 6500

```

As you can see, everything that's related to the `employee` object are bundled. That is the beauty of object-oriented programming. It organizes code into logical units. 

## Summary

We've just reviewed the concept of encapsulation and its relevance to object-oriented programming. In the above example, we instantiated an object using the object literal syntax. There are other more sophisticated patterns of object creation. At the very core we are grouping the data and the related functions together. 

