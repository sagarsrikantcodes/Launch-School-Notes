// Corrected Code
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    let discountedPrice = this.price - discount;
    
    return discountedPrice;
  },
};

console.log(item.discount(20));   // 40
console.log(item.discount(50));   // 25
console.log(item.discount(25));   // 37.5
