// Practice Problems - Factory Functions

// Question 1 - What are the two disadvantages of working with factory functions?
/*
1. Every object created with a factory function has a full copy of all the methods, which can be redundant and place a heavy load on the system memory.

2. There is no way to know if the object created is from factory function. We can only know the properties and methods of the object.

*/

// Question 2 - Rewrite the following code to use object-literal syntax to generate the returned object:
/*
function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}

*/
/*
function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

console.log(makeObj); // { propA: 10, propB: 20 }
*/

// Question 3 - In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:
/*
let invoice = {
  phone: 3000,
  internet: 6500
};

let payment = {
  phone: 1300,
  internet: 5500
};

let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal);         // => 6800
console.log(remainingDue);         // => 2700
*/

/*
To process multiple invoices, we need a factory method that we can use to create invoices. The requirements for the factory function are as follows:

It returns an invoice object, with phone and internet properties, and a total method.
The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
The function takes an object argument whose attributes override the default values.
Your function should work with the following code:

*/
/*
function createInvoice(services) {
  // implement the factory function here
  let phone;
  let internet;

  if (services === undefined) {
    phone = 3000;
    internet = 5500;
  } else if (services.phone === undefined) {
    phone = 3000;
    internet = services.internet;
  } else if (services.internet === undefined) {
    internet = 5500;
    phone = services.phone;
  } else {
    internet = services.internet;
    phone = services.phone;
  }

  let invoice = {
    phone: phone,
    internet: internet,
    total: function () {
      return this.phone + this.internet;
    },
  };

  return invoice;
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoices);
/*
[
  { phone: 3000, internet: 5500, total: [Function: total] },
  { phone: 3000, internet: 6500, total: [Function: total] },
  { phone: 2000, internet: 5500, total: [Function: total] },
  { phone: 1000, internet: 4500, total: [Function: total] }
]
*/

// console.log(invoiceTotal(invoices)); // 31000

/*
Question 4 -
Now we can build a factory function to create payments. The function can take an object argument in one of 3 forms:

Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
Payment for both services, e.g., { internet: 2000, phone: 1000 }.
Payment with just an amount property, e.g., { amount: 2000 }.
The function should return an object that has the amount paid for each service and a total method that returns the payment total. If the amount property is not present in the argument, it should return the sum of the phone and internet service charges; if the amount property is present, return the value of that property.

Your function should work with the following code:

*/
/*
function createPayment(services) {
  // implement the factory function here
  let phone;
  let internet;
  let amount;

  if (services === undefined) {
    phone = 0;
    internet = 0;
    amount = 0;
  } else if (services.phone === undefined && services.internet === undefined) {
    amount = services.amount;
    phone = 0;
    internet = 0;
  } else if (services.phone === undefined && services.internet !== undefined) {
    phone = 0;
    internet = services.internet;
  } else if (services.internet === undefined && services.phone !== undefined) {
    internet = 0;
    phone = services.phone;
  } else if (services.internet !== undefined && services.phone !== undefined) {
    internet = services.internet;
    phone = services.phone;
  }

  let payment = {
    phone: phone,
    internet: internet,
    amount: amount,

    total: function () {
      if (amount !== undefined) {
        return this.amount;
      } else {
        return this.phone + this.internet;
      }
    },
  };

  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
console.log(paymentTotal(payments));      // => 0
payments.push(createPayment({
  internet: 6500,
}));
console.log(paymentTotal(payments));      // => 6500

payments.push(createPayment({
  phone: 2000,
}));
console.log(paymentTotal(payments));      // => 8500

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));
console.log(paymentTotal(payments)); // => 14000

payments.push(createPayment({
  amount: 10000,
}));

// console.log(payments);
console.log(paymentTotal(payments));      // => 24000

*/

/*
Alternate Method:

function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };

  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  };

  return payment;
}

*/

// Question 5 - Update the createInvoice function so that it can add payment(s) to invoices. Use the following code as a guideline:

function createInvoice(services) {
  // implement the factory function here
  let phone = services.phone;
  let internet = services.internet;
  let phonePayment;
  let internetPayment;
  let amountPayment;

  if (services.phone === undefined) {
    phone = 3000;
  }

  if (services.internet === undefined) {
    internet = 5500;
  }


  let invoice = {
    phone: phone,
    internet: internet,
    phonePayment: phonePayment,
    internetPayment: internetPayment,
    amountPayment: amountPayment,
    invoiceTotal: function () {
      return this.phone + this.internet;
    },

    addPayment: function (payment) {
      this.amountPayment = payment.amount;
      this.phonePayment = payment.phone;
      this.internetPayment = payment.internet;
    },

    addPayments: function (payments) {
      this.phonePayment = payments.reduce((acc, payment) => acc + payment.phone, 0);
      this.internetPayment = payments.reduce((acc, payment) => acc + payment.internet, 0);
    },

    totalPayments: function () {
      this.phonePayment = this.phonePayment || 0;
      this.internetPayment = this.internetPayment || 0;
      this.amountPayment = this.amountPayment || 0;
      return this.phonePayment + this.internetPayment + this.amountPayment;
    },

    amountDue: function () {
      return this.invoiceTotal() - this.totalPayments();
    }
  };

  return invoice;
}


function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };

  payment.total = function () {
    return this.amount || (this.phone + this.internet);
  };

  return payment;
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
console.log(invoice);

/*
{
  phone: 1200,
  internet: 4000,
  phonePayment: 0,
  internetPayment: 0,
  amountPayment: 2000,
  invoiceTotal: [Function: invoiceTotal],
  addPayment: [Function: addPayment],
  addPayments: [Function: addPayments],
  totalPayments: [Function: totalPayments],
  amountDue: [Function: amountDue]
}
*/

invoice.addPayments([payment2, payment3]);
console.log(invoice);

/*

{
  phone: 1200,
  internet: 4000,
  phonePayment: 2000,
  internetPayment: 1200,
  amountPayment: 2000,
  invoiceTotal: [Function: invoiceTotal],
  addPayment: [Function: addPayment],
  addPayments: [Function: addPayments],
  totalPayments: [Function: totalPayments],
  amountDue: [Function: amountDue]
}

*/

console.log(invoice.totalPayments()); // 5200
console.log(invoice.invoiceTotal()); // 5200
console.log(invoice.amountDue());   // this should return 0


